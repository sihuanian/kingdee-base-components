/*
 * Copyright (c) 2025, Salesforce, Inc.,
 * All rights reserved.
 * For full license text, see the LICENSE.txt file
 */
export function assert(condition, message) {
    if (process.env.NODE_ENV !== 'production') {
        if (!condition) {
            throw new Error(message);
        }
    }
}
