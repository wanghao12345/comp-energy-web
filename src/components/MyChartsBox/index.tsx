import * as echarts from 'echarts';
import { memo, useEffect, FC, useRef } from 'react';
import { merge as _merge, cloneDeep as _cloneDeep } from 'lodash';
import { MyChartBoxComp } from './style';

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
const MyChartBox: FC<Iprops> = memo((props) => {
  const { id = 'chart', options } = props;
  const myEchart = useRef<any>(null);

  useEffect(() => {
    if (typeof options !== 'object') {
      return;
    }
    const dom = document.getElementById(id) as any;
    myEchart.current?.dispose();
    myEchart.current = echarts.init(dom);
    myEchart.current?.setOption(_merge(_cloneDeep(baseOptions), options));
    const reSizeFn = () => {
      myEchart.current?.resize();
    };
    window.addEventListener('resize', reSizeFn);
    return () => {
      window.removeEventListener('resize', reSizeFn);
    };
  }, [options]);
  return (
    <>
      <MyChartBoxComp {...props} id={id} />
    </>
  );
});

MyChartBox.displayName = 'MyChartBox';

export default MyChartBox;
