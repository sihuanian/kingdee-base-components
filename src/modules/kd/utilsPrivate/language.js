/*
 * Copyright (c) 2025, Salesforce, Inc.,
 * All rights reserved.
 * For full license text, see the LICENSE.txt file
 */
import { isCSR } from './ssr';

const noop = () => {};
const setRangeText = isCSR ? HTMLTextAreaElement.prototype.setRangeText : noop;

export { setRangeText };
