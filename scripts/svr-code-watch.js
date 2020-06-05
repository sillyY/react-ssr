const webpack = require('webpack');
const config = require('../build/dev/server.config');
const CONSTANTCODE = require('./constant');

const compiler = webpack(config);

const watching = compiler.watch(
  {
    aggregateTimeout: 300,
    ignored: /node_modules/,
    poll: 2000,
  },
  (err, stats) => {
    let json = stats.toJson('minimal');
    if (json.errors) {
      json.errors.forEach((item) => {
        console.error(item);
      });
    }
    if (json.warnings) {
      json.warnings.forEach((item) => {
        console.warn(item);
      });
    }

    console.log(CONSTANTCODE.SVRCODECOMPLETED);
  }
);

compiler.hooks.done.tap('done', function (data) {
  console.log('\n svr code done');
});

process.stdin.on('data', function (data) {
  if (data.toString() === 'exit') {
    process.exit();
  }
});
