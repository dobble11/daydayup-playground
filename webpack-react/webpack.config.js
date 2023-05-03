const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const devMode = process.env.NODE_ENV !== 'production';

/** @type {import('webpack').Configuration} */
const config = {
  entry: './src/index.tsx',
  output: {
    path: path.join(__dirname, 'dist'),
    clean: true,
    filename: devMode ? '[name].js' : '[name].[contenthash:8].js',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: [devMode ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './index.html',
      publicPath: '/',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:8].css',
    }),
    devMode && new ReactRefreshWebpackPlugin(),
  ].filter(Boolean),
  devServer: {
    static: './dist',
  },
  watchOptions: {
    // 默认为空，不监听的 node_modules 目录下的文件
    ignored: /node_modules/,
  },
};

module.exports = config;
