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
  TablePaginationConfig,
  Popconfirm,
  message,
} from 'antd';
import { Page } from './style';
import { Link } from 'umi';
import { useState, useEffect } from 'react';
import { getTbEquipmentList } from '@/apis/eqMerge';
import { getRegionTreeList } from '@/apis';
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
      render: () => {
        return <Switch checked={true} />;
      },
    },
    {
      title: '操作',
      width: 200,
      render: (text: any, record: any) => {
        return (
          <Space size="middle">
            <Link to={`/eqMerge/record/add?id=${record?.id}`}>
              <Button size="large" type="primary">
                编辑
              </Button>
            </Link>
            <Popconfirm
              title="确认删除？"
              color={'#293949'}
              onConfirm={() => {}}
              onCancel={() => {
                message.info('取消删除!');
              }}
            >
              <Button size="large" type="ghost">
                删除
              </Button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];
  const [params, setParams] = useState({
    current: 1,
    size: 10,
    total: 0,
  });

  const [tableData, setTableData] = useState([]);
  const [selectNodeData, setSelectNodeData] = useState<any>({
    value: undefined,
    options: [],
  });

  const [selectModelData, setSelectModelData] = useState<any>({
    value: undefined,
    options: [
      { label: '电表', value: 1 },
      { label: '水表', value: 2 },
    ],
  });

  const [selectTypeData, setSelectTypeData] = useState<any>({
    value: undefined,
    options: [
      { label: '类型1', value: 1 },
      { label: '类型2', value: 2 },
    ],
  });

  const [selectEnableData, setSelectEnableData] = useState<any>({
    value: undefined,
    options: [
      { label: '禁用', value: 0 },
      { label: '启用', value: 1 },
    ],
  });

  const formatSelectOption = (data: []) => {
    data.map((item: any) => {
      if (item?.children && item?.children.length) {
        formatSelectOption(item?.children);
      } else {
        selectNodeData.options.push({
          label: item?.name,
          value: parseInt(item?.id || '1'),
        });
      }
    });
  };

  useEffect(() => {
    initSelectOptions();
  }, []);

  const initSelectOptions = () => {
    getRegionTreeList().then((res: any) => {
      if (res?.meta?.code === 200) {
        formatSelectOption(res?.data);
        setSelectNodeData(
          Object.assign(
            {},
            {
              value: undefined,
              options: selectNodeData.options,
            },
          ),
        );
      }
    });
  };

  useEffect(() => {
    tbEquipmentList();
  }, [params]);

  const onClickSearch = () => {
    tbEquipmentList();
  };

  const paginationChange = (pagination: TablePaginationConfig) => {
    setParams({ ...params, current: pagination.current || 1 });
  };

  const tbEquipmentList = () => {
    getTbEquipmentList({
      current: params.current,
      size: params.size,
      type: selectTypeData?.value, //设备类型
      model: selectModelData?.value, //仪表型号
    }).then((res) => {
      if (res.meta.code === 200) {
        setTableData(res.data.list);
      }
    });
  };

  const onSelectChange = (value: any, type: string) => {
    if (type === 'node') {
      setSelectNodeData({
        ...selectNodeData,
        value: value,
      });
    }
    if (type === 'model') {
      setSelectModelData({
        ...selectModelData,
        value: value,
      });
    }
    if (type === 'type') {
      setSelectTypeData({
        ...selectTypeData,
        value: value,
      });
    }
    if (type === 'enable') {
      setSelectEnableData({
        ...selectEnableData,
        value: value,
      });
    }
  };

  return (
    <Page>
      <div className="headerBox">
        <div className="filterBox">
          <Select
            size="large"
            value={selectNodeData.value}
            placeholder="站点"
            onChange={(value) => onSelectChange(value, 'node')}
            style={{
              width: '160px',
            }}
          >
            {selectNodeData.options.map((item: any, index: number) => {
              return (
                <Option value={item?.value} key={index}>
                  {item?.label}
                </Option>
              );
            })}
          </Select>

          <Select
            size="large"
            value={selectModelData.value}
            placeholder="仪表型号"
            onChange={(value) => onSelectChange(value, 'model')}
            style={{
              width: '180px',
            }}
          >
            {selectModelData.options.map((item: any, index: number) => {
              return (
                <Option value={item?.value} key={index}>
                  {item?.label}
                </Option>
              );
            })}
          </Select>

          <Select
            size="large"
            value={selectTypeData.value}
            placeholder="仪表类型"
            onChange={(value) => onSelectChange(value, 'type')}
            style={{
              width: '180px',
            }}
          >
            {selectTypeData.options.map((item: any, index: number) => {
              return (
                <Option value={item?.value} key={index}>
                  {item?.label}
                </Option>
              );
            })}
          </Select>
          <Select
            size="large"
            placeholder="状态"
            style={{
              width: '140px',
            }}
            onChange={(value) => onSelectChange(value, 'enable')}
            value={selectEnableData.value}
          >
            {selectEnableData.options.map((item: any) => (
              <Option key={item.value} value={item.value}>
                {item.label}
              </Option>
            ))}
          </Select>

          <Button size="large" type="primary" onClick={onClickSearch}>
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
        rowKey="id"
        columns={columns}
        dataSource={tableData}
        onChange={paginationChange}
        pagination={{
          pageSize: params.size,
          current: params.current,
          total: params.total,
        }}
        scroll={{ y: window.screen.availHeight - 390 }}
      />
    </Page>
  );
};
