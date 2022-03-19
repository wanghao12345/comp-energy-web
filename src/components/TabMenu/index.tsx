import React, { useState } from 'react';
import { Tabs } from 'antd';
import { TabMenuContainer, TabsContainer, BodyContainer } from './style';

const { TabPane } = Tabs;
export const TabMenu: React.FC = ({ children }) => {
  const [activeKey, setActiveKey] = useState('0');
  const [tabs, setTabs] = useState([
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
  ]);
  const onChange = (activeKey: string) => {
    setActiveKey(activeKey);
  };
  const onEdit = (targetKey: any, action: any) => {
    remove(targetKey);
  };
  const remove = (targetKey: any) => {
    tabs.splice(targetKey, 1);
    setTabs([...tabs]);
  };

  return (
    <TabMenuContainer>
      <TabsContainer>
        <Tabs
          hideAdd
          defaultActiveKey={activeKey}
          type="editable-card"
          tabPosition={'top'}
          onEdit={onEdit}
          onChange={onChange}
        >
          {tabs.map((tab: any, index: number) => (
            <TabPane tab={tab.label} key={index + ''}></TabPane>
          ))}
        </Tabs>
      </TabsContainer>
      <BodyContainer>{children}</BodyContainer>
    </TabMenuContainer>
  );
};
