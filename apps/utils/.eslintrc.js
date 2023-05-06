/**
 * @type {import("eslint").Linter.Config}
 */
module.exports = {
  root: true,
  extends: ['bucket'],
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  rules: {
    'no-console': 'off',
    'func-names': 'off',
    'consistent-return': 'off',
    'import/no-extraneous-dependencies': 'off',
  },
};
