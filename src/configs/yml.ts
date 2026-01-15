import { GLOB_YAML } from '../globs';
import { parserYml, pluginYml } from '../plugins';
import type { Config } from '../types';
import type { Linter } from 'eslint';

export const yml = (): Config[] => [
  {
    name: 'refinist/yaml/setup',
    plugins: {
      yml: pluginYml as any
    }
  },
  {
    files: [GLOB_YAML],
    languageOptions: {
      parser: parserYml
    },
    name: 'refinist/yaml/rules',
    rules: {
      ...(pluginYml.configs.standard.rules as Linter.RulesRecord),
      ...(pluginYml.configs.prettier.rules as Linter.RulesRecord),
      'yml/no-empty-mapping-value': 'off'
    }
  }
];
