module.exports = {
  env: {
    node: true,
    es6: true,
    commonjs: true,
  },
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    wx: true,
    App: true,
    Page: true,
    getApp: true,
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': 'error', // prettier插件
    indent: ['error', 2], // 缩进2
    'linebreak-style': ['error', 'unix'], // 强制使用一致的换行风格
    quotes: ['error', 'single'], // 强制使用一致的反勾号、双引号或单引号
    semi: ['error', 'never'], //是否使用分号
    'no-unused-vars': 'off', //定义变量必须使用
    'no-console': 'off', // 不允许console
    'no-var': 'error', //要求使用 let 或 const 而不是 var
  },
}
