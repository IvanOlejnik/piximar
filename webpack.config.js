const webpack = require('webpack'); //to access built-in plugins
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
  module.exports = {
    mode: 'development',
    entry: {
      app: './index.js',
    },
    devtool: 'source-map',
    devServer: {
        contentBase: './dist',
    },
    plugins: [
        new HtmlWebpackPlugin({template: './index.html'})
    ]
  };