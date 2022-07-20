export const barChartOption1 = {
  grid: {
    left: 10,
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
  // dataZoom: [
  //   {
  //     type: 'slider',
  //     show: true,
  //     xAxisIndex: [0],
  //     left: 50,
  //     bottom: -5,
  //     start: 0,
  //     end: 80, //初始化滚动条
  //   },
  // ],
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
    name: 'KW.h',
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
};
export const barChartOption2 = {
  grid: {
    left: 10,
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
  // dataZoom: [
  //   {
  //     type: 'slider',
  //     show: true,
  //     xAxisIndex: [0],
  //     left: 50,
  //     bottom: -5,
  //     start: 0,
  //     end: 80, //初始化滚动条
  //   },
  // ],
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
    name: 'KW.h',
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
};

export const barChartOption3 = {
  grid: {
    left: 10,
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
  // dataZoom: [
  //   {
  //     type: 'slider',
  //     show: true,
  //     xAxisIndex: [0],
  //     left: 50,
  //     bottom: -5,
  //     start: 0,
  //     end: 80, //初始化滚动条
  //   },
  // ],
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
    name: 'KW.h',
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
};

export const ilineChartOption = {
  grid: {
    left: 30,
    right: 20,
    top: 50,
    bottom: 20,
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
        100, 200, 300, 500, 400, 350, 300, 100, 200, 300, 500, 400, 350, 300,
        100, 200, 300, 500, 400, 350, 300, 350, 150, 450,
      ],
    },
  ],
};
