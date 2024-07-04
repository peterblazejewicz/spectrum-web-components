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
import { fixture, html } from '@open-wc/testing';

import '../sp-breadcrumbs.js';
import { Breadcrumbs } from '..';
import { testForLitDevWarnings } from '../../../test/testing-helpers.js';

describe('Breadcrumbs', () => {
    testForLitDevWarnings(
        async () =>
            await fixture<Breadcrumbs>(html`
                <sp-breadcrumbs>
                    <sp-breadcrumb-item href=${window.location.href}>
                        Breadcrumb 1
                    </sp-breadcrumb-item>
                    <sp-breadcrumb-item href=${window.location.href}>
                        Breadcrumb 2
                    </sp-breadcrumb-item>
                    <sp-breadcrumb-item href=${window.location.href}>
                        Breadcrumb 3
                    </sp-breadcrumb-item>
                    <sp-breadcrumb-item href=${window.location.href}>
                        Breadcrumb 4
                    </sp-breadcrumb-item>
                </sp-breadcrumbs>
            `)
    );
});
