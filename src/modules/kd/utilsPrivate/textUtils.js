/*
 * Copyright (c) 2025, Salesforce, Inc.,
 * All rights reserved.
 * For full license text, see the LICENSE.txt file
 */
const hexColorCodesRegExp = /^#[0-9abcdef]{6}$/i;

/**
 * Determine if a value should ignore RTL text formatting.
 *
 * @param {any} value The value to check.
 * @returns {boolean} Whether the provided value should ignore RTL text formatting.
 */
export function isTextIgnoreRTL(value) {
    return (
        typeof value === 'string' &&
        value !== '' &&
        // Ignoring RTL for hex color codes
        hexColorCodesRegExp.test(value)
    );
}
