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

```typescript
// webpack.config.ts

import type { Options } from '@lagunovsky/svelte-svg-pre-loader'


module.exports = {
  module: {
    rules: [
      {
        test: /.svg$/,
        use: [
          { loader: 'svelte-loader' },
          { loader: 'svelte-svg-pre-loader', options: { withAction: true } as Options },
        ],
      },
    ],
  },
};
```

```sveltehtml
<!-- index.svelte -->

<Dog width="100px" height="30px"/>
<Cat {action} class="interactive"/> <!-- requires css-modules -->

<script lang="ts">
  import type { SvelteSVGAction } from '@lagunovsky/svelte-svg-pre-loader'

  import Dog from './dog.svg'
  import Cat from './cat.svg'


  const action: SvelteSVGAction = (node) => {
    node.addEventListener('click', () => alert('meow'))
  }
</script>

<style module>
  .interactive {
    cursor: pointer;
  }
</style>
```

## Options

### svgo

[SVGO options](https://github.com/svg/svgo). Some plugins cannot be disabled.

Default: ```{ plugins: [ 'preset-default', 'removeStyleElement', 'removeDimensions'] }```

### withAction

Adds the [use:action](https://svelte.dev/docs#template-syntax-element-directives-use-action) directive to an imported svg element.

Default: `false`
