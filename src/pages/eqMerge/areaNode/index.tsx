// 设备管理=>区域节点
import { Button, Table, Space, Switch, Input } from 'antd';
import { Page } from './style';
import { SearchOutlined } from '@ant-design/icons';
import { useState } from 'react';
export default () => {
  const data = [];
  for (let i = 0; i < 100; i++) {
    data.push({
      key: i,
      name: `Edward King ${i}`,
      age: 32,
      address: `London, Park Lane no. ${i}`,
    });
  }
  const columns = [
    {
      title: '节点名称',
      dataIndex: 'name',
    },
    {
      title: '创建人',
      dataIndex: 'address',
    },
    {
      title: '创建时间',
      dataIndex: 'address',
    },
    {
      title: '是否启用',
      dataIndex: 'address',
      render: (text, record, index) => {
        return <Switch checked={true} />;
      },
    },
    {
      title: '操作',
      // dataIndex: 'address',
      render: (text, record, index) => {
        return (
          <Space size="middle">
            <a>查看</a>
            <a>编辑</a>
            <a>新增下一节点</a>
          </Space>
        );
      },
    },
  ];
  return (
    <Page>
      <div className="headerBox">
        <Input placeholder="请输入节点名称" suffix={<SearchOutlined />} />
        <Button size="large" type="primary">
          查询
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 50 }}
        scroll={{ y: 600 }}
      />
    </Page>
  );
};
