![License](https://img.shields.io/github/license/lagunovsky/svelte-svg-pre-loader)
![TypeScript](https://img.shields.io/badge/typescript-%3E%3D4.0.0-blue)
![Tests workflow](https://github.com/lagunovsky/svelte-svg-pre-loader/actions/workflows/publish.yml/badge.svg)

# svelte-svg-pre-loader

Prepares SVG for loading with a svelte-loader

## Installation

```bash
# using npm
npm i -D @lagunovsky/svelte-svg-pre-loader

# using yarn
yarn add -D @lagunovsky/svelte-svg-pre-loader
```

## Usage

```js
// webpack.config.js

module.exports = {
    module: {
        rules: [
            {
                test: /.svg$/,
                use: [
                    { loader: 'svelte-loader' },
                    { loader: 'svelte-svg-pre-loader' },
                ],
            },
        ],
    },
};
```

```sveltehtml
<!-- index.svelte -->

<script>
    import Dog from './dog.svg'
    import Cat from './cat.svg'
</script>

<Dog width="100px" height="30px"/>
<Cat/>
```

## Options

### svgo

[SVGO options](https://github.com/svg/svgo). Some plugins cannot be disabled.

Default: ```{ plugins: [ 'preset-default', 'removeStyleElement', 'removeDimensions'] }```
