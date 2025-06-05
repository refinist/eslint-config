import {
  ignores,
  javascript,
  typescript,
  vue,
  prettier,
  stylistic
} from './configs';
import { hasVue } from './env';
import type { Config } from './types';
import type { Linter } from 'eslint';

const presetBasic = () => [
  ...ignores(),
  ...javascript(),
  ...stylistic(),
  ...typescript()
];

export interface Options {
  vue?: boolean;
  prettier?: boolean;
}

export function refinist(
  options: Options = {},
  ...userConfigs: (Config | Linter.Config)[]
): Config[] {
  const { prettier: enablePrettier = true, vue: enableVue = hasVue() } =
    options;

  const configs: Config[] = [...presetBasic()];

  if (enableVue) {
    configs.push(...vue());
  }

  if (enablePrettier) {
    configs.push(...prettier());
  }

  return [...configs, ...userConfigs];
}
