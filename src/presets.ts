import {
  ignores,
  javascript,
  typescript,
  vue,
  prettier,
  stylistic
} from './configs';
import { hasVue } from './env';
import type { Arrayable, Config } from './types';
import type { Linter } from 'eslint';

const presetBasic = ({ typeAware = false }: { typeAware?: boolean } = {}) => [
  ...ignores(),
  ...javascript(),
  ...stylistic(),

  ...typescript({ typeAware })
];

export interface Options {
  vue?: boolean;
  prettier?: boolean;
}

export function refinist(
  options: Options = {},
  // Can be a non-strict Config, or the original Linter config
  ...userConfigs: Arrayable<Config | Linter.Config>[]
): Config[] {
  const { vue: enableVue = hasVue(), prettier: enablePrettier = true } =
    options;
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

  return [...configs, ..._userConfigs];
}
