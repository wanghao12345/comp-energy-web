import * as echarts from 'echarts';
import styled from 'styled-components';
import { useEffect } from 'react';
import { merge as _merge, cloneDeep as _cloneDeep } from 'lodash';
const MyChartBox = styled.div`
  width: 100%;
  height: 100%;
`;
interface Iprops {
  id: string;
  options: any;
}
const baseOptions = {
  grid: {
    containLabel: true,
    left: 0,
    right: 0,
    bottom: 0,
  },
  tooltip: {},
  xAxis: {
    axisLabel: {
      color: '#fff',
    },
    axisTick: {
      lineStyle: {
        color: '#616675',
      },
    },
  },
  yAxis: {
    nameTextStyle: {
      color: '#fff',
      fontSize: 14,
    },
    splitLine: {
      lineStyle: {
        type: 'dashed',
        color: '#354873',
      },
    },
    axisLabel: {
      color: '#fff',
    },
  },
};
export default (props: Iprops) => {
  const { id = 'chart', options } = props;
  if (typeof options !== 'object')
    return new Error('options type mismatch, need an object');
  useEffect(() => {
    const myChart = echarts.init(document.getElementById(id));
    myChart.setOption(_merge(_cloneDeep(baseOptions), options));
    const reSizeFn = () => {
      myChart.resize();
    };
    window.addEventListener('resize', reSizeFn);
    return () => {
      window.removeEventListener('resize', reSizeFn);
    };
  }, [options]);
  return (
    <>
      <MyChartBox {...props} id={id} />
    </>
  );
};
