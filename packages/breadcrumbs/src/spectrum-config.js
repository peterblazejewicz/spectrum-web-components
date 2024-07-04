/*
Copyright 2024 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
// @ts-check

import {
    builder,
    converterFor,
} from '../../../tasks/process-spectrum-utils.js';

const converter = converterFor('spectrum-Breadcrumbs');

/**
 * @type { import('../../../tasks/spectrum-css-converter').SpectrumCSSConverter }
 */
const config = {
    conversions: [
        {
            inPackage: '@spectrum-css/breadcrumb',
            outPackage: 'breadcrumbs',
            fileName: 'breadcrumbs',
            hoistCustomPropertiesFrom: 'spectrum-Breadcrumbs',
            excludeByComponents: [
                builder.class('spectrum-Breadcrumbs-itemSeparator'),
                builder.class('spectrum-Breadcrumbs-itemLink'),
                builder.class('spectrum-Breadcrumbs-item'),
            ],
            includeByWholeSelector: [
                /* spectrum-Breadcrumbs-item:last-of-type */
                [
                    builder.class('spectrum-Breadcrumbs-item'),
                    builder.pseudoClass('last-of-type'),
                ],
            ],
            components: [
                converter.classToId('spectrum-Breadcrumbs', 'list'),
                {
                    find: [builder.class('spectrum-Breadcrumbs-item')],
                    replace: [
                        {
                            replace: {
                                type: 'pseudo-element',
                                kind: 'slotted',
                                selector: [
                                    builder.element('sp-breadcrumb-item'),
                                ],
                            },
                        },
                    ],
                },
                {
                    find: [
                        builder.class('spectrum-Breadcrumbs-item'),
                        builder.pseudoClass('last-of-type'),
                    ],
                    replace: [
                        {
                            replace: {
                                type: 'pseudo-element',
                                kind: 'slotted',
                                selector: [builder.pseudoClass('last-of-type')],
                            },
                        },
                        {
                            replace: builder.combinator(' '),
                        },
                    ],
                },
            ],
        },
        {
            inPackage: '@spectrum-css/breadcrumb',
            outPackage: 'breadcrumbs',
            fileName: 'breadcrumbs-item',
            excludeByComponents: [
                builder.class('spectrum-Breadcrumbs'),
                builder.class('spectrum-Breadcrumbs--compact'),
                builder.class('spectrum-Breadcrumbs--multiline'),
                {
                    type: 'pseudo-class',
                    kind: 'last-of-type',
                },
                {
                    type: 'pseudo-class',
                    kind: 'first-of-type',
                },
            ],
            components: [
                converter.classToHost('spectrum-Breadcrumbs-item'),
                converter.classToClass(
                    'spectrum-Breadcrumbs-itemSeparator',
                    'separator'
                ),
                converter.classToClass(
                    'spectrum-Breadcrumbs-itemLink',
                    'item-link'
                ),
                {
                    find: [
                        builder.class('spectrum-Breadcrumbs-itemLink'),
                        builder.attribute('href'),
                    ],
                    replace: [
                        {
                            replace: builder.class('item-link'),
                            hoist: false,
                        },
                        {
                            replace: builder.attribute('href'),
                        },
                    ],
                },
                {
                    find: [builder.class('spectrum-ActionButton')],
                    replace: [
                        {
                            replace: {
                                type: 'pseudo-element',
                                kind: 'slotted',
                                selector: [builder.element('sp-action-menu')],
                            },
                        },
                    ],
                },
                {
                    collapseSelector: true,
                    find: [
                        builder.class('spectrum-ActionButton'),
                        builder.pseudoClass('disabled'),
                    ],
                    replace: [
                        {
                            replace: {
                                type: 'pseudo-element',
                                kind: 'slotted',
                                selector: [
                                    builder.element('sp-action-menu'),
                                    builder.attribute('disabled'),
                                ],
                            },
                        },
                    ],
                },
            ],
        },
    ],
};

export default config;
