import { pluginStylistic } from '../plugins';
import type { Config } from '../types';

export const stylistic = (): Config[] => [
  {
    name: 'refinist/stylistic',
    plugins: {
      '@stylistic': pluginStylistic
    },
    rules: {
      // https://github.com/eslint-stylistic/eslint-stylistic/pull/294
      '@stylistic/spaced-comment': [
        'error',
        'always',
        {
          block: { balanced: true }
        }
      ]
    }
  }
];
