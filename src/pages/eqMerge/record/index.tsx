// 设备管理=>设备档案
import {
  Button,
  Table,
  Space,
  Switch,
  DatePicker,
  Select,
  Input,
  Form,
} from 'antd';
import { Page } from './style';
import { Link } from 'umi';
import { useState, useEffect } from 'react';
import { queryList } from '@/apis/eqMerge';
import { SearchOutlined } from '@ant-design/icons';
import { useImmer } from 'use-immer';
const { Option } = Select;
export default () => {
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
      dataIndex: 'model',
    },
    {
      title: '仪表名称',
      dataIndex: 'address',
    },
    {
      title: '仪表类型',
      dataIndex: 'type',
    },
    {
      title: '创建人',
      dataIndex: 'createUser',
    },
    {
      title: '创建时间',
      dataIndex: 'createDate',
    },
    {
      title: '安装时间',
      dataIndex: 'updateDate',
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
  const [params, setParams] = useState({
    current: 1,
    size: 10,
  });
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    queryList({
      ...params,
      // "current": 1,
      // "size": 10,
      // "type": 1,//设备类型
      // "name": "1",//设备名称
      // "model": "仪表型号",
      // "manufacturer": "",//生产厂家
      // "equipmentCode": 1//设备的编号
    }).then((res) => {
      if (res.meta.code === 200) {
        setTableData(res.data.list);
      }
    });
  }, [params]);
  const startSearch = (val) => {
    setParams({ ...params, ...val });
  };
  const paginationChange = ({ current, pageSize }) => {
    setParams({ ...params, current: current, size: pageSize });
  };
  return (
    <Page>
      <div className="headerBox">
        <div className="filterBox">
          <Form
            layout="inline"
            onFinish={(e) => startSearch(e)}
            initialValues={{}}
          >
            <Form.Item name="name">
              <Input
                size="large"
                placeholder="节点名称"
                suffix={<SearchOutlined />}
                style={{ width: '160px' }}
              />
            </Form.Item>
            <Form.Item name="model">
              <Select
                size="large"
                placeholder="仪表型号"
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
            </Form.Item>
            <Form.Item name="type">
              <Select
                size="large"
                placeholder="仪表类型"
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
            </Form.Item>
            <Form.Item name="status">
              <Select
                size="large"
                placeholder="状态"
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
            </Form.Item>
            <Form.Item>
              <Button size="large" type="primary" htmlType="submit">
                查询
              </Button>
            </Form.Item>
          </Form>
        </div>
        <Link to="/eqMerge/record/add">
          <Button size="large" type="primary">
            添加
          </Button>
        </Link>
      </div>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={tableData}
        onChange={paginationChange}
        pagination={{ pageSize: params.size }}
        scroll={{ y: 600 }}
      />
    </Page>
  );
};
