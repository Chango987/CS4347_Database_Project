module.exports = {
  settings: {
    react: {
      version: 'detect',
    },
  },
  ignorePatterns: ['build/*', 'public/*'],
  env: {
    es2021: true,
    node: true,
    browser: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    indent: 'off', // Disable the indent rule
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'never', // Exception for JSX
        exports: 'never', // Exception for JSX
        functions: 'never', // Exception for JSX
      },
    ],
    // ... (other rules)
    'arrow-spacing': ['error', { before: true, after: true }],
    'nonblock-statement-body-position': ['error', 'beside'],
    'keyword-spacing': ['error', { before: true, after: true }],
  },
};
