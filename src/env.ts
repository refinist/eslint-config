import { isPackageExists } from 'local-pkg';

export const hasTypeScript = (): boolean => isPackageExists('typescript');

export const hasVue = (): boolean =>
  isPackageExists('vue') ||
  isPackageExists('nuxt') ||
  isPackageExists('vitepress') ||
  isPackageExists('@slidev/cli');
