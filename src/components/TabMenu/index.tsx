import React, { useState, useEffect } from 'react';
import { history } from 'umi';
import { Space, Tabs } from 'antd';
import { TabMenuContainer, TabsContainer, BodyContainer } from './style';

const { TabPane } = Tabs;

type TabMenuProps = {
  activeMenu: string;
  tabMenu: any[];
  onChangeActiveMenu: (name: string) => void;
  onChangemenuTab: (menu: any[]) => void;
};

export const TabMenu: React.FC<TabMenuProps> = (props) => {
  const { children, activeMenu, tabMenu, onChangeActiveMenu, onChangemenuTab } =
    props;
  const [activeKey, setActiveKey] = useState('1');
  useEffect(() => {
    if (activeMenu && tabMenu && tabMenu.length) {
      let idx = '0';
      tabMenu.forEach((menu: any, index: number) => {
        if (activeMenu === menu.name) {
          idx = index + '';
        }
      });
      onChange(idx);
      setActiveKey(() => idx);
    }
  }, [activeMenu, tabMenu]);
  const onChange = (activeKey: string) => {
    history.push(tabMenu[Number(activeKey)].path);
    setActiveKey(activeKey);
  };
  const onEdit = (targetKey: any, action: any) => {
    remove(targetKey);
  };
  const remove = (targetKey: any) => {
    let tabs = JSON.parse(JSON.stringify(tabMenu));
    tabs.splice(targetKey, 1);
    onChangemenuTab([...tabs]);
    if (tabs.length - 1 >= targetKey * 1) {
      onChangeActiveMenu(tabs[targetKey * 1].name);
      history.push(tabs[targetKey * 1].path);
    } else {
      if (tabs.length) {
        let index = targetKey * 1 - 1 > -1 ? targetKey * 1 - 1 : 0;
        onChangeActiveMenu(tabs[index].name);
        history.push(tabs[index].path);
      } else {
        history.push('/dashboard');
      }
    }
  };

  return (
    <TabMenuContainer>
      <TabsContainer>
        <Tabs
          hideAdd
          activeKey={activeKey}
          type="editable-card"
          tabPosition={'top'}
          onEdit={onEdit}
          onChange={onChange}
        >
          {tabMenu.map((tab: any, index: number) => (
            <TabPane tab={tab.name} key={index + ''}></TabPane>
          ))}
        </Tabs>
      </TabsContainer>
      <BodyContainer>{children}</BodyContainer>
    </TabMenuContainer>
  );
};
