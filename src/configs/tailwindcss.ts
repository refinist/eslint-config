import { GLOB_TAILWINDCSS } from '../globs';
import { pluginBetterTailwindcss } from '../plugins';
import type { Config } from '../types';

type TailwindcssOptionsBase = {
  /**
   * tailwindcss 3: the path to the tailwind config file (eg: `tailwind.config.js`)
   *
   * @default 'tailwind.config.js'
   */
  tailwindConfig?: string;
  /**
   * tailwindcss 4: the path to the entry file of the css based tailwind config (eg: `src/global.css`)
   *
   * @default 'src/global.css'
   */
  entryPoint?: string;
  /**
   * files to apply tailwindcss rules
   *
   * @default [GLOB_JS, GLOB_JSX, GLOB_TS, GLOB_TSX, GLOB_VUE, GLOB_HTML]
   */
  files?: string[];

  [key: string]: any;
};

export type TailwindcssOptions =
  | (TailwindcssOptionsBase & { tailwindConfig: string })
  | (TailwindcssOptionsBase & { entryPoint: string });

export const tailwindcss = ({
  tailwindConfig,
  entryPoint,
  files = GLOB_TAILWINDCSS
}: TailwindcssOptions): Config[] => {
  if (!entryPoint && !tailwindConfig) {
    throw new Error(
      'Tailwindcss configuration requires at least one of entryPoint (Tailwind CSS 4) or tailwindConfig (Tailwind CSS 3).\n' +
        'See https://github.com/schoero/eslint-plugin-better-tailwindcss/tree/main?tab=readme-ov-file#quick-start for more details.\n'
    );
  }

  const settings: TailwindcssOptionsBase = { entryPoint, tailwindConfig };

  // https://github.com/schoero/eslint-plugin-better-tailwindcss/blob/main/docs/parsers/tsx.md#flat-config

  return [
    {
      files,
      name: 'refinist/tailwind',
      plugins: {
        'better-tailwindcss': pluginBetterTailwindcss
      },
      rules: {
        // enable all recommended rules to report a warning
        ...pluginBetterTailwindcss.configs['recommended-warn'].rules,

        // https://github.com/schoero/eslint-plugin-better-tailwindcss/issues/45
        'better-tailwindcss/enforce-consistent-line-wrapping': 'off', // Conflict with prettier

        // https://github.com/schoero/eslint-plugin-better-tailwindcss/blob/main/docs/rules/no-unregistered-classes.md#detectcomponentclasses
        // https://github.com/schoero/eslint-plugin-better-tailwindcss/issues/130#issuecomment-2985074748
        'better-tailwindcss/no-unregistered-classes': [
          'warn',
          { detectComponentClasses: true }
        ]
      },
      settings: {
        'better-tailwindcss': settings
      }
    }
  ];
};
