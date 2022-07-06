export const lineCartDataOptions = {
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
    },
  },
  yAxis: {
    type: 'value',
    name: 'kW.h',
  },
  series: [
    {
      name: 'Highest',
      type: 'line',
      smooth: true,
      data: [10, 11, 13, 11, 12, 12, 9],
      emphasis: {
        lineStyle: {
          width: 3,
        },
      },
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
