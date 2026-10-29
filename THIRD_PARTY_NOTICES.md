# Third-Party Notices

This inventory is based on the shipped `dist/js/components.iife.js`, its source map, `dist/css/components.css`, and the corresponding source imports. It is not a complete build-input SBOM: this template does not contain a `package.json` or lock file.

## Shipped third-party code

| Component | Shipped version evidence | License and copyright |
|---|---|---|
| `yet-another-react-lightbox` plus counter, fullscreen, slideshow, thumbnails, and zoom plugins | Not present in the IIFE or source map; exact version is unverified | MIT, © 2022 Igor Danchenko. [Upstream](https://github.com/igordanchenko/yet-another-react-lightbox) |
| `dompurify` | 3.3.1 in the embedded `@license` banner and `DOMPurify.version` | Apache-2.0 OR MPL-2.0. This distribution elects Apache-2.0. © 2025 Dr.-Ing. Mario Heiderich, Cure53. [Versioned upstream license](https://github.com/cure53/DOMPurify/blob/3.3.1/LICENSE) |
| `browser-image-compression` | 2.0.2 in the embedded banner and exported version | MIT, © 2019 Donald Chan. [Versioned package metadata](https://github.com/Donaldcwl/browser-image-compression/blob/v2.0.2/package.json) |
| UZIP code embedded inside `browser-image-compression` | 0.20201231.0 is the exact dependency declared by `browser-image-compression` 2.0.2; UZIP implementation is present in its source-mapped module | MIT, © 2018 Photopea. [Upstream license](https://github.com/photopea/UZIP.js/blob/master/LICENSE) |
| `@dnd-kit/core`, `@dnd-kit/sortable`, `@dnd-kit/utilities`, `@dnd-kit/accessibility` | Package modules are identified in the source map; exact versions are not | MIT, © 2021 Claudéric Demers. [Upstream license](https://github.com/clauderic/dnd-kit/blob/master/LICENSE) |
| Tailwind CSS generated CSS | `src/styles/main.css` uses Tailwind v4 syntax; exact generator version is not recorded | MIT, © Tailwind Labs, Inc. [Upstream license](https://github.com/tailwindlabs/tailwindcss/blob/master/LICENSE) |

React, React DOM and the JSX runtime are passed into the IIFE from host globals and are not embedded in this template's JS asset. The Gnuboard7 host supplies them. Test-only imports such as Vitest and Testing Library occur in test sources and do not occur in the shipped IIFE source-map module list. Build tooling versions cannot be identified without the absent package manifest and lock file.

## MIT License

The following MIT terms and notices apply to the MIT-licensed items above. Keep these notices with redistributed copies or substantial portions of those items.

```text
MIT License

Copyright (c) 2022 Igor Danchenko
Copyright (c) 2019 Donald Chan
Copyright (c) 2018 Photopea
Copyright (c) 2021 Claudéric Demers
Copyright (c) Tailwind Labs, Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## DOMPurify license notice

DOMPurify 3.3.1 is dual-licensed by its upstream under Apache License 2.0 or Mozilla Public License 2.0. For the DOMPurify code in this distribution, Apache License 2.0 is selected. Its complete license text is available at <https://www.apache.org/licenses/LICENSE-2.0>; the versioned upstream license, including its copyright and dual-license notice, is at <https://github.com/cure53/DOMPurify/blob/3.3.1/LICENSE>. Preserve this notice and provide the Apache-2.0 license text to recipients when redistributing the DOMPurify code.
