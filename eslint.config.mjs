import next from "eslint-config-next";
import prettier from "eslint-config-prettier";

/**
 * ESLint flat config. `eslint-config-next` ships native flat configs
 * (core-web-vitals + typescript), so they're spread in directly.
 * `eslint-config-prettier` is last to disable rules that conflict with Prettier.
 */
const eslintConfig = [
  ...next,
  prettier,
  {
    ignores: ["node_modules/**", ".next/**", "out/**", "next-env.d.ts"],
  },
];

export default eslintConfig;
