const path = require('path');
const {
  CheckerPlugin,
  TsConfigPathsPlugin,
} = require('awesome-typescript-loader');

//定一个通用的路径转换方法
const resolve = (pathStr) => path.resolve(__dirname, pathStr);

module.exports = {
  mode: 'development',
  entry: resolve('../../src/client/app/index.tsx'), //入口文件
  output: {
    filename: 'index.js', //设置打包后的文件名
    path: resolve('../../dist/static'), //设置构建结果的输出目录
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
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
      configFileName: resolve('../../client.tsconfig.json'),
    }),
    new CheckerPlugin(),
  ],
};
