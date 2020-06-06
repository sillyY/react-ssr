const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const chalk = require('chalk');
const clientConfig = require('../build/dev/client.config');
const getWdsConfig = require('../build/config/dev-server.config');
const proConfig = require('../build/config/config');
const freePort = require('./free-port');

const log = console.log;

let compilationTime = 0; //编译次数

const WDS_PORT = proConfig.wdsPort; //wds 服务端口

const HOST = 'localhost';

//释放wds端口
freePort(proConfig.wdsPort);

function getWebpackCompiler() {
  return webpack(clientConfig);
}

function createWdsServer(port) {
  let compiler = getWebpackCompiler();

  compiler.hooks.done.tap('done', (data) => {
    console.log('\n wds server compile done');
    if (compilationTime === 0) {
      //第一次编译完成的时，自动打开浏览器
      // open(`http://localhost:${NODE_SERVER_PORT}/`);
    }
    compilationTime += 1;
  });

  return new WebpackDevServer(
    compiler,
    getWdsConfig(port, clientConfig.output.publicPath)
  );
}

function runWdsServer() {
  let devServer = createWdsServer(WDS_PORT);

  devServer.listen(WDS_PORT, HOST, (err) => {
    if (err) {
      log(chalk.red(err));
    }
    log(chalk.cyan('Starting the development node server...\n'));
    log('🚀 started');
  });
}

runWdsServer();
