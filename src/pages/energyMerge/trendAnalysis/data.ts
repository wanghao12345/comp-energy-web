export const dataSource = [
  {
    key: '1',
    time: '00:00',
    nodeName: '1AAA1',
    type: '电',
    energy: '190.00',
  },
  {
    key: '2',
    time: '00:00',
    nodeName: '1AAA1',
    type: '电',
    energy: '190.00',
  },
  {
    key: '3',
    time: '00:00',
    nodeName: '1AAA1',
    type: '电',
    energy: '190.00',
  },
  {
    key: '4',
    time: '00:00',
    nodeName: '1AAA1',
    type: '电',
    energy: '190.00',
  },
  {
    key: '5',
    time: '00:00',
    nodeName: '1AAA1',
    type: '电',
    energy: '190.00',
  },
  {
    key: '6',
    time: '00:00',
    nodeName: '1AAA1',
    type: '电',
    energy: '190.00',
  },
  {
    key: '7',
    time: '00:00',
    nodeName: '1AAA1',
    type: '电',
    energy: '190.00',
  },
];

export const columns = [
  {
    title: '采集时间',
    dataIndex: 'time',
    key: 'time',
  },
  {
    title: '节点名称',
    dataIndex: 'nodeName',
    key: 'nodeName',
  },
  {
    title: '能源类型',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: '能耗(kW.h)',
    dataIndex: 'energy',
    key: 'energy',
  },
];
export const barCartDataOptions = {
  legend: {
    textStyle: {
      color: '#fff',
    },
  },
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
      name: '能耗',
      type: 'bar',
      data: [10, 11, 13, 11, 12, 12, 9],
      itemStyle: {
        color: '#72d5df',
      },
      barWidth: '20%',
    },
    {
      name: '昨日能耗',
      type: 'bar',
      data: [13, 14, 16, 13, 8, 9, 26],
      itemStyle: {
        color: '#315679',
      },
      barWidth: '20%',
    },
  ],
};
