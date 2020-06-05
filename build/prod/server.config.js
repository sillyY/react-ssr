const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
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
    filename: 'js/[name].[chunkhash:8].js', //设置打包后的文件名
    path: resolve('../../dist/app'), //设置构建结果的输出目录
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@': resolve('../../dist'),
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
      process_env: { NODE_ENV: 'production' },
      _IS_PROD_: true,
    }),
    new ManifestPlugin({
      filename: '../app/asset-manifest.json',
    }),
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          compresee: {
            drop_console: true,
            drop_debugger: true,
          },
          warnings: false,
          ie8: true,
          output: {
            comments: false,
          },
        },
        cache: true,
        sourceMap: false,
      }),
    ],
    splitChunks: {
      cacheGroups: {
        libs: {
          test: /node_modules/,
          chunks: 'initial',
          name: 'libs',
        },
      },
    },
  },
});
