import React from 'react'
import screenfull from 'screenfull'
import { Icon, Menu, Avatar } from 'antd'
import { removeStorage } from '@/utils/storage'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const store = connect(
    (state) => ({ user: state.user })
)

@withRouter @store
class MyHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFullscreen: false,    //控制页面全屏
            infoVisible: false,     //控制修改用户信息的模态框
            passwordVisible: false   //控制修改密码的模态框
        }
    }
    /**
     * 切换侧边栏的折叠和展开
     */
    toggleCollapsed = () => {
        this.props.onChangeState({
            collapsed: !this.props.collapsed
        })
    }
    /**
     * 切换全屏
     */
    toggleFullscreen = () => {
        if (screenfull.enabled) {
            screenfull.toggle().then(() => {
                this.setState({
                    isFullscreen: screenfull.isFullscreen
                })
            });
        }
    }
    /**
     * 退出登录
     */
    onLogout = () => {
        removeStorage()   //清空cookie
        this.props.history.push('/login')
    }
    render () {
        const { isFullscreen } = this.state
        const { user } = this.props
        return (
            <div style={{ padding: '0 16px' }}>
                <Icon
                    style={{ fontSize: 18, color: '#ccdaeb' }}
                    type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
                    onClick={this.toggleCollapsed}
                />
                <div style={styles.headerRight}>
                    <div style={styles.headerItem}>
                        <div style={styles.avatarBox}>
                            <Icon type="search" style={{ fontSize: 20, cursor: 'pointer', padding: '10px' }} />
                            <Icon type="bell" style={{ fontSize: 20, cursor: 'pointer', padding: '10px' }} />
                        </div>
                        <Menu mode="horizontal" selectable={false}>
                            <SubMenu title={<div style={styles.avatarBox}><Avatar size='small' src={user.avatar} />&nbsp;<span>{user.username}</span></div>}>
                                <MenuItemGroup>
                                    <Menu.Item key={2} onClick={this.onLogout}><Icon type="logout" />退出登录</Menu.Item>
                                    <Menu.Item key={3} onClick={this.toggleFullscreen}><Icon type={isFullscreen ? 'fullscreen-exit' : 'fullscreen'} />切换全屏</Menu.Item>
                                </MenuItemGroup>
                            </SubMenu>
                        </Menu>
                    </div>
                </div>
            </div>
        )
    }
}

const styles = {
    headerRight: {
        float: 'right',
        display: 'flex',
        height: 64,
        marginRight: 50
    },
    headerItem: {
        display: 'flex',
        alignItems: 'center',
        padding: '0 20px'
    },
    avatarBox: {
        display: 'flex',
        alignItems: 'center',
    }
}

export default MyHeader