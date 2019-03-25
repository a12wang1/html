import ReactDOM from 'react-dom';

import router from './router';

const Root = document.getElementById('root');

if (!Root) {
    throw new Error('当前页面不存在 <div id="root"></div> 节点.');
}

ReactDOM.render(router, Root);
