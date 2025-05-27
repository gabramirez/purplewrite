module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "google",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ["tsconfig.json", "tsconfig.dev.json"],
    sourceType: "module",
  },
  plugins: [
    "@typescript-eslint",
    "import",
  ],
  rules: {  
   // Regras desativadas para evitar alertas chatos
    'no-trailing-spaces': 'off',
    'eol-last': 'off',
    'no-multi-spaces': 'off',
    'comma-spacing': 'off',
    'key-spacing': 'off',
    'arrow-parens': 'off',
    'require-jsdoc': 'off',
    'no-empty': 'off',
    'no-throw-literal': 'off',
    'import/no-unresolved': 'off',
    'import/no-duplicates': 'off',

    // Desativa padrões de estilo
    'semi': 'off',
    'quotes': 'off',
    'indent': 'off',
    'comma-dangle': 'off',
    'object-curly-spacing': 'off',
    'space-before-function-paren': 'off',
    'max-len': 'off',
    'keyword-spacing': 'off',
    'brace-style': 'off',
    'padded-blocks': 'off',
    'space-before-blocks': 'off',

    // Typescript específicos
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
  },
  ignorePatterns: ['lib/**', 'dist/**', 'node_modules/**'],
};