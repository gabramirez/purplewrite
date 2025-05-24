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
  ignorePatterns: [
    "/lib/**/*",
    "/generated/**/*",
  ],
  plugins: [
    "@typescript-eslint",
    "import",
  ],
  rules: {

  
    "no-trailing-spaces": "off",           
    "comma-spacing": "off",               
    "indent": "off",                
    "key-spacing": "off",                 
    "comma-dangle": "off",              

    "quotes": ["warn", "double", { "avoidEscape": true }],
    "max-len": "off",
    "object-curly-spacing": "off",
    "eol-last": "off",
    "semi": "off",

    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-unused-vars": "warn",
    "@typescript-eslint/no-explicit-any": "off",
    "import/no-unresolved": "off",
  },
};