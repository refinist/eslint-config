# @refinist/eslint-config

[![npm](https://img.shields.io/npm/v/@refinist/eslint-config.svg?colorA=4733bc&colorB=8080eb)](https://npmjs.com/package/@refinist/eslint-config) [![Unit Test](https://img.shields.io/github/actions/workflow/status/refinist/eslint-config/unit-test.yml?colorA=4733bc&colorB=8080eb&label=Unit%20Test)](https://github.com/refinist/eslint-config/actions/workflows/unit-test.yml) [![node compatibility](https://img.shields.io/node/v/@refinist/eslint-config?colorA=4733bc&colorB=8080eb)](https://nodejs.org/en/about/releases/) [![eslint compatibility](https://img.shields.io/badge/eslint->=9.5.0-brightgreen?colorA=4733bc&colorB=8080eb)](https://eslint.org/docs/latest/user-guide/getting-started)

为 JavaScript、TypeScript、Vue、React 和 Prettier 提供的 ESLint 配置预设

> [English Documentation](./README.md) | 中文文档

## 特性

- [x] 🎨 使用 **Prettier** 格式化
- [x] ⚡ 专为 **Vue3** & **TypeScript** 或 **React** & **TypeScript** 设计
- [x] 📋 [ESLint 扁平配置](https://eslint.org/docs/latest/use/configure/configuration-files-new)
- [x] 🚫 自动忽略常见文件如 `node_modules`、`dist` 和 `.gitignore` 中的文件
- [x] 🎯 最佳实践，只需一行配置
- [x] 💬 使用 `@stylistic/eslint-plugin` 的 [@stylistic/spaced-comment](https://eslint.style/rules/spaced-comment) 规则，在注释后添加空格（适合强迫症😬）
- [x] 💡 **React** + **TypeScript** 会默认启用 `type-aware`，[相关资料](https://typescript-eslint.io/getting-started/typed-linting/)
- [x] 💯 只为追求更高的代码质量，仅此而已
- [ ] 🌐 添加更多语言支持

## 安装

使用 pnpm、yarn、npm 或 bun

```bash
# 使用 pnpm
pnpm add -D @refinist/eslint-config

# 使用 yarn
yarn add -D @refinist/eslint-config

# 使用 npm
npm i -D @refinist/eslint-config

# 使用 bun
bun add -D @refinist/eslint-config
```

> [!WARNING]
> 如果你使用 react，请额外安装这三个包 `pnpm add -D @eslint-react/eslint-plugin eslint-plugin-react-hooks eslint-plugin-react-refresh`，然后手动引入 react eslint 包 `import { react } from '@refinist/eslint-config/react'` 配置如下👇

```ts
// eslint.config.ts
import { refinist } from '@refinist/eslint-config';
import { react } from '@refinist/eslint-config/react';
export default refinist({}, react());
```

需要 Node.js >= 20.0.0 和 ESLint >= 9.5.0。

## 使用方法

```ts
// eslint.config.ts
import { refinist } from '@refinist/eslint-config';
export default refinist();
```

```ts
// eslint.config.ts
import { refinist } from '@refinist/eslint-config';
export default refinist({
  vue: true, // 自动检测
  prettier: true // 默认为 true
});
```

### 规则覆盖

```ts
// eslint.config.ts
import { refinist } from '@refinist/eslint-config';
export default refinist(
  {},

  // 从第二个参数开始，它们是 ESLint 扁平配置
  // 你可以有多个配置
  {
    files: ['**/*.ts'],
    rules: {}
  },
  {
    rules: {}
  }
);
```

### 使用系统的 glob

```ts
// eslint.config.ts
import { refinist, GLOB_VUE } from '@refinist/eslint-config';
export default refinist(
  {},

  {
    files: [GLOB_VUE], // GLOB_VUE 是 '**/*.vue'
    rules: {
      'vue/block-order': 'off'
    }
  }
);
```

### 🔗 Prettier 配置

与 [@refinist/prettier-config](https://github.com/refinist/prettier-config) 结合使用

#### 安装

```bash
# 使用 pnpm
pnpm add -D @refinist/prettier-config

# 使用 yarn
yarn add -D @refinist/prettier-config

# 使用 npm
npm i -D @refinist/prettier-config

# 使用 bun
bun add -D @refinist/prettier-config
```

#### package.json 配置（推荐）

```json
// package.json
{
  "prettier": "@refinist/prettier-config"
}
```

#### .prettierrc 配置

```json
// .prettierrc.json
"@refinist/prettier-config"
```

#### prettier.config.js / prettier.config.mjs 配置

```js
// prettier.config.js
export { default } from '@refinist/prettier-config';
```

#### 规则覆盖

```ts
// prettier.config.js
import config from '@refinist/prettier-config';
/** @type {import('prettier').Config} */
export default {
  ...config

  /* 你的自定义配置 */
};
```

> [!TIP]
> 更多 Prettier 配置选项，请参考 [官方文档](https://prettier.io/blog/2025/02/09/3.5.0#api)

顺便说一下，我喜欢的配置方法是 `package.json` 😬

## `npm create vue@latest`

如果你使用了 [Vue 官方脚手架](https://github.com/vuejs/create-vue)，也就是 `npm create vue@latest` 来创建项目，以下是与官方模板快速集成的几个步骤：

### 如果你选择了 eslint 和 prettier

1. **移除** 相关包和文件

- `@vue/eslint-config-prettier`
- `@vue/eslint-config-typescript`
- `eslint-plugin-vue`
- `.prettierrc.json` 文件

> [!TIP]
> 保留 eslint 和 prettier 包

2. 安装 `@refinist/eslint-config` 和 `@refinist/prettier-config`

```bash
pnpm add -D @refinist/eslint-config @refinist/prettier-config
```

3. 配置 `eslint.config.ts`

```ts
// eslint.config.ts
import { refinist } from '@refinist/eslint-config';
export default refinist();
```

4. 配置 `prettier`

```json
// package.json
{
  "prettier": "@refinist/prettier-config"
}
```

5. 配置 `scripts`

```json
// package.json
{
  "scripts": {
    "lint": "eslint",
    "lint:fix": "eslint --fix"
  }
}
```

6. 验证/修复

```bash
pnpm run lint
pnpm run lint:fix
```

> [!WARNING]
> 如果你的 ESLint 配置文件是 `.ts` 并且在运行 `pnpm run lint` 时遇到错误，这是因为你没有 jiti 库作为依赖。[参考链接](https://eslint.org/docs/latest/use/configure/configuration-files#typescript-configuration-files)，或者你可以简单地切换到 `eslint.config.js` 而不是使用 `.ts`，这也很好用！

完成！

> [!TIP]
> 如果你没有选择 eslint 和 prettier，请将上面的步骤 1 替换为 `pnpm add -D eslint` 和 `pnpm add -D prettier`，然后继续上面的步骤！

## VS Code 设置

```json
// .vscode/settings.json
{
  "editor.formatOnSave": false,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  }
}
```

受 [@sxzz](https://github.com/sxzz) 和 [@antfu](https://github.com/antfu) 启发

## 许可证

[MIT](./LICENSE)

Copyright (c) 2025-present, Zhifeng (Jeff) Wang
