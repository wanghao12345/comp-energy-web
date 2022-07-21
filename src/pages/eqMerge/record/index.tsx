// 设备管理=>设备档案
import {
  Button,
  Table,
  Space,
  Switch,
  Select,
  TablePaginationConfig,
  Input,
} from 'antd';
import { Page } from './style';
import { Link } from 'umi';
import { useState, useEffect } from 'react';
import { getTbEquipmentList } from '@/apis/eqMerge';
import { getDictionarySlectOptions, getRegionTreeList } from '@/apis';
import { SearchOutlined } from '@ant-design/icons';
const { Option } = Select;
export default () => {
  const columns: any = [
    {
      title: '节点名称',
      dataIndex: 'regionName',
      fixed: 'left',
    },
    {
      title: '仪表名称',
      dataIndex: 'name',
      fixed: 'left',
    },
    {
      title: '仪表型号',
      dataIndex: 'model',
    },
    {
      title: '仪表类型',
      dataIndex: 'typeName',
    },
    {
      title: '生产厂家',
      dataIndex: 'manufacturer',
    },
    // {
    //   title: '创建者',
    //   dataIndex: 'creatorId',
    // },
    {
      title: '生产日期',
      dataIndex: 'manufactureDate',
    },
    {
      title: '检定日期',
      dataIndex: 'verificationDate',
    },
    {
      title: '检定周期',
      dataIndex: 'verificationCycle',
      width: 100,
    },
    {
      title: '更新时间',
      dataIndex: 'updateDate',
    },
    {
      title: '是否启用',
      dataIndex: 'isEnable',
      width: 100,
      render: (record: any) => {
        return <Switch checked={record ? true : false} />;
      },
    },
    {
      title: '操作',
      width: 160,
      fixed: 'right',
      render: (text: any, record: any) => {
        return (
          <Space size="middle">
            <Link
              style={{ color: 'white' }}
              to={`/eqMerge/record/detail?id=${record?.id}`}
            >
              查看
            </Link>
            <Link
              style={{ color: 'white' }}
              to={`/eqMerge/record/add?id=${record?.id}`}
            >
              编辑
            </Link>
            {/* <Popconfirm
              title="确认删除？"
              color={'#293949'}
              onConfirm={() => { }}
              onCancel={() => {
                message.info('取消删除!');
              }}
            >
              <Button size="large" type="ghost">
                删除
              </Button>
            </Popconfirm> */}
          </Space>
        );
      },
    },
  ];
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState(undefined);
  const [model, setModel] = useState(undefined);
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

  const onChangeNameInput = (e: any) => {
    const val = e?.target?.value;
    if (val) {
      setName(val);
    } else {
      setName(undefined);
    }
  };
  const onChangeModelInput = (e: any) => {
    const val = e?.target?.value;
    if (val) {
      setModel(val);
    } else {
      setModel(undefined);
    }
  };
  // const [selectModelData, setSelectModelData] = useState<any>({
  //   value: undefined,
  //   options: [],
  // });

  const [selectTypeData, setSelectTypeData] = useState<any>({
    value: undefined,
    options: [],
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
        selectNodeData.options.push({
          label: item?.name,
          value: parseInt(item?.id || '1'),
        });
      } else {
        selectNodeData.options.push({
          label: item?.name,
          value: parseInt(item?.id || '1'),
        });
      }
    });
  };

  const initSelectOptions = () => {
    //初始化站点数据
    // getRegionTreeList().then((res: any) => {
    //   if (res?.meta?.code === 200) {
    //     formatSelectOption(res?.data);
    //     setSelectNodeData(
    //       Object.assign(
    //         {},
    //         {
    //           value: undefined,
    //           options: selectNodeData.options,
    //         },
    //       ),
    //     );
    //   }
    // });
    //初始化仪表类型
    getDictionarySlectOptions({ groupCode: 'energy_type' }).then((res: any) => {
      if (res?.meta?.code === 200) {
        const data = res?.data;
        data.map((item: any) => {
          const obj = {
            label: item.key + '表',
            value: item.value,
          };
          selectTypeData.options.push(obj);
        });
        console.log(selectTypeData.options);
        setSelectTypeData({
          value: undefined,
          options: selectTypeData.options,
        });
      }
    });
  };

  useEffect(() => {
    initSelectOptions();
  }, []);

  useEffect(() => {
    tbEquipmentList();
  }, [params.current]);

  const onClickSearch = () => {
    tbEquipmentList();
  };

  const paginationChange = (pagination: TablePaginationConfig) => {
    setParams({ ...params, current: pagination.current || 1 });
  };

  const tbEquipmentList = () => {
    setLoading(true);
    getTbEquipmentList({
      current: params.current,
      size: params.size,
      name: name,
      type: selectTypeData?.value, //设备类型
      model: model, //仪表型号
      regionId: selectNodeData?.value, //节点
      isEnable: selectEnableData?.value, //是否禁用
    }).then((res) => {
      setLoading(false);
      if (res.meta.code === 200) {
        const list = res?.data?.list;
        setParams({
          ...params,
          total: res?.data?.count,
        });
        if (!list || !list.length) {
          setTableData([]);
          return;
        }
        if (!selectNodeData.options.length) {
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
              list.map((item: any, index: number) => {
                item.key = index;
                item.regionName = getRegionName(
                  parseInt(item.regionId),
                  selectNodeData.options,
                );
              });
              setTableData(list);
            }
          });
        } else {
          list.map((item: any, index: number) => {
            item.key = index;
            item.regionName = getRegionName(
              parseInt(item.regionId),
              selectNodeData.options,
            );
          });
          setTableData(list);
        }
      }
    });
  };

  const getRegionName = (id: number, regionList: []) => {
    let name = '';
    if (!regionList) {
      return '';
    }
    regionList.map((item: any) => {
      if (item.value === id) {
        name = item.label;
      }
    });
    return name;
  };

  const onSelectChange = (value: any, type: string) => {
    if (type === 'node') {
      setSelectNodeData({
        ...selectNodeData,
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
            placeholder="节点名称"
            allowClear
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
          <Input
            type="text"
            size="large"
            placeholder="仪表名称"
            suffix={<SearchOutlined />}
            style={{
              width: '180px',
            }}
            onChange={onChangeNameInput}
          ></Input>
          <Input
            type="text"
            size="large"
            placeholder="仪表型号"
            suffix={<SearchOutlined />}
            style={{
              width: '180px',
            }}
            onChange={onChangeModelInput}
          ></Input>
          {/* <Select
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
          </Select> */}

          <Select
            size="large"
            value={selectTypeData.value}
            placeholder="仪表类型"
            onChange={(value) => onSelectChange(value, 'type')}
            allowClear
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
            allowClear
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
        rowKey="key"
        key="key"
        columns={columns}
        dataSource={tableData}
        onChange={paginationChange}
        loading={loading}
        pagination={{
          pageSize: params.size,
          current: params.current,
          total: params.total,
        }}
        scroll={{
          y: window.screen.availHeight - 375,
          x: 800,
        }}
      />
    </Page>
  );
};
