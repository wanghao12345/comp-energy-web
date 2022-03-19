import React from 'react';
import { Tabs } from 'antd';
import styles from './index.less';

const { TabPane } = Tabs;
export const TabMenu: React.FC = ({ children }) => {
  const tabs = [
    {
      label: 'tab 1',
    },
    {
      label: 'tab 2',
    },
    {
      label: 'tab 3',
    },
    {
      label: 'tab 4',
    },
    {
      label: 'tab 5',
    },
    {
      label: 'tab 6',
    },
    {
      label: 'tab 7',
    },
  ];
  return (
    <div className={styles['tabMenuContainer']}>
      <div className={styles['tabMenuHeader']}>
        <Tabs
          className={styles['tabsBox']}
          defaultActiveKey="0"
          type="card"
          tabPosition={'top'}
        >
          {tabs.map((tab: any, index: number) => (
            <TabPane
              className={styles['tabBox']}
              tab={tab.label}
              key={index + ''}
            ></TabPane>
          ))}
        </Tabs>
      </div>
      <div className={styles.tabMenuBody}>{children}</div>
    </div>
  );
};
