const config = require('eslint-config-standard-typescript-prettier')

module.exports = {
  ...config,
  plugins: ['only-warn'],
  parserOptions: { project: './tsconfig.json' },
  rules: {
    ...config.rules,
    '@typescript-eslint/no-explicit-any': 'error',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
}
