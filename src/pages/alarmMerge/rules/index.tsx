// 报警管理=>报警规则
import {
  Button,
  Table,
  Space,
  TablePaginationConfig,
  Popconfirm,
  message,
  Switch,
} from 'antd';
import { RulesPage } from './style';
import { Link } from 'umi';
import { useEffect, useState } from 'react';
import {
  tbEarlyWarningdeleteByIds,
  tbEarlyWarningselectById,
  tbEarlyWarningSelectList,
  tbEarlyWarningupdateById,
} from '@/apis/event';
export default () => {
  const columns: any = [
    {
      title: '节点名称',
      dataIndex: 'regionName',
      width: 120,
      fixed: 'left',
    },
    {
      title: '能源类型',
      dataIndex: 'equipmentTypeName',
      width: 120,
    },
    {
      title: '仪表名称',
      dataIndex: 'name',
      width: 120,
    },
    {
      title: '事件类型',
      dataIndex: 'eventTypeName',
      width: 160,
    },
    {
      title: '参数',
      dataIndex: 'energyParameterName',
    },
    {
      title: '阀值',
      dataIndex: 'threshold1',
    },
    {
      title: '条件',
      dataIndex: 'condition1Name',
    },
    {
      title: '阀值',
      dataIndex: 'threshold1',
    },
    {
      title: '条件2',
      dataIndex: 'condition2Name',
    },
    {
      title: '阀值2',
      dataIndex: 'threshold2',
    },
    // {
    //   title: '报警优先',
    //   dataIndex: 'address',
    //   width: 100,
    // },
    {
      title: '是否启用',
      dataIndex: 'isEnable',
      width: 100,
      render: (isEnable: any, record: any) => {
        return (
          <Switch
            checked={isEnable}
            onChange={(e) => shiftIsEnable(e, record)}
          />
        );
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createDate',
      width: 180,
    },
    // {
    //   title: '是否启用',
    //   dataIndex: 'isEnable',
    //   render: (record: any) => {
    //     return <Switch checked={record ? true : false} />;
    //   },
    // },
    {
      title: '操作',
      width: 160,
      fixed: 'right',
      render: (text: any, record: any) => {
        return (
          <Space size="middle">
            <Link
              style={{ color: 'white' }}
              to={`/alarm/rules/detail?id=${record?.id}`}
            >
              详情
              {/* <Button size="large" type="primary">
                编辑
              </Button> */}
            </Link>
            <Link
              style={{ color: 'white' }}
              to={`/alarm/rules/add?id=${record?.id}`}
            >
              编辑
              {/* <Button size="large" type="primary">
                编辑
              </Button> */}
            </Link>
            <Popconfirm
              title="确认删除？"
              color={'#293949'}
              onConfirm={() => {
                onConfirm(record);
              }}
              onCancel={() => {
                message.info('取消删除!');
              }}
            >
              <span style={{ color: 'white', cursor: 'pointer' }}>删除</span>
              {/* <Button size="large" type="ghost">
                删除
              </Button> */}
            </Popconfirm>
          </Space>
        );
      },
    },
  ];
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    current: 1,
    size: 20,
    total: 0,
  });
  const onConfirm = (record: any) => {
    const hide = message.loading('正在删除...', 50);
    tbEarlyWarningdeleteByIds({ ids: [parseInt(record?.id || '1')] }).then(
      (res: any) => {
        hide();
        if (res?.meta?.code === 200) {
          message.success('正在刷新数据!');
          getTableSource();
        }
      },
    );
  };
  const [dataSource, setDataSource] = useState([]);
  const onTableChange = (pconfig: TablePaginationConfig) => {
    setPagination({
      ...pagination,
      current: pconfig.current || 1,
    });
  };
  const getTableSource = () => {
    setLoading(true);
    tbEarlyWarningSelectList({
      current: pagination.current,
      size: pagination.size,
    }).then((res: any) => {
      setLoading(false);
      if (res?.meta?.code === 200) {
        setDataSource(res?.data?.list);
        if (!pagination.total) {
          setPagination({
            ...pagination,
            total: res?.data?.count,
          });
        }
      }
    });
  };
  useEffect(() => {
    getTableSource();
  }, [pagination.current, pagination.size]);
  const shiftIsEnable = async (e: boolean, record: any) => {
    const hide = message.loading(`正在${e ? '开启' : '关闭'}...`, 50);
    tbEarlyWarningselectById({ id: record.id }).then((res: any) => {
      if (res?.meta?.code === 200) {
        const data = res?.data;
        tbEarlyWarningupdateById({
          ...data,
          isEnable: e ? 1 : 0,
        }).then((res: any) => {
          hide();
          if (res?.meta?.code === 200) {
            message.success(`${e ? '开启' : '关闭'}成功！`);
            getTableSource();
          }
        });
      }
    });
  };
  return (
    <RulesPage>
      <div className="headerBox">
        <Link to="/alarm/rules/add">
          <Button size="large" type="primary">
            添加
          </Button>
        </Link>
      </div>
      <Table
        rowKey="createDate"
        key="createDate"
        columns={columns}
        dataSource={dataSource}
        pagination={{
          pageSize: pagination.size,
          total: pagination.total,
          current: pagination.current,
        }}
        size="large"
        loading={loading}
        scroll={{
          y: Math.max(window.screen.availHeight - 385 || 600),
          x: Math.max(window.screen.availWidth - 300 || 1000),
        }}
        onChange={onTableChange}
      />
    </RulesPage>
  );
};
