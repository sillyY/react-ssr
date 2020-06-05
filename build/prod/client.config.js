const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

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
    filename: 'js/[name].[chunkhash:8].js', //设置打包后的文件名
    path: resolve('../../dist/static'), //设置构建结果的输出目录
  },
  plugins: [
    new TsConfigPathsPlugin({
      configFileName: resolve('../../client.tsconfig.json'),
    }),
    new CheckerPlugin(),
    new webpack.DefinePlugin({
      process_env: { NODE_ENV: 'production' },
      _IS_PROD_: true,
    }),
    new MiniCssExtractPlugin({
      //设置 css
      filename: 'css/[name].[contenthash:8].css',
    }),
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          compresee: {
            drop_console: true,
            drop_debugger: true
          },
          warnings: false,
          ie8: true,
          output: {
            comments: false
          }
        },
        cache: true,
        sourceMap: false
      }),
      new OptimizeCSSAssetsPlugin()
    ],
    splitChunks: {
      cacheGroups: {
        libs: {
          test: /node_modules/,
          chunks: 'initial',
          name: 'libs'
        }
      }
    }
  }
});
