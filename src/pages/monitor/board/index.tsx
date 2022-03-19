import { useRef, useEffect } from 'react';
import { Button } from 'antd';
import * as echarts from 'echarts';
import {
  BoardContainer,
  BoardTopContainer,
  BoardBottomContainer,
  BoardBottomLeftContainer,
  BoardBottomRightContainer,
} from './style';
const BoardPage = () => {
  return (
    <BoardContainer>
      <BoardTop />
      <BoardBottomContainer>
        <BoardBottomLeft />
        <BoardBottomRight />
      </BoardBottomContainer>
    </BoardContainer>
  );
};

const BoardTop = () => {
  const chartDom1: any = useRef(null);
  const chartDom2: any = useRef(null);
  const chartDom3: any = useRef(null);

  useEffect(() => {
    drawEcharts(chartDom1.current);
    drawEcharts(chartDom2.current);
    drawEcharts(chartDom3.current);
  }, []);

  const drawEcharts = (dom: any) => {
    var myChart = echarts.init(dom);
    // 绘制图表
    myChart.setOption({
      grid: {
        left: 40,
        right: 50,
        top: 50,
        bottom: 30,
      },
      legend: {
        top: 0,
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
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      yAxis: {
        type: 'value',
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
          type: 'bar',
          name: '2021',
          barWidth: 20,
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(180, 180, 180, 0)',
          },
          itemStyle: {
            color: '#3DEDFF',
          },
          data: [120, 200, 150, 80, 70, 110, 130],
        },
        {
          type: 'bar',
          name: '2022',
          barWidth: 20,
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(180, 180, 180, 0)',
          },
          itemStyle: {
            color: '#68BBC4',
          },
          data: [120, 200, 150, 80, 70, 110, 130],
        },
      ],
    });
  };
  return (
    <BoardTopContainer>
      <h3>年能耗趋势图</h3>
      <div className="charts-box">
        <div className="chart-box">
          <h4>年用电趋势图</h4>
          <div className="chart-content-box" ref={chartDom1}></div>
        </div>
        <div className="chart-box">
          <h4>年用水趋势图</h4>
          <div className="chart-content-box" ref={chartDom2}></div>
        </div>
        <div className="chart-box">
          <h4>年用气趋势图</h4>
          <div className="chart-content-box" ref={chartDom3}></div>
        </div>
      </div>
    </BoardTopContainer>
  );
};

const BoardBottomLeft = () => {
  return (
    <BoardBottomLeftContainer>
      <h3>能耗数据</h3>
      <div className="data-item-box">
        <div className="title-box">用电能耗（kW.h)</div>
        <div className="item-box">
          <span>日用电量</span>
          <span>2934.58</span>
        </div>
        <div className="item-box">
          <span>月用电量</span>
          <span>566443.61</span>
        </div>
        <div className="item-box">
          <span>年用电量</span>
          <span>18373849.00</span>
        </div>
      </div>
      <div className="data-item-box">
        <div className="title-box">用水能耗（t)</div>
        <div className="item-box">
          <span>日用水量</span>
          <span>2934.58</span>
        </div>
        <div className="item-box">
          <span>月用水量</span>
          <span>566443.61</span>
        </div>
        <div className="item-box">
          <span>年用水量</span>
          <span>18373849.00</span>
        </div>
      </div>
      <div className="data-item-box">
        <div className="title-box">用天然气能耗（Nm3)</div>
        <div className="item-box">
          <span>日用气量</span>
          <span>2934.58</span>
        </div>
        <div className="item-box">
          <span>月用气量</span>
          <span>566443.61</span>
        </div>
        <div className="item-box">
          <span>年用气量</span>
          <span>18373849.00</span>
        </div>
      </div>
    </BoardBottomLeftContainer>
  );
};

const BoardBottomRight = () => {
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
        right: 20,
        top: 50,
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
        show: false,
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
          name: '蒸汽',
          type: 'line',
          smooth: true,
          lineStyle: {
            color: '#3DEDFF',
          },
          data: [
            100, 200, 300, 500, 400, 350, 300, 100, 200, 300, 500, 400, 350,
            300, 100, 200, 300, 500, 400, 350, 300, 350, 150, 450,
          ],
        },
      ],
    });
  };
  return (
    <BoardBottomRightContainer>
      <div className="option-box">
        <h3>能耗趋势</h3>
        <div className="tab-box">
          <Button type="primary">蒸汽</Button>
          <Button>氮气</Button>
          <Button>空气</Button>
        </div>
      </div>
      <div className="charts-box" ref={chartDom}></div>
    </BoardBottomRightContainer>
  );
};
export default BoardPage;
