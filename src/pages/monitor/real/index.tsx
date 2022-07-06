import { useRef, useEffect, useState, FC, memo } from 'react';
import {
  Select,
  Input,
  Tree,
  Tabs,
  DatePicker,
  Button,
  Table,
  Form,
} from 'antd';
import * as echarts from 'echarts';
import { SearchOutlined, CarryOutOutlined } from '@ant-design/icons';
import { RealContainer, RealOptionContainer, RealBodyContainer } from './style';
import { getRegionList, getRegionTreeList } from '@/apis';
import { typeList } from '@/commonInterface';
import {
  chartOption,
  ContactColumns,
  dataSource1,
  Realtimecolumns,
  tabStatus,
  WarnColumns,
} from './data';
import MyChartBox from '@/components/MyChartsBox';

const { Option } = Select;
const { TabPane } = Tabs;
const RealPage = () => {
  const optionsData = [
    ['电流', '电压', '功率因数', '有功功率', '频率', '有功电能'],
    ['水'],
    ['蒸汽'],
    ['空气'],
    ['氮气'],
    ['天然气'],
  ];
  const [options, setOptions] = useState(optionsData[0]);
  const onChange = (key: string) => {
    const ck = parseInt(key);
    setOptions(optionsData[ck - 1]);
  };
  return (
    <RealContainer>
      <RealOption onChange={onChange} />
      <RealBodyOption options={options} />
    </RealContainer>
  );
};

type RealOptionProps = {
  onChange: (e: string) => void;
};

const RealOption: FC<RealOptionProps> = memo(({ onChange }) => {
  const [tree, setTree] = useState<any>([]);
  const [searchName, setSearchName] = useState('');
  const onSelect = (selectedKeys: React.Key[], info: any) => {
    console.log('selected', selectedKeys, info);
  };

  const getRegionTreeListRequest = () => {
    getRegionTreeList().then((res: any) => {
      if (res?.meta?.code === 200) {
        const data = res.data;
        formatTreeData(data);
        setTree([...data]);
      }
    });
  };

  const formatTreeData = (data: any) => {
    data.map((item: any) => {
      item.title = item.name;
      item.key = item.id;
      item.icon = item.children ? <CarryOutOutlined /> : <CarryOutOutlined />;
      if (item.children && item.children.length) {
        formatTreeData(item.children);
      }
    });
  };

  const onChangeName = (e: any) => {
    const value = e?.target?.value;
    setSearchName(value);
    getSearchResult(value);
  };

  const onKeyDownName = (e: any) => {
    if (e.keyCode === 13) {
      if (searchName) {
        getSearchResult(searchName);
      }
    }
  };

  const getSearchResult = (name: string) => {
    if (!name) {
      getRegionTreeListRequest();
    } else {
      getRegionList({ name, current: 1, size: 10 }).then((res: any) => {
        if (res?.meta?.code === 200) {
          const data = res.data?.list;
          formatTreeData(data);
          setTree([...data]);
        }
      });
    }
  };

  useEffect(() => {
    getRegionTreeListRequest();
  }, []);

  return (
    <RealOptionContainer>
      <Select size="large" defaultValue={1 as any} onChange={onChange}>
        {typeList.map((item) => (
          <Option key={item.value} value={item.value}>
            {item.name}
          </Option>
        ))}
      </Select>
      <Input
        size="large"
        suffix={<SearchOutlined />}
        placeholder="节点名称"
        value={searchName}
        onChange={onChangeName}
        onKeyDown={onKeyDownName}
      />
      <Tree
        showLine={true}
        showIcon={false}
        onSelect={onSelect}
        treeData={tree}
      />
    </RealOptionContainer>
  );
});

type RealBodyOptionProps = {
  options: any[];
};

const RealBodyOption: FC<RealBodyOptionProps> = memo(({ options }) => {
  const chartDom: any = useRef(null);
  const [tab, setTab] = useState(tabStatus.RealTime);
  const [form] = Form.useForm();
  const { RangePicker } = DatePicker;
  const [dataSource, setDataSource] = useState<any>([]);
  const [columns, setColumns] = useState<any>([]);

  useEffect(() => {
    if (form) {
      if (options.length === 1) {
        form.setFieldsValue({ option: '限时流量' });
      } else {
        form.setFieldsValue({ option: options });
      }
    }

    if (tab === tabStatus.RealTime) {
      const data: any = [];
      drawEcharts(options[0], data);
      //获取请求数据
      setDataSource(dataSource1);
      setColumns(Realtimecolumns);
    }
    if (tab === tabStatus.Warnning) {
      setDataSource(dataSource1);
      setColumns(WarnColumns);
    }
    if (tab === tabStatus.Contact) {
      setDataSource(dataSource1);
      setColumns(ContactColumns);
    }
  }, [options, tab]);

  const drawEcharts = (type: string, data: any) => {
    switch (type) {
      case '电流':
        console.log('电流');
        break;
      case '功率因素':
        console.log('功率因素');
        break;
      case '有用功率':
        console.log('有用功率');
        break;
      case '频率':
        console.log('频率');
        break;
      case '有功电能':
        console.log('有功电能');
        break;
      case '水':
        console.log('水');
        break;
      case '蒸汽':
        console.log('蒸汽');
        break;
      case '空气':
        console.log('空气');
        break;
      case '氮气':
        console.log('氮气');
        break;
      case '天然气':
        console.log('天然气');
        break;
      default:
        console.log('电流');
        break;
    }
    // 更新数据
  };
  const onTabChange = (key: string) => {
    const tab = key as tabStatus;
    setTab(tab);
  };
  const onFinish = (values: any) => {
    const { option, date, name, xinghao, type, status } = values;
    let res: any;
    if (tab === tabStatus.RealTime) {
      //option date发送请求
    }
    if (tab === tabStatus.Warnning) {
      //date发送请求
    }
    if (tab === tabStatus.Contact) {
      //name xinghao type status发送请求
    }
    //统一处理返回数据
    handleResponse(res, option);
  };

  const handleResponse = (res: any, option?: string) => {
    if (option) {
    }
  };

  return (
    <RealBodyContainer>
      <div className="options-box">
        <div className="tab-box">
          <Tabs
            hideAdd
            defaultActiveKey={tab}
            type="editable-card"
            tabPosition={'top'}
            onChange={onTabChange}
          >
            <TabPane tab={'实时数据'} key={tabStatus.RealTime}></TabPane>
            <TabPane tab={'报警信息'} key={tabStatus.Warnning}></TabPane>
            <TabPane tab={'通讯状态'} key={tabStatus.Contact}></TabPane>
          </Tabs>
        </div>
        <div className="search-box">
          <Form
            form={form}
            name="dynamic_form_nest_item"
            onFinish={onFinish}
            autoComplete="off"
          >
            {tab === tabStatus.RealTime ? (
              <>
                <Form.Item name="option">
                  <Select
                    size="large"
                    style={{
                      width: '160px',
                    }}
                  >
                    {options.length > 1
                      ? options.map((item, index) => {
                          return (
                            <Option value={item} key={index}>
                              {item}
                            </Option>
                          );
                        })
                      : null}
                  </Select>
                </Form.Item>
                <Form.Item name="date">
                  <RangePicker size="large" name="date" />
                </Form.Item>
              </>
            ) : tab === tabStatus.Warnning ? (
              <>
                <Form.Item name="date">
                  <RangePicker size="large" name="date" />
                </Form.Item>
              </>
            ) : (
              <>
                <Form.Item name="name">
                  <Input
                    size="large"
                    style={{ width: '130px', marginRight: '16px' }}
                    suffix={<SearchOutlined />}
                    placeholder="节点名称"
                  />
                </Form.Item>
                <Form.Item name="xinghao">
                  <Select
                    size="large"
                    style={{
                      width: '130px',
                    }}
                    placeholder="仪表型号"
                  >
                    <Option value="DTSF1352">DTSF1352/C</Option>
                    <Option value="DTSD1300">DTSD1300</Option>
                    <Option value="ADCE1542">ADCE1542</Option>
                  </Select>
                </Form.Item>
                <Form.Item name="type">
                  <Select
                    size="large"
                    style={{
                      width: '130px',
                    }}
                    placeholder="仪表类型"
                  >
                    <Option value="电表">电表</Option>
                    <Option value="水表">水表</Option>
                    <Option value="气表">气表</Option>
                  </Select>
                </Form.Item>
                <Form.Item name="status">
                  <Select
                    size="large"
                    style={{
                      width: '80px',
                    }}
                    placeholder="状态"
                  >
                    <Option value="在线">在线</Option>
                    <Option value="离线">离线</Option>
                    <Option value="异常">异常</Option>
                  </Select>
                </Form.Item>
              </>
            )}
            <Form.Item>
              <Button size="large" type="primary" htmlType="submit">
                查询
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
      {tab === tabStatus.RealTime ? (
        <>
          <div className="echart-box">
            <MyChartBox id="realTime" options={chartOption} />
          </div>
          <Button size="large" type="primary">
            导出
          </Button>
        </>
      ) : null}
      <div className="table-box">
        <Table size="middle" dataSource={dataSource} columns={columns} />
      </div>
    </RealBodyContainer>
  );
});

export default RealPage;
