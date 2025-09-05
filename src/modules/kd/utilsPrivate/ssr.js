/*
 * Copyright (c) 2025, Salesforce, Inc.,
 * All rights reserved.
 * For full license text, see the LICENSE.txt file
 */
/**
 * Determine if environment is CSR or SSR
 */
export const isCSR = typeof window !== 'undefined';
