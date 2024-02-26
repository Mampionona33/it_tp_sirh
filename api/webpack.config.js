const path = require('path')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
<<<<<<< HEAD
const CopyPlugin = require('copy-webpack-plugin')
=======
>>>>>>> 64f0ab4785ac05f9167f6e115a3046c1ffd49147

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
<<<<<<< HEAD
  plugins: [
    new CopyPlugin({
      patterns: [{ from: 'src/db', to: 'db' }],
    }),
  ],
=======
>>>>>>> 64f0ab4785ac05f9167f6e115a3046c1ffd49147
}
