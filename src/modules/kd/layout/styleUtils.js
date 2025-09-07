/*
 * Copyright (c) 2025, Salesforce, Inc.,
 * All rights reserved.
 * For full license text, see the LICENSE.txt file
 */
import { normalizeString } from '../utilsPrivate/utilsPrivate'
import { classSet } from '../utils/utils'

const HALIN_CLASS = {
    center: 'kdds-grid_align-center',
    space: 'kdds-grid_align-space',
    spread: 'kdds-grid_align-spread',
    end: 'kdds-grid_align-end',
};

const VALIN_CLASS = {
    start: 'kdds-grid_vertical-align-start',
    center: 'kdds-grid_vertical-align-center',
    end: 'kdds-grid_vertical-align-end',
    stretch: 'kdds-grid_vertical-stretch',
};

const BOUNDARY_CLASS = {
    small: 'kdds-grid_pull-padded',
    medium: 'kdds-grid_pull-padded-medium',
    large: 'kdds-grid_pull-padded-large',
};

export const VERTICAL_ALIGN = Object.keys(VALIN_CLASS);
export const BOUNDARY = Object.keys(BOUNDARY_CLASS);
export const HORIZONTAL_ALIGN = Object.keys(HALIN_CLASS);

const ROWS_CLASS = 'kdds-wrap';
const GRID_CLASS = 'kdds-grid';

export function normalizeParam(value, valid, fallback) {
    value = value ? value.toLowerCase() : ' ';
    return normalizeString(value, {
        fallbackValue: fallback || ' ',
        validValues: valid || [],
    });
}

export function computeLayoutClass(hAlign, vAlign, boundary, multiRows) {
    const computedClass = classSet(GRID_CLASS);

    if (hAlign !== ' ' && HALIN_CLASS[hAlign]) {
        computedClass.add(HALIN_CLASS[hAlign]);
    }

    if (vAlign !== ' ' && VALIN_CLASS[vAlign]) {
        computedClass.add(VALIN_CLASS[vAlign]);
    }

    if (boundary !== ' ' && BOUNDARY_CLASS[boundary]) {
        computedClass.add(BOUNDARY_CLASS[boundary]);
    }

    if (multiRows) {
        computedClass.add(ROWS_CLASS);
    }

    return computedClass;
}
