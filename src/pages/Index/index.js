import React, { useEffect } from 'react'
import { Layout, message } from 'antd'
import MySider from './MySider'
import MyHeader from './MyHeader'
import MyContent from './MyContent'
import { getUser } from '@/store/actions'
import { connect, useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Api } from '@/apis'

const { Header, Sider, Content } = Layout;

const store = connect(
    (state) => state,
    (dispatch) => bindActionCreators({ getUser }, dispatch)
)
@store
class Index extends React.Component {
    //因为这些状态在不同组件中使用了，所以这里使用了状态提升（这里也可以用状态管理,为了学习这里就使用状态提升）
    state = {
        collapsed: false,  //侧边栏的折叠和展开
        panes: [],    //网站打开的标签页列表
        activeMenu: '',  //网站活动的菜单
        theme: 'dark',   //侧边栏主题
    };
    componentDidMount () {
        this.init()
        Api.asset.queryAllDept().then(res => {
            console.log(res)
        }).catch(err => {
            message.error('测试请求')
        })
    }
    init = async () => {
        const username = localStorage.getItem('username')
        await this.props.getUser({ username })
    }
    _setState = (obj) => {
        this.setState(obj)
    }
    render () {
        const { collapsed, panes, activeMenu, theme } = this.state
        return (
            <Layout style={{ height: '100vh' }}>
                <Sider trigger={null} collapsible collapsed={collapsed} theme={theme}>
                    <MySider
                        theme={theme}
                        panes={panes}
                        activeMenu={activeMenu}
                        onChangeState={this._setState} />
                </Sider>
                <Layout>
                    <Header style={{ padding: 0 }}>
                        <MyHeader
                            theme={theme}
                            collapsed={collapsed}
                            onChangeState={this._setState} />
                    </Header>
                    <Content>
                        <MyContent
                            panes={panes}
                            activeMenu={activeMenu}
                            onChangeState={this._setState} />
                    </Content>
                </Layout>
            </Layout>
        )
    }
}

export default Index