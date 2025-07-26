import {
  ignores,
  javascript,
  typescript,
  vue,
  react,
  prettier,
  stylistic
} from './configs';
import { hasVue, hasReact } from './env';
import type { Config } from './types';
import type { Linter } from 'eslint';

const presetBasic = ({ typeAware = false }: { typeAware?: boolean } = {}) => [
  ...ignores(),
  ...javascript(),
  ...stylistic(),

  ...typescript({ typeAware })
];

export interface Options {
  vue?: boolean;
  react?: boolean;
  prettier?: boolean;
}

export function refinist(
  options: Options = {},
  // Can be a non-strict Config, or the original Linter config
  ...userConfigs: (Config | Linter.Config)[]
): Config[] {
  const {
    vue: enableVue = hasVue(),
    react: enableReact = hasReact(),
    prettier: enablePrettier = true
  } = options;

  const configs: Config[] = [...presetBasic({ typeAware: enableReact })];

  if (enableVue) {
    configs.push(...vue());
  }

  if (enableReact) {
    configs.push(...react());
  }

  if (enablePrettier) {
    configs.push(...prettier());
  }

  return [...configs, ...userConfigs];
}
