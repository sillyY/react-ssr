import koa from 'koa';
import koaStatic from 'koa-static';
import path from 'path';
import reactSSR from '../middlewares/ssr'

const app = new koa();

app.use(koaStatic(path.join(__dirname, '../../../dist/static')));

app.use(reactSSR)

app.listen(9001, () => {
  console.log('server is start .9001')
})

