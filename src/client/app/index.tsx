import React from 'react';
import ReactDom from 'react-dom';
import Index from '../pages/index';

//渲染 index 组件 到页面
ReactDom.hydrate(<Index />, document.getElementById('root'));

if (process.env.NODE_ENV === 'development' && (module as any).hot) {
  (module as any).hot.accept();
}
