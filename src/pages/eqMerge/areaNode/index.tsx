// 设备管理=>区域节点
import {
  Button,
  Table,
  Space,
  Switch,
  Input,
  Form,
  TablePaginationConfig,
} from 'antd';
import { Page } from './style';
import { SearchOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import { history, Link } from 'umi';
import { getRegionList, getRegionTreeList } from '@/apis';
export default () => {
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
      dataIndex: 'updateDate',
    },
    {
      title: '是否启用',
      dataIndex: 'isEnable',
      render: (isEnable: any) => {
        return <Switch checked={isEnable} />;
      },
    },
    {
      title: '操作',
      width: 240,
      render: (text: any, record: any, index: any) => {
        return (
          <Space size="middle">
            {/* <a style={{ color: 'white' }}>查看</a>
            <a style={{ color: 'white' }}>编辑</a> */}
            <Link to={`/eqMerge/areaNode/detail?id=${record.id}`}>
              <a style={{ color: 'white' }}>查看</a>
            </Link>
            <Link to={`/eqMerge/areaNode/edit?id=${record.id}`}>
              <a style={{ color: 'white' }}>编辑</a>
            </Link>
            <Link to={`/eqMerge/areaNode/add?parentId=${record.id}`}>
              <a style={{ color: 'white' }}>新增下一节点</a>
            </Link>
          </Space>
        );
      },
    },
  ];
  const [name, setName] = useState('');
  const [tableData, setTableData] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    current: 1,
    size: 20,
    total: 0,
  });

  const onTableChange = (pconfig: TablePaginationConfig) => {
    setPagination({
      ...pagination,
      current: pconfig.current || 1,
    });
    getSearchNode(pconfig.current);
  };

  const getAreaNodes = () => {
    setLoading(true);
    getRegionTreeList().then((res) => {
      setLoading(false);
      if (res.meta.code === 200) {
        const data = res?.data;
        formatTreeNode(data);
        setTableData(res.data);
      }
    });
  };

  const getSearchNode = (current?: number) => {
    setLoading(true);
    getRegionList({
      current: current || pagination.current,
      size: pagination.size,
      name: name,
    }).then((res: any) => {
      setLoading(false);
      if (res?.meta?.code === 200) {
        const data = res?.data?.list;
        formatTreeNode(data);
        setTableData(data);
        if (!pagination.total) {
          setPagination({
            ...pagination,
            total: res?.data?.count,
          });
        }
      }
    });
  };

  const onChangeInput = (e: any) => {
    const val = e?.target?.value;
    setName(val);
  };

  const formatTreeNode = (data: any) => {
    data.map((item: any) => {
      if (item.children && item.children.length) {
        formatTreeNode(item.children);
      } else {
        delete item.children;
      }
    });
  };
  const onfinish = () => {
    if (name) {
      getSearchNode();
    } else {
      getAreaNodes();
    }
  };
  useEffect(() => {
    getAreaNodes();
  }, [history]);

  return (
    <Page>
      <div className="headerBox">
        <Form layout="inline" onFinish={onfinish} initialValues={{}}>
          <Form.Item name="name">
            <Input
              style={{ width: '320px' }}
              size="large"
              placeholder="节点名称"
              allowClear
              onChange={onChangeInput}
              suffix={<SearchOutlined />}
            />
          </Form.Item>
          <Button size="large" type="primary" htmlType="submit">
            查询
          </Button>
        </Form>
        {/* <Link to="/eqMerge/areaNode/add">
          <Button size="large" type="primary">
            添加
          </Button>
        </Link> */}
      </div>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={tableData}
        scroll={{
          y: window.screen.availHeight - 375,
          x: 500,
        }}
        onChange={onTableChange}
        loading={loading}
        pagination={{
          pageSize: pagination.size,
          current: pagination.current,
          total: pagination.total,
        }}
      />
    </Page>
  );
};
