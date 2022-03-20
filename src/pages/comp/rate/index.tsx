import { useRef, useEffect } from 'react';
import { Select, Input, Tree, Tabs, DatePicker, Button, Table } from 'antd';
import * as echarts from 'echarts';
import {
  SearchOutlined,
  CarryOutOutlined,
  FormOutlined,
} from '@ant-design/icons';
import {
  RateContainer,
  RateOptionsContainer,
  RateBodyContainer,
  RateBodyLeftContainer,
  RateBodyRightContainer,
  RateBodyRightTopContainer,
  RateBodyRightBottomContainer,
} from './style';

const { Option } = Select;
const { TabPane } = Tabs;
const { RangePicker } = DatePicker;
const { Column, ColumnGroup } = Table;
const RatePage = () => {
  return (
    <RateContainer>
      <RateOptionsContainer>
        <div className="left">
          <Select
            size="large"
            defaultValue="1AAA1"
            onChange={() => {}}
            style={{
              width: '320px',
            }}
          >
            <Option value="1AAA1">1AAA1</Option>
            <Option value="2AAA2">2AAA2</Option>
            <Option value="3AAA3">3AAA3</Option>
          </Select>
          <Select
            size="large"
            defaultValue="月"
            onChange={() => {}}
            style={{
              width: '160px',
            }}
          >
            <Option value="月">月</Option>
            <Option value="季度">季度</Option>
            <Option value="年">年</Option>
          </Select>
          <RangePicker size="large" />
        </div>
        <div className="right">
          <Button size="large" type="primary">
            导出
          </Button>
        </div>
      </RateOptionsContainer>
      <RateBodyContainer>
        <BodyLeft />
        <RateBodyRightContainer>
          <BodyRightTop />
          <BodyRightBottom />
        </RateBodyRightContainer>
      </RateBodyContainer>
    </RateContainer>
  );
};

const BodyLeft = () => {
  const chartDom1: any = useRef(null);
  const chartDom2: any = useRef(null);

  useEffect(() => {
    drawEcharts(chartDom1.current);
    drawEcharts(chartDom2.current);
  }, []);

  const drawEcharts = (dom: any) => {
    var myChart = echarts.init(dom);
    // 绘制图表
    myChart.setOption({
      tooltip: {
        trigger: 'item',
      },
      grid: {
        top: 0,
        bottom: 150,
      },
      legend: {
        bottom: 30,
        left: 'center',
        textStyle: {
          color: '#FFFFFF',
        },
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: ['45%', '60%'],
          top: -50,
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 5,
          },
          label: {
            color: '#ffffff',
          },
          data: [
            {
              value: 1048,
              name: '平',
              itemStyle: {
                color: '#3B57A2',
              },
            },
            {
              value: 735,
              name: '谷',
              itemStyle: {
                color: '#1B81FB',
              },
            },
            {
              value: 580,
              name: '尖',
              itemStyle: {
                color: '#D65050',
              },
            },
            {
              value: 484,
              name: '峰',
              itemStyle: {
                color: '#E7804A',
              },
            },
          ],
        },
      ],
    });
  };
  return (
    <RateBodyLeftContainer>
      <div className="rate-item-box">
        <h4>用电量</h4>
        <div className="rate-chart-box" ref={chartDom1}></div>
      </div>
      <div className="rate-item-box">
        <h4>用电金额</h4>
        <div className="rate-chart-box" ref={chartDom2}></div>
      </div>
    </RateBodyLeftContainer>
  );
};

const BodyRightTop = () => {
  const chartDom: any = useRef(null);

  useEffect(() => {
    drawEcharts(chartDom.current);
  }, []);

  const drawEcharts = (dom: any) => {
    var myChart = echarts.init(dom);
    // 绘制图表
    myChart.setOption({
      grid: {
        left: 50,
        right: 50,
        top: 100,
        bottom: 50,
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
        name: '月',
        axisLine: {
          lineStyle: {
            color: '#6C6E79',
          },
        },
        axisLabel: {
          color: '#FFFFFF',
        },
        nameTextStyle: {
          color: '#FFFFFF',
        },
        data: [
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
        ],
      },
      yAxis: {
        type: 'value',
        name: 'kW.h',
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
          name: '尖',
          type: 'bar',
          stack: 'total',
          barWidth: 50,
          smooth: true,
          itemStyle: {
            color: '#D65050',
          },
          data: [100, 200, 300, 500, 400, 350, 300, 100, 200, 300, 500, 400],
        },
        {
          name: '峰',
          type: 'bar',
          stack: 'total',
          smooth: true,
          lineStyle: {
            color: '#E7804A',
          },
          data: [100, 200, 300, 500, 400, 350, 300, 100, 200, 300, 500, 400],
        },
        {
          name: '谷',
          type: 'bar',
          stack: 'total',
          smooth: true,
          lineStyle: {
            color: '#1B81FB',
          },
          data: [100, 200, 300, 500, 400, 350, 300, 100, 200, 300, 500, 400],
        },
        {
          name: '平',
          type: 'bar',
          stack: 'total',
          smooth: true,
          lineStyle: {
            color: '#3B57A2',
          },
          data: [100, 200, 300, 500, 400, 350, 300, 100, 200, 300, 500, 400],
        },
      ],
    });
  };
  return <RateBodyRightTopContainer ref={chartDom}></RateBodyRightTopContainer>;
};

const BodyRightBottom = () => {
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
      title: '时间',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '尖 ',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '峰',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '谷',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '平',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '合计',
      dataIndex: 'age',
      key: 'age',
    },
  ];
  return (
    <RateBodyRightBottomContainer>
      {/* <Table size="middle" dataSource={dataSource} columns={columns} /> */}
      <Table dataSource={dataSource}>
        <Column title="时间" dataIndex="age" key="age" />
        <ColumnGroup title="尖">
          <Column title="电量" dataIndex="firstName" key="firstName" />
          <Column title="单价（元/kW.h)" dataIndex="lastName" key="lastName" />
          <Column title="金额(元)" dataIndex="lastName" key="lastName" />
        </ColumnGroup>
        <ColumnGroup title="峰">
          <Column title="电量" dataIndex="firstName" key="firstName" />
          <Column title="单价（元/kW.h)" dataIndex="lastName" key="lastName" />
          <Column title="金额(元)" dataIndex="lastName" key="lastName" />
        </ColumnGroup>
        <ColumnGroup title="谷">
          <Column title="电量" dataIndex="firstName" key="firstName" />
          <Column title="单价（元/kW.h)" dataIndex="lastName" key="lastName" />
          <Column title="金额(元)" dataIndex="lastName" key="lastName" />
        </ColumnGroup>
        <ColumnGroup title="平">
          <Column title="电量" dataIndex="firstName" key="firstName" />
          <Column title="单价（元/kW.h)" dataIndex="lastName" key="lastName" />
          <Column title="金额(元)" dataIndex="lastName" key="lastName" />
        </ColumnGroup>
        <ColumnGroup title="合计">
          <Column title="电量" dataIndex="firstName" key="firstName" />
          <Column title="电费" dataIndex="lastName" key="lastName" />
        </ColumnGroup>
      </Table>
    </RateBodyRightBottomContainer>
  );
};

export default RatePage;
