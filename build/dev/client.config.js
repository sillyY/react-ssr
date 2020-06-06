const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {
  CheckerPlugin,
  TsConfigPathsPlugin,
} = require('awesome-typescript-loader');

const baseConfig = require('../webpack.config');

//定一个通用的路径转换方法
const resolve = (pathStr) => path.resolve(__dirname, pathStr);

module.exports = merge(baseConfig, {
  mode: 'development',
  entry: resolve('../../src/client/app/index.tsx'), //入口文件
  output: {
    filename: '[name].js', //设置打包后的文件名
    path: resolve('../../dist/static'), //设置构建结果的输出目录
    publicPath: 'http://localhost:9002/',
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new TsConfigPathsPlugin({
      configFileName: resolve('../../client.tsconfig.json'),
    }),
    new CheckerPlugin(),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: '"development"' },
      __IS_PROD__: false,
    }),
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        libs: {
          // 抽离第三方库
          test: /node_modules/, // 指定是node_modules下的第三方包
          chunks: 'initial',
          name: 'libs', // 打包后的文件名，任意命名
        },
      },
    },
  },
});
