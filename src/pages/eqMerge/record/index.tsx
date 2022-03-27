// 设备管理=>设备档案
import { Button, Table, Space, Switch, DatePicker, Select, Input } from 'antd';
import { Page } from './style';
import { Link } from 'umi';
import { useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
const { Option } = Select;
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
      title: '仪表地址',
      dataIndex: 'age',
    },
    {
      title: '仪表型号',
      dataIndex: 'address',
    },
    {
      title: '仪表名称',
      dataIndex: 'address',
    },
    {
      title: '仪表类型',
      dataIndex: 'address',
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
      title: '安装时间',
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
            <a>编辑</a>
            <a>删除</a>
          </Space>
        );
      },
    },
  ];
  return (
    <Page>
      <div className="headerBox">
        <div className="filterBox">
          <Input
            placeholder="节点名称"
            suffix={<SearchOutlined />}
            style={{ width: '160px' }}
          />
          <Select
            size="large"
            placeholder="仪表型号"
            onChange={() => {}}
            style={{
              width: '160px',
            }}
          >
            {[
              { name: '今日', value: '1' },
              { name: '本月', value: '2' },
              { name: '本年', value: '3' },
            ].map((item) => (
              <Option key={item.value} value={item.value}>
                {item.name}
              </Option>
            ))}
          </Select>
          <Select
            size="large"
            placeholder="仪表类型"
            onChange={() => {}}
            style={{
              width: '160px',
            }}
          >
            {[
              { name: '今日', value: '1' },
              { name: '本月', value: '2' },
              { name: '本年', value: '3' },
            ].map((item) => (
              <Option key={item.value} value={item.value}>
                {item.name}
              </Option>
            ))}
          </Select>
          <Select
            size="large"
            placeholder="状态"
            onChange={() => {}}
            style={{
              width: '160px',
            }}
          >
            {[
              { name: '今日', value: '1' },
              { name: '本月', value: '2' },
              { name: '本年', value: '3' },
            ].map((item) => (
              <Option key={item.value} value={item.value}>
                {item.name}
              </Option>
            ))}
          </Select>
          <Button size="large" type="primary">
            查询
          </Button>
        </div>
        <Link to="/eqMerge/record/add">
          <Button size="large" type="primary">
            添加
          </Button>
        </Link>
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
