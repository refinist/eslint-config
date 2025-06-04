# @refinist/eslint-config [![npm](https://img.shields.io/npm/v/@refinist/eslint-config.svg)](https://npmjs.com/package/@refinist/eslint-config) [![Unit Test](https://github.com/refinist/eslint-config/actions/workflows/unit-test.yml/badge.svg)](https://github.com/refinist/eslint-config/actions/workflows/unit-test.yml) [![node compatibility](https://img.shields.io/node/v/@refinist/eslint-config)](https://nodejs.org/en/about/releases/) [![eslint compatibility](https://img.shields.io/badge/eslint->=9.5.0-brightgreen)](https://eslint.org/docs/latest/user-guide/getting-started)

ESLint config preset for JavaScript, TypeScript, Vue, and Prettier

## Features

- [x] 🎨 Format with **Prettier**
- [x] ⚡ Designed to work with **Vue3** & **TypeScript**
- [x] 📋 [ESLint Flat config](https://eslint.org/docs/latest/use/configure/configuration-files-new)
- [x] 🚫 Ignores common files like `node_modules`, `dist` and files in `.gitignore`
- [x] 🎯 Best practices, only one-line of config
- [x] 💯 Just to pursue higher code quality, no more
- [ ] 🌐 Add more language support

## Install

Using pnpm, yarn, or npm

```bash
# with pnpm
pnpm add -D @refinist/eslint-config

# with yarn
yarn add -D @refinist/eslint-config

# with npm
npm i -D @refinist/eslint-config
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
// package.json
{
  "prettier": "@refinist/prettier-config"
}
```

#### .prettierrc config

```json
// .prettierrc.json
"@refinist/prettier-config"
```

#### prettier.config.js / prettier.config.mjs config

```js
// prettier.config.js
export { default } from '@refinist/prettier-config';
```

#### Rules Overrides

```ts
// prettier.config.js
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

## `npm create vue@latest`

If you used [Official Vue Starter](https://github.com/vuejs/create-vue), which is `npm create vue@latest` to create your project, here are a few steps to quickly integrate with the official template:

### If you selected eslint and prettier

1. **Remove** related packages and files

- `@vue/eslint-config-prettier`
- `@vue/eslint-config-typescript`
- `eslint-plugin-vue`
- `.prettierrc.json` file

> [!TIP]
> Keep the eslint and prettier packages

2. Install `@refinist/eslint-config` and `@refinist/prettier-config`

```bash
pnpm add -D @refinist/eslint-config @refinist/prettier-config
```

3. Configure `eslint.config.ts`

```ts
// eslint.config.ts
import { refinist } from '@refinist/eslint-config';
export default refinist();
```

4. Configure `prettier`

```json
// package.json
{
  "prettier": "@refinist/prettier-config"
}
```

5. Configure `scripts`

```json
// package.json
{
  "scripts": {
    "lint": "eslint",
    "lint:fix": "eslint --fix"
  }
}
```

6. Verify/Fix

```bash
pnpm run lint
pnpm run lint:fix
```

Done!

> [!TIP]
> If you didn't select eslint and prettier, replace step 1 above with `pnpm add -D eslint` and `pnpm add -D prettier`, then continue with the steps above!

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

Inspired by [@sxzz](https://github.com/sxzz) and [@antfu](https://github.com/antfu)

## License

[MIT](./LICENSE)

Copyright (c) 2025-present, Zhifeng (Jeff) Wang
