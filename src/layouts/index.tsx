import { FC, useState } from 'react';
import { history } from 'umi';
import { connect } from 'dva';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import type { BasicLayoutProps } from '@ant-design/pro-layout';
import ProLayout, { PageContainer } from '@ant-design/pro-layout';
import { TabMenu } from '@/components';
import routes from '../../config/routes';

const BasicLayout: FC = (props: any) => {
  const { children, activeMenu, tabMenu, onChangeActiveMenu, onChangemenuTab } =
    props;
  const [pathname, setPathname] = useState('/dashboard');
  const [collapsed, setCollapsed] = useState(false);

  const handleChangeMenu = (item: any) => {
    let flag = false;
    tabMenu.forEach((menu: any) => {
      if (menu.name === item.name) {
        flag = true;
      }
    });
    if (!flag) {
      onChangemenuTab([
        ...tabMenu,
        {
          name: item.name,
          path: item.path,
        },
      ]);
    }
  };

  const layoutProps: BasicLayoutProps = {
    route: routes[0],
    location: {
      pathname,
    },
    siderWidth: 216,
    navTheme: 'dark',
    contentStyle: {
      background: '#142655',
      margin: 0,
    },
    collapsed,
    fixSiderbar: true,
    collapsedButtonRender: false,
    menuItemRender: (item: any, dom) => (
      <a
        onClick={() => {
          onChangeActiveMenu(item.name);
          handleChangeMenu(item);
          setPathname(item.path || '/dashboard');
          history.push(item.path);
        }}
      >
        {dom}
      </a>
    ),
  };
  return (
    <ProLayout
      {...layoutProps}
      onCollapse={setCollapsed}
      headerContentRender={() => {
        return (
          <div
            onClick={() => setCollapsed(!collapsed)}
            style={{
              cursor: 'pointer',
              fontSize: '16px',
            }}
          >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </div>
        );
      }}
    >
      <TabMenu
        activeMenu={activeMenu}
        tabMenu={tabMenu}
        onChangeActiveMenu={onChangeActiveMenu}
        onChangemenuTab={onChangemenuTab}
      >
        {children}
      </TabMenu>
    </ProLayout>
  );
};
const mapStateToProps = (state: any, ownProps: any) => {
  return {
    ...state.global,
  };
};

const mapDispatchToProps = (dispatch: any, ownProps: any) => {
  return {
    onChangemenuTab: (tabMenu: any[]) => {
      dispatch({
        type: 'global/changeTabMenu',
        payload: {
          tabMenu: tabMenu,
        },
      });
    },
    onChangeActiveMenu: (name: string) => {
      dispatch({
        type: 'global/changeActiveMenu',
        payload: {
          activeMenu: name,
        },
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BasicLayout);
