/*
 * Copyright (c) 2025, Salesforce, Inc.,
 * All rights reserved.
 * For full license text, see the LICENSE.txt file
 */
export function raf(fn) {
    let ticking = false;
    return function (event) {
        if (!ticking) {
            // eslint-disable-next-line @lwc/lwc/no-async-operation
            requestAnimationFrame(() => {
                fn.call(this, event);
                ticking = false;
            });
        }
        ticking = true;
    };
}
