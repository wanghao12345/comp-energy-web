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

export const getColumns = (type: string, unit: string) => {
  let column = [
    {
      title: '本期时间',
      dataIndex: 'A',
      key: 'A',
    },
    {
      title: '节点名称',
      dataIndex: 'B',
      key: 'B',
    },
    {
      title: `本期能耗（${unit}）`,
      dataIndex: 'C',
      key: 'C',
    },
    {
      title: type === 'yearOnyear' ? '同比时间' : '环比时间',
      dataIndex: 'D',
      key: 'D',
    },
    {
      title:
        type === 'yearOnyear' ? `同比能耗（${unit}）` : `环比能耗（${unit}）`,
      dataIndex: 'E',
      key: 'E',
    },
    {
      title: '增减量',
      dataIndex: 'F',
      key: 'F',
    },
    {
      title: '趋势',
      dataIndex: 'G',
      key: 'G',
    },
  ];
  if (type === 'normal') {
    column = [
      {
        title: '采集时间',
        dataIndex: 'A',
        key: 'A',
      },
      {
        title: '节点名称',
        dataIndex: 'B',
        key: 'B',
      },
      {
        title: '能源类型',
        dataIndex: 'C',
        key: 'C',
      },
      {
        title: `能耗${unit}）`,
        dataIndex: 'D',
        key: 'D',
      },
      // {
      //   title: '上期时间',
      //   dataIndex: 'D',
      //   key: 'D',
      // },
      // {
      //   title: `上期能耗${unit}）`,
      //   dataIndex: 'E',
      //   key: 'E',
      // },
    ];
  }
  return column;
};
export const barCartDataOptions = {
  legend: {
    textStyle: {
      color: '#fff',
    },
  },
  dataZoom: [
    {
      type: 'slider',
      show: true,
      xAxisIndex: [0],
      left: '9%',
      bottom: -5,
      start: 0,
      end: 80, //初始化滚动条
    },
  ],
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
    },
    {
      name: '昨日能耗',
      type: 'bar',
      data: [13, 14, 16, 13, 8, 9, 26],
      itemStyle: {
        color: '#315679',
      },
    },
  ],
};
