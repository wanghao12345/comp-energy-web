import { Button, Table, Space } from 'antd';
import { RulesPage } from './style';
import { Link } from 'umi';
export default () => {
  const columns = [
    {
      title: '节点名称',
      dataIndex: 'name',
    },
    {
      title: '能源类型',
      dataIndex: 'age',
    },
    {
      title: '仪表名称',
      dataIndex: 'address',
    },
    {
      title: '事件类型',
      dataIndex: 'address',
    },
    {
      title: '参数',
      dataIndex: 'address',
    },
    {
      title: '网格',
      dataIndex: 'address',
    },
    {
      title: '条件',
      dataIndex: 'address',
    },
    {
      title: '阀值',
      dataIndex: 'address',
    },
    {
      title: '条件2',
      dataIndex: 'address',
    },
    {
      title: '网格2',
      dataIndex: 'address',
    },
    {
      title: '告警优先',
      dataIndex: 'address',
    },
    {
      title: '是否启用',
      dataIndex: 'address',
    },
    {
      title: '创建时间',
      dataIndex: 'address',
    },
    {
      title: 'address',
      // dataIndex: 'address',
      render: (text, record) => {
        return (
          <Space size="middle">
            <a>编辑</a>
            <a>删除</a>
          </Space>
        );
      },
    },
  ];

  const data = [];
  for (let i = 0; i < 100; i++) {
    data.push({
      key: i,
      name: `Edward King ${i}`,
      age: 32,
      address: `London, Park Lane no. ${i}`,
    });
  }
  return (
    <RulesPage>
      <div className="headerBox">
        <Link to="">
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
      ,
    </RulesPage>
  );
};
