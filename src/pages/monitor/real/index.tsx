import { useRef, useEffect, useState } from 'react';
import { Select, Input, Tree, Tabs, DatePicker, Button, Table } from 'antd';
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
const { RangePicker } = DatePicker;
const RealPage = () => {
  return (
    <RealContainer>
      <RealOption />
      <RealBodyOption />
    </RealContainer>
  );
};

const RealOption = () => {
  const [tree, setTree] = useState<any>([]);
  const onSelect = (selectedKeys: React.Key[], info: any) => {
    console.log('selected', selectedKeys, info);
  };

  const getRegionTreeListRequest = () => {
    getRegionTreeList().then((res: any) => {
      console.log(res);
      if (res.meta.code === 200) {
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
      <Select size="large" defaultValue="电" onChange={() => {}}>
        <Option value="电">电</Option>
        <Option value="水">水</Option>
        <Option value="蒸汽">蒸汽</Option>
        <Option value="空气">空气</Option>
        <Option value="氮气">氮气</Option>
        <Option value="天然气">天然气</Option>
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
};

const RealBodyOption = () => {
  const chartDom: any = useRef(null);
  const dataSource = [
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

  const columns = [
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

  useEffect(() => {
    drawEcharts();
  }, []);

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
  const onChange = (key: string) => {
    console.log(key);
  };
  return (
    <RealBodyContainer>
      <div className="options-box">
        <div className="tab-box">
          <Tabs
            hideAdd
            defaultActiveKey={'0'}
            type="editable-card"
            tabPosition={'top'}
            onChange={onChange}
          >
            <TabPane tab={'实时数据'} key={'0'}></TabPane>
            <TabPane tab={'报警信息'} key={'1'}></TabPane>
            <TabPane tab={'通讯状态'} key={'2'}></TabPane>
          </Tabs>
        </div>
        <div className="search-box">
          <Select
            size="large"
            defaultValue="电流"
            onChange={() => {}}
            style={{
              width: '160px',
            }}
          >
            <Option value="电流">电流</Option>
            <Option value="电压">电压</Option>
            <Option value="功率因素">功率因素</Option>
            <Option value="有功功率">有功功率</Option>
            <Option value="频率">频率</Option>
            <Option value="有功电能">有功电能</Option>
          </Select>
          <RangePicker size="large" />
          <Button size="large" type="primary">
            查询
          </Button>
        </div>
      </div>
      <div className="echart-box" ref={chartDom}></div>
      <div className="table-box">
        <Button size="large" type="primary">
          导出
        </Button>
        <Table size="middle" dataSource={dataSource} columns={columns} />
      </div>
    </RealBodyContainer>
  );
};

export default RealPage;
