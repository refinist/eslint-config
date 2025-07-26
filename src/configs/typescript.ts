import { GLOB_JS, GLOB_TS, GLOB_TSX } from '../globs';
import { tseslint } from '../plugins';
import type { Config } from '../types';
import { restrictedSyntaxJs } from './javascript';

export const typescriptCore = ({
  typeAware = false
}: { typeAware?: boolean } = {}) =>
  // https://typescript-eslint.io/getting-started/typed-linting/
  // 📝 for react: react/no-leaked-conditional-rendering
  tseslint.config({
    extends: [
      ...(typeAware
        ? tseslint.configs.recommendedTypeChecked
        : tseslint.configs.recommended)
    ],

    ...(typeAware
      ? {
          languageOptions: {
            parserOptions: {
              projectService: true,
              tsconfigRootDir: process.cwd()
            }
          }
        }
      : undefined),

    files: [GLOB_TS, GLOB_TSX],
    name: 'refinist/typescript',
    rules: {
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/consistent-type-assertions': [
        'error',
        {
          assertionStyle: 'as',
          objectLiteralTypeAssertions: 'allow-as-parameter'
        }
      ],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { disallowTypeAnnotations: false, fixStyle: 'inline-type-imports' }
      ],
      '@typescript-eslint/method-signature-style': ['error', 'property'], // https://www.totaltypescript.com/method-shorthand-syntax-considered-harmful
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-import-type-side-effects': 'error',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-redeclare': 'error',
      '@typescript-eslint/no-unsafe-function-type': 'off',
      '@typescript-eslint/no-unused-expressions': [
        'error',
        {
          allowShortCircuit: true,
          allowTaggedTemplates: true,
          allowTernary: true
        }
      ],

      // handled by unused-imports/no-unused-imports
      '@typescript-eslint/no-unused-vars': 'off',

      '@typescript-eslint/prefer-as-const': 'warn',
      '@typescript-eslint/prefer-literal-enum-member': [
        'error',
        { allowBitwiseExpressions: true }
      ],

      'no-restricted-syntax': [
        'error',
        ...restrictedSyntaxJs,
        'TSEnumDeclaration[const=true]'
      ]
    }
  }) as Config[];

export const typescript = ({
  typeAware = false
}: { typeAware?: boolean } = {}): Config[] => [
  ...typescriptCore({ typeAware }),

  {
    files: ['**/*.d.ts'],
    name: 'refinist/typescript/dts-rules',
    rules: {
      'eslint-comments/no-unlimited-disable': 'off',
      'import/no-duplicates': 'off',
      'no-restricted-syntax': 'off',
      'unused-imports/no-unused-vars': 'off'
    }
  },
  {
    files: [GLOB_JS, '**/*.cjs'],
    name: 'refinist/typescript/cjs-rules',
    rules: {
      '@typescript-eslint/no-require-imports': 'off'
    }
  }
];
