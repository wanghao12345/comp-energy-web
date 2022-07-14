import { BellOutlined, DownOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, Space } from 'antd';
import { FC, memo } from 'react';
import { MyHeaderMenuComp, PersonInfo } from './style';
type Iprops = {};
const MyHeaderMenu: FC<Iprops> = memo((props) => {
  return (
    <MyHeaderMenuComp {...props}>
      <BellOutlined className="icon" />
      <Avatar className="avatar" icon={<UserOutlined />} />
      <Dropdown
        overlay={
          <PersonInfo>
            <div>个人中心</div>
            <div>修改密码</div>
            <div>退出登录</div>
          </PersonInfo>
        }
        trigger={['click']}
      >
        <Space style={{ cursor: 'pointer' }}>
          小茗同学
          <DownOutlined />
        </Space>
      </Dropdown>
    </MyHeaderMenuComp>
  );
});

MyHeaderMenu.displayName = 'MyHeaderMenu';

export default MyHeaderMenu;
