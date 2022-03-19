import { useRef, useEffect } from 'react';
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
        <BoardBottomLeftContainer></BoardBottomLeftContainer>
        <BoardBottomRightContainer></BoardBottomRightContainer>
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

export default BoardPage;
