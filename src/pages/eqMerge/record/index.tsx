// 设备管理=>设备档案
import {
  Button,
  Table,
  Space,
  Switch,
  Select,
  TablePaginationConfig,
  Input,
  message,
} from 'antd';
import { Page } from './style';
import { Link } from 'umi';
import { useState, useEffect } from 'react';
import {
  getTbEquipmentDetail,
  getTbEquipmentList,
  updateTbEquipmentDetail,
} from '@/apis/eqMerge';
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
      title: '仪表编号',
      dataIndex: 'equipmentCode',
      fixed: 'left',
    },
    {
      title: '仪表名称',
      dataIndex: 'name',
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
  const defaultSize = 10;
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState(undefined);
  const [nodeName, setNodeName] = useState(undefined);
  const [model, setModel] = useState(undefined);
  const [params, setParams] = useState({
    current: 1,
    size: defaultSize,
    total: 0,
  });
  const shiftIsEnable = async (e: boolean, record: any) => {
    const hide = message.loading(`正在${e ? '开启' : '关闭'}...`, 50);
    getTbEquipmentDetail({ id: record.id }).then((res: any) => {
      if (res?.meta?.code === 200) {
        const data = res?.data;
        updateTbEquipmentDetail({
          ...data,
          isEnable: e ? 1 : 0,
        }).then((res: any) => {
          hide();
          if (res?.meta?.code === 200) {
            message.success(`${e ? '开启' : '关闭'}成功！`);
            tbEquipmentList();
          }
        });
      }
    });
  };
  const [tableData, setTableData] = useState([]);
  const [selectNodeData, setSelectNodeData] = useState<any>({
    value: undefined,
    options: [],
  });

  const onChangeNodeInput = (e: any) => {
    const val = e?.target?.value;
    if (val) {
      setNodeName(val);
    } else {
      setNodeName(undefined);
    }
  };

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
      selectNodeData.options.push({
        label: item?.name,
        value: parseInt(item?.id || '1'),
      });
      if (item?.children && item?.children.length) {
        formatSelectOption(item?.children);
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
  }, [params.current, params.size]);

  const onClickSearch = () => {
    tbEquipmentList(true);
  };

  const paginationChange = (pagination: TablePaginationConfig) => {
    setParams({ ...params, current: pagination.current || 1 });
  };

  const tbEquipmentList = (isReset?: boolean) => {
    setLoading(true);
    getTbEquipmentList({
      current: isReset ? 1 : params.current,
      size: isReset ? defaultSize : params.size,
      name: name,
      type: selectTypeData?.value, //设备类型
      model: model, //仪表型号
      nodeName: nodeName, //节点
      isEnable: selectEnableData?.value, //是否禁用
    }).then((res) => {
      setLoading(false);
      if (res.meta.code === 200) {
        const list = res?.data?.list;
        setParams({
          current: isReset ? 1 : params.current,
          size: isReset ? defaultSize : params.size,
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
                item.manufactureDate =
                  item.manufactureDate?.split(' ')[0] || item.manufactureDate;
                item.updateDate =
                  item.updateDate?.split(' ')[0] || item.updateDate;
                item.verificationDate =
                  item.verificationDate?.split(' ')[0] || item.verificationDate;
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
          {/* <Select
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
          </Select> */}
          <Input
            style={{ width: '160px' }}
            size="large"
            placeholder="节点名称"
            allowClear
            value={nodeName}
            onChange={onChangeNodeInput}
            suffix={<SearchOutlined />}
          />
          {/* <Input
            type="text"
            size="large"
            placeholder="仪表名称"
            suffix={<SearchOutlined />}
            style={{
              width: '180px',
            }}
            onChange={onChangeNameInput}
          ></Input> */}
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
        size="large"
        pagination={{
          pageSize: params.size,
          current: params.current,
          total: params.total,
        }}
        scroll={{
          y: Math.max(window.screen.availHeight - 385 || 600),
          x: Math.max(window.screen.availWidth - 300 || 1200),
        }}
      />
    </Page>
  );
};
