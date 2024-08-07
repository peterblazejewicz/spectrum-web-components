/*
Copyright 2020 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
import type { ReactiveController, ReactiveElement } from 'lit';

export const DARK_MODE = '(prefers-color-scheme: dark)';
export const IS_MOBILE = '(hover: none) and (pointer: coarse)';

export class MatchMediaController implements ReactiveController {
    key = Symbol('match-media-key');

    matches = false;
    mediaMatches = false;

    protected host: ReactiveElement;

    protected media: MediaQueryList;

    constructor(host: ReactiveElement, query: string) {
        this.host = host;
        this.host.addController(this);

        this.media = window.matchMedia(query);
        this.mediaMatches = this.media.matches;

        this.updateMatches();

        this.onResize = this.onResize.bind(this);
        this.onChange = this.onChange.bind(this);
        host.addController(this);
    }

    public hostConnected(): void {
        window.addEventListener('resize', this.onResize);
        this.media?.addEventListener('change', this.onChange);
    }

    public hostDisconnected(): void {
        window.removeEventListener('resize', this.onResize);
        this.media?.removeEventListener('change', this.onChange);
    }

    protected onResize(): void {
        this.updateMatches();
    }

    protected onChange(event: MediaQueryListEvent): void {
        if (this.mediaMatches === event.matches) return;
        this.mediaMatches = event.matches;
        this.host.requestUpdate(this.key, !this.mediaMatches);
    }

    protected updateMatches(): void {
        // check for window.screen.availWidth and window.screen.availHeight to confirm that the device is a mobile device
        const newMatches =
            this.mediaMatches &&
            (window.screen.availWidth < 768 || window.screen.availHeight < 768);
        if (this.matches !== newMatches) {
            this.matches = newMatches;
            this.host.requestUpdate(this.key, !this.matches);
        }
    }
}
