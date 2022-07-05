export const typeList = [
  { name: '电', value: 1, unit: 'kw.h' },
  { name: '水', value: 2, unit: 't' },
  { name: '蒸汽', value: 3, unit: 't' },
  { name: '天然气', value: 4, unit: 'Nm3' },
  { name: '氮气', value: 5, unit: 'Nm3' },
  { name: '空气', value: 6, unit: 'Nm3' },
];
export const dayTypeList = [
  { name: '今日', value: 1 },
  { name: '本月', value: 3 },
  { name: '本年', value: 6 },
];
export const lineCartDataOptions = {
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  },
  yAxis: {
    type: 'value',
    name: 'kW.h',
  },
  series: [
    {
      name: 'Highest',
      type: 'line',
      data: [10, 11, 13, 11, 12, 12, 9],
      markPoint: {
        // label: {
        //   color: '#fff'
        // },
        itemStyle: {
          color: '#ffef6c',
        },
        data: [
          {
            type: 'max',
            name: 'Max',
          },
          {
            type: 'min',
            name: 'Min',
          },
        ],
      },
      lineStyle: {
        color: '#ede06b',
      },
      itemStyle: {
        color: '#fff6b8',
      },
    },
  ],
};
export const barCartDataOptions = {
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  },
  yAxis: {
    type: 'value',
    name: 'kW.h',
  },
  series: [
    {
      name: 'Highest',
      type: 'bar',
      data: [10, 11, 13, 11, 12, 12, 9],
      markPoint: {
        label: {
          color: '#fff',
        },
        itemStyle: {
          color: '#72d5df',
        },
        data: [
          {
            type: 'max',
            name: 'Max',
          },
          {
            type: 'min',
            name: 'Min',
          },
        ],
      },
      itemStyle: {
        color: '#72d5df',
      },
    },
  ],
};
