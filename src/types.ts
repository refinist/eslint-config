import type { Linter } from 'eslint';
// Relax plugins type limitation, as most of the plugins did not have correct type info yet.
export type Config = Omit<Linter.Config<Linter.RulesRecord>, 'plugins'> & {
  plugins?: Record<string, any>;
};

export type Arrayable<T> = T | T[];
