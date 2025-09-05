/*
 * Copyright (c) 2025, Salesforce, Inc.,
 * All rights reserved.
 * For full license text, see the LICENSE.txt file
 */
import { isCSR } from './ssr';

const URL_CHECK_REGEX = /^(\/+|\.+|ftp|http(s?):\/\/)/i;
const SSR_PROTOCOL = 'https:'; // For LWR (SSR), the protocol will always be HTTPS. See TD-0141280.

export function isValidUrl(url) {
    return URL_CHECK_REGEX.test(url);
}

export function formatUrl(url) {
    const protocol = isCSR ? window.location.protocol : SSR_PROTOCOL;
    return isValidUrl(url) ? url : `${protocol}//${url}`;
}

// eslint-disable-next-line no-script-url
export const FALLBACK_URL = 'javascript:void(0)';
const IS_SCRIPT_OR_DATA = /^(?:\w+script|data):/i;
const IS_HTML_ENTITY = /&#(\w+)(^\w|;)?/g;
const htmlCtrlEntityRegex = /&(newline|tab);/gi;
const ctrlCharactersRegex =
    // eslint-disable-next-line no-control-regex
    /[\u0000-\u001F\u007F-\u009F\u2000-\u200D\uFEFF]/gim;

function decodeHtmlCharacters(str) {
    return str.replace(IS_HTML_ENTITY, (match, dec) => {
        return String.fromCharCode(dec);
    });
}
/**
 * Mark sure to preventDefault, when sanitized url matches FALLBACK_URL
 * W-12029667 - Making FALLBACK_URL as '#' causes click action to fail on tests
 * */
export function sanitizeURL(url) {
    if (url) {
        // remove html entity characters from url
        const sanitizedUrl = decodeHtmlCharacters(url)
            .replace(htmlCtrlEntityRegex, '')
            .replace(ctrlCharactersRegex, '')
            .trim();
        return sanitizedUrl.match(IS_SCRIPT_OR_DATA) ? FALLBACK_URL : url;
    }
    return FALLBACK_URL;
}
