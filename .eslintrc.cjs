module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    'react-app',
    'eslint:recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh', 'jsx-a11y', 'react-hooks'],
  rules: {
    'react-refresh/only-export-components': 'warn',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
  },
};
