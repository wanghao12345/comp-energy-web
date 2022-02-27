import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Router } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import history from './utils/history'
import { Provider } from 'react-redux'
import store from './store'

moment.locale('zh-cn');

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <ConfigProvider locale={zh_CN}>
                <App />
            </ConfigProvider>
        </Router>
    </Provider >,
    document.getElementById('root'));