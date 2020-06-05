import React from 'react';
import Index from '../../client/pages/index';
import getAssets from '../common/assets';
import { renderToString } from 'react-dom/server';

const assetsMap = getAssets();

export default (ctx: any, next: any) => {
  const html = renderToString(<Index />);
  ctx.body = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>my react ssr</title>
  ${assetsMap.css.join('')}
</head>
<body>
  <div id="root">
     ${html}
  </div>
</body>
</html>
<script type="text/javascript"  src="index.js"></script>
${assetsMap.js.join('')}
`;

  return next();
};
