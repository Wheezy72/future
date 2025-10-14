/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  extends: ["@react-native/eslint-config"],
  env: {
    es6: true
  },
  plugins: [],
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: "module"
  },
  rules: {
    "no-unused-vars": ["warn", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off"
  },
  ignorePatterns: ["node_modules/", "dist/"]
};