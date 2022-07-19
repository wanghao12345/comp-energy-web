// 设备管理=>区域节点
import { Button, Table, Space, Switch, Input, Form } from 'antd';
import { Page } from './style';
import { SearchOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import { queryTree } from '@/apis/areaMerge';
import { history, Link } from 'umi';
export default () => {
  const [params, setParams] = useState({});
  const [tableData, setTableData] = useState<any>([]);
  useEffect(() => {
    queryTree({
      ...params,
    }).then((res) => {
      if (res.meta.code === 200) {
        setTableData(res.data);
      }
    });
  }, [params, history]);
  const startSearch = (val) => {
    setParams({ ...params, ...val });
  };
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
      dataIndex: 'isEnable',
      render: (isEnable: any) => {
        return <Switch checked={isEnable === 1} />;
      },
    },
    {
      title: '操作',
      // dataIndex: 'address',
      render: (text: any, record: any, index: any) => {
        return (
          <Space size="middle">
            {/* <a style={{ color: 'white' }}>查看</a>
            <a style={{ color: 'white' }}>编辑</a> */}
            <Link to={`/eqMerge/areaNode/add?parentId=${record.id}`}>
              <a style={{ color: 'white' }}>新增下一节点</a>
            </Link>
          </Space>
        );
      },
    },
  ];
  return (
    <Page>
      <div className="headerBox">
        <Form
          layout="inline"
          onFinish={(e) => startSearch(e)}
          initialValues={{}}
        >
          <Form.Item name="name">
            <Input
              style={{ width: '320px' }}
              size="large"
              placeholder="节点名称"
              suffix={<SearchOutlined />}
            />
          </Form.Item>
          <Button size="large" type="primary" htmlType="submit">
            查询
          </Button>
        </Form>
        <Link to="/eqMerge/areaNode/add">
          <Button size="large" type="primary">
            添加
          </Button>
        </Link>
      </div>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={tableData}
        scroll={{ y: window.screen.height - 450 }}
        pagination={false}
      />
    </Page>
  );
};
