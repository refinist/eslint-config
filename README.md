# @refinist/eslint-config [![npm](https://img.shields.io/npm/v/@refinist/eslint-config.svg)](https://npmjs.com/package/@refinist/eslint-config)

ESLint config preset for JavaScript, TypeScript, Vue, and Prettier

## Features

[x] 🎨 Format with **Prettier**

[x] ⚡ Designed to work with **Vue3** & **TypeScript**

[x] 📋 [ESLint Flat config](https://eslint.org/docs/latest/use/configure/configuration-files-new)
[x] 🚫 Ignores common files like `node_modules`, `dist` and files in `.gitignore`

[x] 🎯 Best practices, only one-line of config

[x] 💯 Just to pursue higher code quality, no more

[ ] 🌐 Add more language support

## Install

```bash
pnpm add -D @refinist/eslint-config
```

```bash
npm i -D @refinist/eslint-config
```

```bash
yarn add -D @refinist/eslint-config
```

Require Node.js >= 22.16.0, and ESLint >= 9.5.0.

## Usage

```ts
// eslint.config.ts
import { refinist } from '@refinist/eslint-config';
export default refinist();
```

```ts
// eslint.config.ts
import { refinist } from '@refinist/eslint-config';
export default refinist({
  vue: true, // auto detection
  prettier: true // default true
});
```

### Rules Overrides

```ts
// eslint.config.ts
import { refinist } from '@refinist/eslint-config';
export default refinist(
  {},

  // From the second arguments they are ESLint Flat Configs
  // you can have multiple configs
  {
    files: ['**/*.ts'],
    rules: {}
  },
  {
    rules: {}
  }
);
```

### Use system's glob

```ts
// eslint.config.ts
import { refinist, GLOB_VUE } from '@refinist/eslint-config';
export default refinist(
  {},

  {
    files: [GLOB_VUE], // GLOB_VUE is '**/*.vue'
    rules: {
      'vue/block-order': 'off'
    }
  }
);
```

### 🔗 Prettier config

Combine with [@refinist/prettier-config](https://github.com/refinist/prettier-config)

#### Install

```bash
pnpm add -D @refinist/prettier-config
```

```bash
npm i -D @refinist/prettier-config
```

```bash
yarn add -D @refinist/prettier-config
```

#### package.json config(recommended)

```json
{
  "prettier": "@refinist/prettier-config"
}
```

#### .prettierrc config

```json
"@refinist/prettier-config"
```

#### prettier.config.js / prettier.config.mjs

```js
// prettier.config.js
export { default } from '@refinist/prettier-config';
```

#### Rules Overrides

```ts
import config from '@refinist/prettier-config';
/** @type {import('prettier').Config} */
export default {
  ...config

  /* your custom config */
};
```

> [!TIP]
> For more Prettier configuration options, please refer to the [official documentation](https://prettier.io/blog/2025/02/09/3.5.0#api)

By the way, the configuration method I like is `package.json` 😬

## VS Code settings

```json
// .vscode/settings.json
{
  "editor.formatOnSave": false,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  }
}
```

## License

[MIT](./LICENSE)

Copyright (c) 2025-present, Zhifeng (Jeff) Wang
