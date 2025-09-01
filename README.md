# Aevr UI Registry

## Installation with Namespace

To use the Aevr UI registry with namespace support, add the following configuration to your `components.json` file:

```json
{
  "registries": {
    "@aevr": "https://v1.ui.aevr.space/r/{name}.json"
  }
}
```

Then install components using the namespace:

```bash
npx shadcn@latest add @aevr/info-box
npx shadcn@latest add @aevr/button
npx shadcn@latest add @aevr/card
```

## Available Components

You can view all available components at: <https://v1.ui.aevr.space>

## Alternative Installation

You can also install components directly using the full URL:

```bash
npx shadcn@latest add https://v1.ui.aevr.space/r/info-box.json
```

```
ui
├─ .next
│  ├─ BUILD_ID
│  ├─ app-build-manifest.json
│  ├─ app-path-routes-manifest.json
│  ├─ build
│  │  └─ chunks
│  │     ├─ [root-of-the-server]__04d7a048._.js
│  │     ├─ [root-of-the-server]__04d7a048._.js.map
│  │     ├─ [root-of-the-server]__05f88b00._.js
│  │     ├─ [root-of-the-server]__05f88b00._.js.map
│  │     ├─ [turbopack]_runtime.js
│  │     ├─ [turbopack]_runtime.js.map
│  │     ├─ postcss_config_mjs_transform_ts_f0ffbaad._.js
│  │     └─ postcss_config_mjs_transform_ts_f0ffbaad._.js.map
│  ├─ build-manifest.json
│  ├─ cache
│  │  ├─ .rscinfo
│  │  ├─ eslint
│  │  │  └─ .cache_bjsryg
│  │  ├─ fetch-cache
│  │  │  ├─ 1631ff60a09584ff27d1e78cc895511bb3df24a51e0a28f9e21f2e103a96a11a
│  │  │  ├─ 40d47ff02b714b0b99672c698760fa84ece3b70f79ebb329ad8852e7dc1e7583
│  │  │  ├─ 5bcd8d64db6a27bd1cbd8cb52b21cb8d9cc19d088fccd9404c692935df40c899
│  │  │  ├─ 5e3928e5fdcc7ad91621511f9aa419eb9499f5128fd81c8be2c16839844ea6d7
│  │  │  ├─ 6577126e4d1d2116908e6d327b29f00729a512eb21d3640532aa2656f2be379a
│  │  │  ├─ 826dd085d7d225b92b897216faab4ab87329dfb2678bf477797e61a9734cf0a9
│  │  │  ├─ ce21a5fa474687086ef9eb6597aff34b55db61a8b2e8aaf3d42670137b638ecd
│  │  │  ├─ d0c1f3860b8edefd4b166829e4f71101a360dec9dad04f62d7dfb8bd9abd6133
│  │  │  ├─ d3e57338d973c416b49f3bed124f10143c4a8e73220e2d7caf7063de00fbd5dc
│  │  │  ├─ ddc913d336aa0fb1a33f6cdda34d4c29c79d3473ae01892ce0ac99ade512fb13
│  │  │  ├─ e325a6b2bdcb955783db6246a7e9eec4cb62b74f5596a9b50ee3d87054be7147
│  │  │  ├─ e9f948cdd859fc9513d61845819b97223c453e1eaaf8f737257a366f90f015c0
│  │  │  └─ fa893af5041407a8e9ade2fe8641ae9114fecf2d6edeeb92cd7ab5f33ea77389
│  │  ├─ swc
│  │  │  └─ plugins
│  │  │     └─ v7_macos_x86_64_9.0.0
│  │  └─ webpack
│  │     ├─ client-production
│  │     │  ├─ 0.pack
│  │     │  └─ index.pack
│  │     ├─ edge-server-production
│  │     │  ├─ 0.pack
│  │     │  └─ index.pack
│  │     └─ server-production
│  │        ├─ 0.pack
│  │        └─ index.pack
│  ├─ diagnostics
│  │  ├─ build-diagnostics.json
│  │  └─ framework.json
│  ├─ export-marker.json
│  ├─ fallback-build-manifest.json
│  ├─ images-manifest.json
│  ├─ next-minimal-server.js.nft.json
│  ├─ next-server.js.nft.json
│  ├─ package.json
│  ├─ prerender-manifest.json
│  ├─ react-loadable-manifest.json
│  ├─ required-server-files.json
│  ├─ routes-manifest.json
│  ├─ server
│  │  ├─ app
│  │  │  ├─ _not-found
│  │  │  │  ├─ page.js
│  │  │  │  ├─ page.js.nft.json
│  │  │  │  └─ page_client-reference-manifest.js
│  │  │  ├─ _not-found.html
│  │  │  ├─ _not-found.meta
│  │  │  ├─ _not-found.rsc
│  │  │  ├─ favicon.ico
│  │  │  │  ├─ route
│  │  │  │  │  ├─ app-build-manifest.json
│  │  │  │  │  ├─ app-paths-manifest.json
│  │  │  │  │  └─ build-manifest.json
│  │  │  │  ├─ route.js
│  │  │  │  ├─ route.js.map
│  │  │  │  └─ route.js.nft.json
│  │  │  ├─ favicon.ico.body
│  │  │  ├─ favicon.ico.meta
│  │  │  ├─ index.html
│  │  │  ├─ index.meta
│  │  │  ├─ index.rsc
│  │  │  ├─ page
│  │  │  │  ├─ app-build-manifest.json
│  │  │  │  ├─ app-paths-manifest.json
│  │  │  │  ├─ build-manifest.json
│  │  │  │  ├─ next-font-manifest.json
│  │  │  │  ├─ react-loadable-manifest.json
│  │  │  │  └─ server-reference-manifest.json
│  │  │  ├─ page.js
│  │  │  ├─ page.js.map
│  │  │  ├─ page.js.nft.json
│  │  │  └─ page_client-reference-manifest.js
│  │  ├─ app-paths-manifest.json
│  │  ├─ chunks
│  │  │  ├─ 447.js
│  │  │  ├─ 548.js
│  │  │  ├─ 985.js
│  │  │  ├─ [root-of-the-server]__6ec1ff91._.js
│  │  │  ├─ [root-of-the-server]__6ec1ff91._.js.map
│  │  │  ├─ [turbopack]_runtime.js
│  │  │  ├─ [turbopack]_runtime.js.map
│  │  │  └─ ssr
│  │  │     ├─ [root-of-the-server]__012ba519._.js
│  │  │     ├─ [root-of-the-server]__012ba519._.js.map
│  │  │     ├─ [root-of-the-server]__0a46983d._.js
│  │  │     ├─ [root-of-the-server]__0a46983d._.js.map
│  │  │     ├─ [root-of-the-server]__2d3c6dde._.js
│  │  │     ├─ [root-of-the-server]__2d3c6dde._.js.map
│  │  │     ├─ [root-of-the-server]__4c58c055._.js
│  │  │     ├─ [root-of-the-server]__4c58c055._.js.map
│  │  │     ├─ [turbopack]_browser_dev_hmr-client_hmr-client_ts_59fa4ecd._.js
│  │  │     ├─ [turbopack]_browser_dev_hmr-client_hmr-client_ts_59fa4ecd._.js.map
│  │  │     ├─ [turbopack]_browser_dev_hmr-client_hmr-client_ts_d3eb585f._.js
│  │  │     ├─ [turbopack]_browser_dev_hmr-client_hmr-client_ts_d3eb585f._.js.map
│  │  │     ├─ [turbopack]_runtime.js
│  │  │     ├─ [turbopack]_runtime.js.map
│  │  │     ├─ _2b69d4d3._.js
│  │  │     ├─ _2b69d4d3._.js.map
│  │  │     ├─ _d03885d8._.js
│  │  │     ├─ _d03885d8._.js.map
│  │  │     ├─ app_1f3630ef._.js
│  │  │     └─ app_1f3630ef._.js.map
│  │  ├─ functions-config-manifest.json
│  │  ├─ interception-route-rewrite-manifest.js
│  │  ├─ middleware-build-manifest.js
│  │  ├─ middleware-manifest.json
│  │  ├─ middleware-react-loadable-manifest.js
│  │  ├─ next-font-manifest.js
│  │  ├─ next-font-manifest.json
│  │  ├─ pages
│  │  │  ├─ 404.html
│  │  │  ├─ 500.html
│  │  │  ├─ _app.js
│  │  │  ├─ _app.js.nft.json
│  │  │  ├─ _document.js
│  │  │  ├─ _document.js.nft.json
│  │  │  ├─ _error.js
│  │  │  └─ _error.js.nft.json
│  │  ├─ pages-manifest.json
│  │  ├─ server-reference-manifest.js
│  │  ├─ server-reference-manifest.json
│  │  └─ webpack-runtime.js
│  ├─ static
│  │  ├─ IQOUbAiRH5nWe87dXK-dk
│  │  │  ├─ _buildManifest.js
│  │  │  └─ _ssgManifest.js
│  │  ├─ chunks
│  │  │  ├─ 4bd1b696-3b0868e7c18e7953.js
│  │  │  ├─ 684-21cea27494c2bbe4.js
│  │  │  ├─ 724-7962add776542f81.js
│  │  │  ├─ [next]_internal_font_google_geist_e531dabc_module_css_f9ee138c._.single.css
│  │  │  ├─ [next]_internal_font_google_geist_e531dabc_module_css_f9ee138c._.single.css.map
│  │  │  ├─ [next]_internal_font_google_geist_mono_68a01160_module_css_f9ee138c._.single.css
│  │  │  ├─ [next]_internal_font_google_geist_mono_68a01160_module_css_f9ee138c._.single.css.map
│  │  │  ├─ [root-of-the-server]__9d126714._.css
│  │  │  ├─ [root-of-the-server]__9d126714._.css.map
│  │  │  ├─ [turbopack]_browser_dev_hmr-client_hmr-client_ts_61dcf9ba._.js
│  │  │  ├─ [turbopack]_browser_dev_hmr-client_hmr-client_ts_61dcf9ba._.js.map
│  │  │  ├─ [turbopack]_browser_dev_hmr-client_hmr-client_ts_66796270._.js
│  │  │  ├─ [turbopack]_browser_dev_hmr-client_hmr-client_ts_fd44f5a4._.js
│  │  │  ├─ [turbopack]_browser_dev_hmr-client_hmr-client_ts_fd44f5a4._.js.map
│  │  │  ├─ _93808211._.js
│  │  │  ├─ _93808211._.js.map
│  │  │  ├─ _e69f0d32._.js
│  │  │  ├─ _ef6e6602._.js
│  │  │  ├─ _ef6e6602._.js.map
│  │  │  ├─ app
│  │  │  │  ├─ _not-found
│  │  │  │  │  └─ page-edef0fcd75f21114.js
│  │  │  │  ├─ layout-f37fb7bcde37d121.js
│  │  │  │  └─ page-e5cc604a661eb3ea.js
│  │  │  ├─ app_favicon_ico_mjs_659ce808._.js
│  │  │  ├─ app_globals_css_f9ee138c._.single.css
│  │  │  ├─ app_globals_css_f9ee138c._.single.css.map
│  │  │  ├─ app_layout_tsx_c0237562._.js
│  │  │  ├─ app_page_tsx_b2f3bef0._.js
│  │  │  ├─ framework-f593a28cde54158e.js
│  │  │  ├─ main-a1c93dc8ac438092.js
│  │  │  ├─ main-app-eed00cec353ee5c3.js
│  │  │  ├─ pages
│  │  │  │  ├─ _app-da15c11dea942c36.js
│  │  │  │  └─ _error-cc3f077a18ea1793.js
│  │  │  ├─ polyfills-42372ed130431b0a.js
│  │  │  ├─ registry_new-york_blocks_example-with-css_example-card_1b3e6aa9.css
│  │  │  ├─ registry_new-york_blocks_example-with-css_example-card_1b3e6aa9.css.map
│  │  │  └─ webpack-77b26a3ff13168fb.js
│  │  ├─ css
│  │  │  ├─ 10f973f92e601d3b.css
│  │  │  └─ e74e70d4010fb9f4.css
│  │  ├─ development
│  │  │  ├─ _buildManifest.js
│  │  │  ├─ _clientMiddlewareManifest.json
│  │  │  └─ _ssgManifest.js
│  │  └─ media
│  │     ├─ 569ce4b8f30dc480-s.p.woff2
│  │     ├─ 747892c23ea88013-s.woff2
│  │     ├─ 8d697b304b401681-s.woff2
│  │     ├─ 93f479601ee12b01-s.p.woff2
│  │     ├─ 9610d9e46709d722-s.woff2
│  │     ├─ ba015fad6dcf6784-s.woff2
│  │     ├─ favicon.45db1c09.ico
│  │     ├─ gyByhwUxId8gMEwSGFWNOITddY4-s.81df3a5b.woff2
│  │     ├─ gyByhwUxId8gMEwYGFWNOITddY4-s.b7d310ad.woff2
│  │     ├─ gyByhwUxId8gMEwcGFWNOITd-s.p.da1ebef7.woff2
│  │     ├─ or3nQ6H_1_WfwkMZI_qYFrMdmhHkjkotbA-s.cb6bbcb1.woff2
│  │     ├─ or3nQ6H_1_WfwkMZI_qYFrcdmhHkjko-s.p.be19f591.woff2
│  │     └─ or3nQ6H_1_WfwkMZI_qYFrkdmhHkjkotbA-s.e32db976.woff2
│  ├─ trace
│  ├─ transform.js
│  ├─ transform.js.map
│  └─ types
│     ├─ app
│     │  ├─ layout.ts
│     │  └─ page.ts
│     ├─ cache-life.d.ts
│     └─ package.json
├─ README.md
├─ app
│  ├─ favicon.ico
│  ├─ globals.css
│  ├─ layout.tsx
│  └─ page.tsx
├─ components
│  └─ open-in-v0-button.tsx
├─ components.json
├─ eslint.config.mjs
├─ lib
│  └─ utils.ts
├─ next.config.ts
├─ package-lock.json
├─ package.json
├─ postcss.config.mjs
├─ public
│  ├─ file.svg
│  ├─ globe.svg
│  ├─ next.svg
│  ├─ r
│  │  ├─ button.json
│  │  ├─ info-box.json
│  │  ├─ loader.json
│  │  ├─ number-formatter.json
│  │  └─ summary-card.json
│  ├─ vercel.svg
│  └─ window.svg
├─ registry
│  ├─ lagos
│  │  └─ ui
│  │     ├─ button.tsx
│  │     ├─ info-box.tsx
│  │     ├─ loader.tsx
│  │     └─ summary-card.tsx
│  ├─ new-york
│  │  ├─ blocks
│  │  │  ├─ complex-component
│  │  │  │  ├─ components
│  │  │  │  │  ├─ pokemon-card.tsx
│  │  │  │  │  └─ pokemon-image.tsx
│  │  │  │  ├─ hooks
│  │  │  │  │  └─ use-pokemon.ts
│  │  │  │  ├─ lib
│  │  │  │  │  └─ pokemon.ts
│  │  │  │  └─ page.tsx
│  │  │  ├─ example-form
│  │  │  │  └─ example-form.tsx
│  │  │  ├─ example-with-css
│  │  │  │  ├─ example-card.css
│  │  │  │  └─ example-card.tsx
│  │  │  └─ hello-world
│  │  │     └─ hello-world.tsx
│  │  └─ ui
│  │     ├─ button.tsx
│  │     ├─ card.tsx
│  │     ├─ input.tsx
│  │     ├─ label.tsx
│  │     └─ textarea.tsx
│  └─ utils
│     └─ number-formatter.ts
├─ registry.json
└─ tsconfig.json

```