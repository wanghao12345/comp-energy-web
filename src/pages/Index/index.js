import React, { useEffect, useState } from 'react'
import { Layout } from 'antd'
import MySider from './MySider'
import MyHeader from './MyHeader'
import MyContent from './MyContent'
import { tabs } from '../tabs'
import { Api } from '@/apis'
import { getStorage, setStorage } from '@/utils/storage'
const { Header, Sider, Content } = Layout;
export default (props) => {
    const [{
        collapsed,
        panes,
        activeMenu
    }, setState] = useState({
        collapsed: false,  //侧边栏的折叠和展开
        panes: [],    //网站打开的标签页列表
        activeMenu: '',  //网站活动的菜单
    })
    const _setState = (obj) => {
        setStorage(obj, 'localMenuData')
        setState({
            collapsed,
            panes,
            activeMenu,
            ...obj
        })
    }
    useEffect(() => {
        const localMenuData = getStorage('localMenuData') || {}
        console.log(localMenuData)
        // _setState(localMenuData)
        _setState({
            collapsed: localMenuData.collapsed || false,
            panes: (localMenuData.panes || []).map(item => ({
                ...item,
                content: tabs[item.key] || item.name
            })),
            activeMenu: localMenuData.activeMenu || ''
        })
    }, [])
    return (
        <Layout style={{ height: '100vh' }}>
            <Sider trigger={null} collapsible collapsed={collapsed} theme="dark">
                <MySider
                    panes={panes}
                    activeMenu={activeMenu}
                    onChangeState={_setState.bind(this)} />
            </Sider>
            <Layout>
                <Header style={{ padding: 0 }}>
                    <MyHeader
                        collapsed={collapsed}
                        onChangeState={_setState.bind(this)} />
                </Header>
                <Content>
                    <MyContent
                        panes={panes}
                        activeMenu={activeMenu}
                        onChangeState={_setState.bind(this)} />
                </Content>
            </Layout>
        </Layout>
    )
}