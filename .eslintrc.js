module.exports = {
  root: true,
  parser: 'vue-eslint-parser',
  plugins: ['@typescript-eslint'],
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    ecmaVersion: 2020
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended'
  ],
  rules: {
    'no-unused-vars': 0,
    'vue/no-setup-props-destructure': 0
  }
}
