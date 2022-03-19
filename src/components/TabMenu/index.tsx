import React from 'react';
// import { Tabs } from 'antd';
import styles from './index.less';

// const { TabPane } = Tabs;
export const TabMenu: React.FC = ({ children }) => {
  return (
    <div className={styles.tabMenuContainer}>
      <div className={styles.tabMenuHeader}>
        {/* <Tabs defaultActiveKey="1" tabPosition={'top'} style={{ height: 220 }}>
          {[...Array.from({ length: 30 }, (v, i) => i)].map(i => (
            <TabPane tab={`Tab-${i}`} key={i} disabled={i === 28}>
              Content of tab {i}
            </TabPane>
          ))}
        </Tabs> */}
      </div>
      <div className={styles.tabMenuBody}>{children}</div>
    </div>
  );
};
