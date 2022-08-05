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
import { updateRegionById } from '@/apis/areaMerge';
export default () => {
  const defaultSize = 10;
  const columns: any = [
    {
      title: '节点名称',
      dataIndex: 'name',
      fixed: 'left',
      width: 200,
    },
    {
      title: '创建人',
      dataIndex: 'creatorName',
    },
    {
      title: '创建时间',
      dataIndex: 'createDate',
    },
    {
      title: '是否启用',
      dataIndex: 'isEnable',
      render: (isEnable: any, record: any) => {
        return (
          <Switch checked={isEnable} onChange={() => shiftIsEnable(record)} />
        );
      },
    },
    {
      title: '操作',
      width: 240,
      fix: 'right',
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
  const [showPagination, setShowPagination] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    size: defaultSize,
    total: 0,
  });

  const onTableChange = (pconfig: TablePaginationConfig) => {
    setPagination({
      ...pagination,
      current: pconfig.current || 1,
      size: pconfig.pageSize || defaultSize,
    });
  };

  const shiftIsEnable = async (record: any) => {
    // updateRegionById
    console.log(record);
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

  const getSearchNode = (isReset?: boolean) => {
    setLoading(true);
    getRegionList({
      current: isReset ? 1 : pagination.current,
      size: isReset ? defaultSize : pagination.size,
      name: name,
    }).then((res: any) => {
      setLoading(false);
      if (res?.meta?.code === 200) {
        const data = res?.data?.list;
        formatTreeNode(data);
        setTableData(data);
        setPagination({
          current: isReset ? 1 : pagination.current,
          size: isReset ? defaultSize : pagination.size,
          total: res?.data?.count,
        });
      }
    });
  };

  const onChangeInput = (e: any) => {
    const val = e?.target?.value;
    setName(val);
  };

  const formatTreeNode = (data: any) => {
    data.map((item: any) => {
      item.creatorName = item.creatorName || '小茗同学';
      item.createDate = item.createDate || '2022-01-01 15:22:20';
      if (item.children && item.children.length) {
        formatTreeNode(item.children);
      } else {
        delete item.children;
      }
    });
  };
  const onfinish = () => {
    if (name) {
      getSearchNode(true);
      setShowPagination(true);
    } else {
      getAreaNodes();
      setShowPagination(false);
    }
  };
  useEffect(() => {
    getAreaNodes();
  }, [history]);

  useEffect(() => {
    if (name) {
      getSearchNode();
    }
  }, [pagination.current, pagination.size]);

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
          y: Math.max(window.screen.availHeight - 375, 500),
          x: 700,
        }}
        size="large"
        onChange={onTableChange}
        loading={loading}
        pagination={
          showPagination
            ? {
                pageSize: pagination.size,
                current: pagination.current,
                total: pagination.total,
              }
            : false
        }
      />
    </Page>
  );
};
