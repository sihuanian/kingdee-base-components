/*
 * Copyright (c) 2025, Salesforce, Inc.,
 * All rights reserved.
 * For full license text, see the LICENSE.txt file
 */
import { isCSR } from './ssr';

/**
 * Does the browser display animation.
 */
export function hasAnimation() {
    if (isCSR) {
        if (!window.matchMedia) {
            return true;
        }
        const mediaQuery = window.matchMedia(
            '(prefers-reduced-motion: reduce)'
        );
        return !(!mediaQuery || mediaQuery.matches);
    }
    return false;
}
