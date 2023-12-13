module.exports = {
  semi: false,
  trailingComma: 'all',
  singleQuote: true,
  printWidth: 80,
  tabWidth: 2,
  endOfLine: 'auto',
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      options: {
        parser:'typescript',
      },
    },
  ],
}
