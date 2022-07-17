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
      name: 'tt',
      type: 'bar',
      data: [10, 11, 13, 11, 12, 12, 9],
      barWidth: 35,
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
