import * as echarts from 'echarts';
import { memo, useEffect, FC, useRef } from 'react';
import { merge as _merge, cloneDeep as _cloneDeep } from 'lodash';
import { MyChartBoxComp } from './style';

interface Iprops {
  id: string;
  options: any;
  loading?: number;
}
const baseOptions = {
  grid: {
    containLabel: true,
    left: 0,
    right: 0,
    bottom: 0,
  },
  tooltip: {
    transitionDuration: 0, //加上这个可以防止抖动
  },
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

const loadingOption = {
  graphic: {
    elements: [
      {
        type: 'group',
        left: 'center',
        top: 'center',
        children: new Array(7).fill(0).map((val, i) => ({
          type: 'rect',
          x: i * 20,
          shape: {
            x: 0,
            y: -40,
            width: 10,
            height: 80,
          },
          style: {
            fill: '#5470c6',
          },
          keyframeAnimation: {
            duration: 1000,
            delay: i * 200,
            loop: true,
            keyframes: [
              {
                percent: 0.5,
                scaleY: 0.3,
                easing: 'cubicIn',
              },
              {
                percent: 1,
                scaleY: 1,
                easing: 'cubicOut',
              },
            ],
          },
        })),
      },
    ],
  },
};

const noDate = {
  graphic: {
    elements: [
      {
        type: 'text',
        left: 'center',
        top: 'center',
        style: {
          text: '无数据',
          fontSize: 40,
          fontWeight: 'bold',
          lineDash: [0, 200],
          lineDashOffset: 0,
          fill: 'transparent',
          stroke: '#f3efef',
          lineWidth: 1,
        },
        keyframeAnimation: {
          duration: 1000,
          loop: false,
          keyframes: [
            {
              percent: 0.7,
              style: {
                fill: 'transparent',
                lineDashOffset: 200,
                lineDash: [200, 0],
              },
            },
            {
              // Stop for a while.
              percent: 0.8,
              style: {
                fill: 'transparent',
              },
            },
            {
              percent: 1,
              style: {
                fill: 'transparent',
              },
            },
          ],
        },
      },
    ],
  },
};

const MyChartBox: FC<Iprops> = memo((props) => {
  const { id = 'chart', options, loading } = props;
  const myEchart = useRef<any>(null);
  const isLoaded = useRef<any>(null);
  const initializeAndMonitor = () => {
    const dom = document.getElementById(id) as any;
    myEchart.current?.dispose();
    myEchart.current = echarts.init(dom);
    if (loading) {
      myEchart.current?.setOption(loadingOption);
    } else {
      if (typeof options !== 'object' || !options) {
        myEchart.current?.setOption(noDate);
      } else {
        myEchart.current?.setOption(_merge(_cloneDeep(baseOptions), options));
      }
    }
    if (!isLoaded.current) {
      isLoaded.current = true;
      const reSizeFn = () => {
        myEchart.current?.resize();
      };
      window.addEventListener('resize', reSizeFn);
      return () => {
        window.removeEventListener('resize', reSizeFn);
      };
    }
  };

  useEffect(() => {
    initializeAndMonitor();
  }, [options, loading]);

  return (
    <>
      <MyChartBoxComp {...props} id={id} />
    </>
  );
});

MyChartBox.displayName = 'MyChartBox';

export default MyChartBox;
