/*
Copyright 2019 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import {
    CSSResultArray,
    html,
    PropertyValues,
    SizedMixin,
    SpectrumElement,
    TemplateResult,
} from '@spectrum-web-components/base';
import {
    property,
} from '@spectrum-web-components/base/src/decorators.js';

import { TreeViewItem } from './TreeViewItem.js';
import treeViewStyles from './tree-view.css.js';

/**
 * @slot icon - The icon that appears on the left of the label
 * @slot - The label
 */

export class TreeView extends SizedMixin(SpectrumElement) {
    public static override get styles(): CSSResultArray {
        return [treeViewStyles];
    }

    @property({ attribute: false })
    public selectedChild?: TreeViewItem;

    @property({ type: Boolean, reflect: true })
    public standalone = false;

    @property({ type: Boolean, reflect: true })
    public quiet = false;

    constructor() {
        super();
        this.addEventListener('selected', this.manageSelected);
        this.addEventListener('deselected', this.manageDeselected);
    }

    private manageSelected(event: Event): void {
        const { target } = event;
        if (!target) {
            return;
        }
        if (this.selectedChild && this.selectedChild !== target) {
            this.selectedChild.selected = false;
        }
        this.selectedChild = target as TreeViewItem;
    }

    private manageDeselected(event: Event): void {
        const { target } = event;
        if (!target) {
            return;
        }
        if (this.selectedChild && this.selectedChild === target) {
            this.selectedChild = undefined;
        }
    }

    protected override render(): TemplateResult {
        return html`
            <slot></slot>
        `;
    }

    protected override firstUpdated(changes: PropertyValues): void {
        super.firstUpdated(changes);
        const isRoot = this.parentElement?.localName !== 'sp-tree-view-item';
        this.setAttribute('role', isRoot ? 'tree' : 'group');
    }
}
