import React from 'react'
import LoadableComponent from '../utils/LoadableComponent'
const ButtonDemo = LoadableComponent(import('./ButtonDemo/index'), true);
const IconDemo = LoadableComponent(import('./IconDemo/index'), true);
const FeedbackDemo = LoadableComponent(import('./FeedbackDemo/index'), true);

const menu = [
    {
        name: 'antd',
        icon: 'ant-design',
        key: 'antd',
        children: [
            {
                name: '表格',
                key: 'ButtonDemo',
            },
            {
                name: '图表',
                icon: '',
                key: 'IconDemo',
            },
            {
                name: '反馈',
                icon: '',
                key: 'FeedbackDemo',
            }
        ]
    },
    {
        name: '看板',
        icon: 'ant-design',
        key: '看板'
    },
    {
        name: '企业看板',
        icon: 'ant-design',
        key: '企业看板'
    }
]

const tabs = {
    ButtonDemo: <ButtonDemo />,
    IconDemo: <IconDemo />,
    FeedbackDemo: <FeedbackDemo />
}

export {
    menu,
    tabs
}