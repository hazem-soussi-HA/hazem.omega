// Flat ESLint configuration compatible with ESLint v9.
// We leverage the compatibility layer provided by @eslint/eslintrc to
// import the traditional "eslint-config-next" shareable config.
import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({
  // The base directory for resolving extends and plugins.
  baseDirectory: import.meta.url,
});

export default [
  // Extend the Next.js ESLint rules.
  ...compat.extends("eslint-config-next"),
  // Additional project‑specific rules can be added here.
];