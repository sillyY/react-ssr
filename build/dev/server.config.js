const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const {
  CheckerPlugin,
  TsConfigPathsPlugin,
} = require('awesome-typescript-loader');

const baseConfig = require('../webpack.config');

//定一个通用的路径转换方法
const resolve = (pathStr) => path.resolve(__dirname, pathStr);

module.exports = merge(baseConfig, {
  mode: 'development',
  entry: resolve('../../src/server/app/index.ts'), //入口文件
  target: 'node',
  output: {
    filename: 'index.js', //设置打包后的文件名
    path: resolve('../../dist/server'), //设置构建结果的输出目录
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      //定义dist 目录别名，方便导入模块
      '@dist': path.resolve(__dirname, '../dist'),
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: 'awesome-typescript-loader',
        },
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new TsConfigPathsPlugin({
      configFileName: resolve('../../tsconfig.json'),
    }),
    new CheckerPlugin(),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: '"development"' },
      __IS_PROD__: false,
    }),
  ],
});
