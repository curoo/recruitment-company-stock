const path = require('path');
const dotenv = require('dotenv');
const webpack = require('webpack');

dotenv.config({ path: path.join(__dirname, '../../.env') });

module.exports = {
  mode: 'development',
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  devServer: {
    proxy: {
      '/api': `http://localhost:${process.env.API_PORT}`
    },
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
  },
};
