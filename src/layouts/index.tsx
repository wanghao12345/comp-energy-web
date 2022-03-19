import React, { FC, useState } from 'react';
import { history } from 'umi';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import type { BasicLayoutProps } from '@ant-design/pro-layout';

import ProLayout, { PageContainer } from '@ant-design/pro-layout';
import routes from '../../config/routes';

const BasicLayout: FC = ({ children }) => {
  const [pathname, setPathname] = useState('/welcome');
  const [collapsed, setCollapsed] = useState(false);
  const Page = <PageContainer>123</PageContainer>;
  const props: BasicLayoutProps = {
    route: routes[0],
    location: {
      pathname,
    },
    navTheme: 'dark',
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
      {children}
    </ProLayout>
  );
};

export default BasicLayout;
