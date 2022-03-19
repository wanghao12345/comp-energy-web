import { FC, useState } from 'react';
import { history } from 'umi';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import type { BasicLayoutProps } from '@ant-design/pro-layout';
import ProLayout, { PageContainer } from '@ant-design/pro-layout';
import { TabMenu } from '@/components';
import routes from '../../config/routes';

const BasicLayout: FC = ({ children }) => {
  const [pathname, setPathname] = useState('/dashboard');
  const [collapsed, setCollapsed] = useState(false);
  const props: BasicLayoutProps = {
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
      {...props}
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
      <TabMenu>{children}</TabMenu>
    </ProLayout>
  );
};

export default BasicLayout;
