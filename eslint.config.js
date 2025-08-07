import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  js.configs.recommended,
  ...compat.extends(
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking"
  ),
  {
    languageOptions: {
      parser: "@typescript-eslint/parser",
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: __dirname,
      },
    },
  },
  {
    ignores: [
      "app/build/**",
      ".next/**",
      "node_modules/**",
      "*.d.ts"  // Add this to ignore type declaration files
    ],
  },
  {
    rules: {
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
      "no-console": "warn",
    },
  },
];