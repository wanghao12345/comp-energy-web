export const circleChart = {
  tooltip: {
    trigger: 'item',
  },
  grid: {
    top: 0,
    bottom: 100,
  },
  legend: {
    bottom: 30,
    left: 'center',
    textStyle: {
      color: '#FFFFFF',
    },
  },
  xAxis: [
    {
      type: 'category',
      data: ['1', '2', '3', '2'],
      axisTick: {
        alignWithLabel: true,
      },
      show: false, //是否显示坐标轴中的x轴
    },
  ],
  yAxis: [
    {
      type: 'value',
      show: false, // 是否显示坐标轴中的y轴
    },
  ],
  series: [
    {
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
        {
          value: 735,
          name: '平',
          itemStyle: {
            color: '#1B81FB',
          },
        },
        {
          value: 1048,
          name: '谷',
          itemStyle: {
            color: '#3B57A2',
          },
        },
      ],
    },
  ],
};

export const circleChart1 = {
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
  xAxis: [
    {
      type: 'category',
      data: ['1', '2', '3', '2'],
      axisTick: {
        alignWithLabel: true,
      },
      show: false, //是否显示坐标轴中的x轴
    },
  ],
  yAxis: [
    {
      type: 'value',
      show: false, // 是否显示坐标轴中的y轴
    },
  ],
  series: [
    {
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
        {
          value: 735,
          name: '平',
          itemStyle: {
            color: '#1B81FB',
          },
        },
        {
          value: 1048,
          name: '谷',
          itemStyle: {
            color: '#3B57A2',
          },
        },
      ],
    },
  ],
};

export const barStaticChartData = {
  grid: {
    left: 30,
    right: 40,
    top: 60,
    bottom: 30,
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    },
  },
  legend: {
    top: 30,
    textStyle: {
      color: '#FFFFFF',
    },
  },
  xAxis: {
    type: 'category',
    name: '周',
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
      smooth: true,
      barWidth: 10,
      itemStyle: {
        color: '#D65050',
      },
      data: [1],
    },
    {
      name: '峰',
      type: 'bar',
      stack: 'total',
      smooth: true,
      lineStyle: {
        color: '#E7804A',
      },
      data: [1],
    },
    {
      name: '平',
      type: 'bar',
      stack: 'total',
      smooth: true,
      lineStyle: {
        color: '#1B81FB',
      },
      data: [1],
    },
    {
      name: '谷',
      type: 'bar',
      stack: 'total',
      smooth: true,
      lineStyle: {
        color: '#3B57A2',
      },
      data: [1],
    },
  ],
};
