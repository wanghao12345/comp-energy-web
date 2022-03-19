import React from 'react';
import { Tabs } from 'antd';
import { TabMenuContainer, TabsContainer, BodyContainer } from './style';

const { TabPane } = Tabs;
export const TabMenu: React.FC = ({ children }) => {
  const tabs = [
    {
      label: '数据看板',
    },
    {
      label: '实时监控',
    },
    {
      label: '能源管理',
    },
    {
      label: '用电分析',
    },
    {
      label: '报警管理',
    },
  ];
  return (
    <TabMenuContainer>
      <TabsContainer>
        <Tabs
          hideAdd
          defaultActiveKey="0"
          type="editable-card"
          tabPosition={'top'}
        >
          {tabs.map((tab: any, index: number) => (
            <TabPane tab={tab.label} key={index + ''}></TabPane>
          ))}
        </Tabs>
      </TabsContainer>
      <BodyContainer></BodyContainer>
    </TabMenuContainer>
  );
};
