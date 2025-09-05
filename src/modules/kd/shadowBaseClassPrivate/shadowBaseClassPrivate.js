/*
 * Copyright (c) 2025, Salesforce, Inc.,
 * All rights reserved.
 * For full license text, see the LICENSE.txt file
 */
import { KingdeeElement } from '@kdcloudjs/kwc';

export default class KingdeeShadowBaseClass extends KingdeeElement {
    connectedCallback() {
        if (!this.template.synthetic) {
            this.setAttribute('data-render-mode', 'shadow');
        }
    }
}
