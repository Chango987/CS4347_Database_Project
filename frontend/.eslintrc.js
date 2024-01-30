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
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true, // Enable JSX parsing
    },
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
