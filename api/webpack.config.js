const path = require('path')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

const { NODE_ENV = 'production' } = process.env

module.exports = {
  entry: './src/index.ts',
  mode: NODE_ENV,
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.js',
  },
  resolve: {
    extensions: ['.ts', '.js'],
    plugins: [new TsconfigPathsPlugin({ configFile: './tsconfig.json' })],
    alias: {
      '@db': path.resolve(__dirname, 'src/db'),
      '@routes': path.resolve(__dirname, 'src/routes'),
      '@controllers': path.resolve(__dirname, 'src/controllers'),
    },
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ['ts-loader'],
      },
    ],
  },
}
