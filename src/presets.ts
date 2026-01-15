import {
  ignores,
  javascript,
  jsonc,
  prettier,
  sortImports,
  sortPackageJson,
  sortPnpmWorkspace,
  sortTsconfig,
  stylistic,
  tailwindcss,
  typescript,
  vue,
  yml,
  type TailwindcssOptions
} from './configs';
import { hasVue } from './env';
import type { Arrayable, Config } from './types';
import type { Linter } from 'eslint';

const presetBasic = ({ typeAware = false }: { typeAware?: boolean } = {}) => [
  ...ignores(),
  ...javascript(),
  ...stylistic(),

  ...typescript({ typeAware }),

  ...sortImports(),
  ...yml()
];

export interface Options {
  vue?: boolean;
  prettier?: boolean;
  tailwindcss?: TailwindcssOptions;
  /**
   * sort config files keys
   * files: package.json, pnpm-workspace.yaml, tsconfig.json, tsconfig.*.json
   *
   * sortImports is enabled by default
   *
   * @default true
   */
  sortKeys?: boolean;
}

export function refinist(
  options: Options = {},
  // Can be a non-strict Config, or the original Linter config
  ...userConfigs: Arrayable<Config | Linter.Config>[]
): Config[] {
  const {
    vue: enableVue = hasVue(),
    prettier: enablePrettier = true,
    tailwindcss: tailwindcssOptions,
    sortKeys: enableSortKeys = true
  } = options;
  const _userConfigs = [...userConfigs.flat()];
  const hasReact = _userConfigs.some(_ => _.name?.includes('refinist/react'));

  const configs: Config[] = [
    ...presetBasic({
      typeAware: hasReact
    })
  ];

  if (enableVue) {
    configs.push(...vue());
  }

  if (enablePrettier) {
    configs.push(...prettier());
  }

  if (tailwindcssOptions) {
    configs.push(...tailwindcss(tailwindcssOptions));
  }

  if (enableSortKeys) {
    configs.push(...jsonc());
    configs.push(...sortPackageJson());
    configs.push(...sortPnpmWorkspace());
    configs.push(...sortTsconfig());
  }

  return [...configs, ..._userConfigs];
}
