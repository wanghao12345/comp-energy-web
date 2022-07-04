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
import {
  SearchOutlined,
  CarryOutOutlined,
  FormOutlined,
} from '@ant-design/icons';
import { RealContainer, RealOptionContainer, RealBodyContainer } from './style';
import { getRegionTreeList } from '@/apis';

const { Option } = Select;
const { TabPane } = Tabs;
const RealPage = () => {
  const optionsData: any = {
    power: ['电流', '电压', '功率因数', '有功功率', '频率', '有功电能'],
    water: ['水'],
    steam: ['蒸汽'],
    air: ['空气'],
    nitrogen: ['氮气'],
    gas: ['天然气'],
  };
  const [options, setOptions] = useState(optionsData.power);
  const onChange = (key: string) => {
    for (let k in optionsData) {
      if (k === key) {
        setOptions([...optionsData[key]]);
      }
    }
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
  const onSelect = (selectedKeys: React.Key[], info: any) => {
    console.log('selected', selectedKeys, info);
  };

  const getRegionTreeListRequest = () => {
    getRegionTreeList().then((res: any) => {
      console.log(res);
      if (res?.meta?.code === 200) {
        let data = res.data;
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

  useEffect(() => {
    getRegionTreeListRequest();
  }, []);

  return (
    <RealOptionContainer>
      <Select size="large" defaultValue="电" onChange={onChange}>
        <Option value="power">电</Option>
        <Option value="water">水</Option>
        <Option value="steam">蒸汽</Option>
        <Option value="air">空气</Option>
        <Option value="nitrogen">氮气</Option>
        <Option value="gas">天然气</Option>
      </Select>
      <Input size="large" suffix={<SearchOutlined />} placeholder="节点名称" />
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

enum tabStatus {
  RealTime = 'RealTime',
  Warnning = 'Warnning',
  Contact = 'Contact',
}

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
        form.setFieldsValue({ option: options[0] });
      }
    }

    if (tab === tabStatus.RealTime) {
      drawEcharts();
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
  const dataSource1 = [
    {
      key: '1',
      name: '胡彦斌',
      age: 32,
      address: '西湖区湖底公园1号',
    },
    {
      key: '2',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号',
    },
  ];

  const Realtimecolumns = [
    {
      title: '采集时间',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Ia（A） ',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Ib（A）',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Ic（A）',
      dataIndex: 'age',
      key: 'age',
    },
  ];
  const WarnColumns = [
    {
      title: '仪表名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '报警时间',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '报警类型',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '描述',
      dataIndex: 'name',
      key: 'name',
    },
  ];
  const ContactColumns = [
    {
      title: '节点名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '仪表地址',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '仪表型号',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '仪表名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '仪表类型',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '状态',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '备注',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '最后一次通讯时间',
      dataIndex: 'name',
      key: 'name',
    },
  ];

  const drawEcharts = () => {
    var myChart = echarts.init(chartDom.current);
    // 绘制图表
    myChart.setOption({
      grid: {
        left: 40,
        right: 20,
        top: 80,
      },
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        top: 30,
        textStyle: {
          color: '#FFFFFF',
        },
      },
      xAxis: {
        type: 'category',
        axisLine: {
          lineStyle: {
            color: '#6C6E79',
          },
        },
        axisLabel: {
          color: '#FFFFFF',
        },
        data: [
          '00',
          '01',
          '02',
          '03',
          '04',
          '05',
          '06',
          '07',
          '08',
          '09',
          '10',
          '11',
          '12',
          '13',
          '14',
          '15',
          '16',
          '17',
          '18',
          '19',
          '20',
          '21',
          '22',
          '23',
        ],
      },
      yAxis: {
        type: 'value',
        name: 'A',
        splitLine: {
          lineStyle: {
            color: ['#6C6E79'],
            type: 'dashed',
          },
        },
        axisLabel: {
          formatter: '{value}',
          color: '#FFFFFF',
        },
        nameTextStyle: {
          color: '#FFFFFF',
        },
      },
      series: [
        {
          name: 'la',
          type: 'line',
          smooth: true,
          markPoint: {
            data: [
              { type: 'max', name: 'Max' },
              { type: 'min', name: 'Min' },
            ],
            label: {
              color: '#FFFFFF',
            },
          },
          lineStyle: {
            color: '#FFEF6C',
          },
          data: [
            100, 200, 300, 500, 400, 350, 300, 100, 200, 300, 500, 400, 350,
            300, 100, 200, 300, 500, 400, 350, 300, 350, 150, 450,
          ],
        },
        {
          name: 'lb',
          type: 'line',
          smooth: true,
          markPoint: {
            data: [
              { type: 'max', name: 'Max' },
              { type: 'min', name: 'Min' },
            ],
            label: {
              color: '#FFFFFF',
            },
          },
          lineStyle: {
            color: '#FD264E',
          },
          data: [
            200, 300, 500, 400, 350, 300, 100, 200, 300, 500, 400, 350, 300,
            100, 200, 300, 500, 400, 350, 300, 350, 150, 450, 200,
          ],
        },
        {
          name: 'lc',
          type: 'line',
          smooth: true,
          markPoint: {
            data: [
              { type: 'max', name: 'Max' },
              { type: 'min', name: 'Min' },
            ],
            label: {
              color: '#FFFFFF',
            },
          },
          lineStyle: {
            color: '#2DFCC0',
          },
          data: [
            300, 500, 400, 350, 300, 100, 200, 300, 500, 400, 350, 300, 100,
            200, 300, 500, 400, 350, 300, 350, 150, 450, 200, 100,
          ],
        },
      ],
    });
  };
  const onTabChange = (key: string) => {
    const tab = key as tabStatus;
    setTab(tab);
  };
  const onFinish = (values: any) => {
    console.log(values);
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
          <div className="echart-box" ref={chartDom} />
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
