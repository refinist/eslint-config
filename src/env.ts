import { isPackageExists } from 'local-pkg';

export const hasTypeScript = (): boolean => isPackageExists('typescript');

export const hasVue = (): boolean =>
  ['vue', 'nuxt', 'vitepress', '@slidev/cli'].some(i => isPackageExists(i));

export const hasReact = (): boolean =>
  [
    'react',
    'react-dom',
    'react-router',
    '@remix-run/node',
    '@remix-run/react',
    '@remix-run/serve',
    '@remix-run/dev',
    '@react-router/node',
    '@react-router/react',
    '@react-router/serve',
    '@react-router/dev',
    'next'
  ].some(i => isPackageExists(i));
