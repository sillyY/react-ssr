import koa from 'koa';
import koaStatic from 'koa-static';
import path from 'path';
import reactSSR from '../middlewares/ssr';
import proConfig from '../../../build/config/config';

const app = new koa();

const port = proConfig.nodeServerPort || process.env.PORT;
app.use(koaStatic(path.join(__dirname, '../../../dist/static')));

app.use(reactSSR);

app.listen(port, () => {
  console.log('server is start .', `http://localhost:${port}`);
});
