export enum tabStatus {
  RealTime = 'RealTime',
  Warnning = 'Warnning',
  Contact = 'Contact',
}

export const optionsData = [
  ['电流', '电压', '功率因数', '有功功率', '频率', '有功电能'],
  ['水'],
  ['蒸汽'],
  ['空气'],
  ['氮气'],
  ['天然气'],
];

export const dataSource1 = [
  {
    key: '1',
    name: '胡彦斌',
    age: 32,
    address: '西湖区湖底公园1号',
  },
  {
    key: '2',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号',
  },
];

export const Realtimecolumns = [
  {
    title: '采集时间',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Ia（A） ',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Ib（A）',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Ic（A）',
    dataIndex: 'age',
    key: 'age',
  },
];
export const WarnColumns = [
  {
    title: '仪表名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '报警时间',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '报警类型',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '描述',
    dataIndex: 'name',
    key: 'name',
  },
];
export const ContactColumns = [
  {
    title: '节点名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '仪表地址',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '仪表型号',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '仪表名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '仪表类型',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '状态',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '备注',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '最后一次通讯时间',
    dataIndex: 'name',
    key: 'name',
  },
];

export const chartOption = {
  grid: {
    left: 40,
    right: 20,
    top: 80,
  },
  tooltip: {
    trigger: 'axis',
  },
  legend: {
    top: 30,
    textStyle: {
      color: '#FFFFFF',
    },
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
      name: 'la',
      type: 'line',
      smooth: true,
      markPoint: {
        data: [
          { type: 'max', name: 'Max' },
          { type: 'min', name: 'Min' },
        ],
        label: {
          color: '#FFFFFF',
        },
      },
      lineStyle: {
        color: '#FFEF6C',
      },
      data: [
        100, 200, 300, 500, 400, 350, 300, 100, 200, 300, 500, 400, 350, 300,
        100, 200, 300, 500, 400, 350, 300, 350, 150, 450,
      ],
    },
    {
      name: 'lb',
      type: 'line',
      smooth: true,
      markPoint: {
        data: [
          { type: 'max', name: 'Max' },
          { type: 'min', name: 'Min' },
        ],
        label: {
          color: '#FFFFFF',
        },
      },
      lineStyle: {
        color: '#FD264E',
      },
      data: [
        200, 300, 500, 400, 350, 300, 100, 200, 300, 500, 400, 350, 300, 100,
        200, 300, 500, 400, 350, 300, 350, 150, 450, 200,
      ],
    },
    {
      name: 'lc',
      type: 'line',
      smooth: true,
      markPoint: {
        data: [
          { type: 'max', name: 'Max' },
          { type: 'min', name: 'Min' },
        ],
        label: {
          color: '#FFFFFF',
        },
      },
      lineStyle: {
        color: '#2DFCC0',
      },
      data: [
        300, 500, 400, 350, 300, 100, 200, 300, 500, 400, 350, 300, 100, 200,
        300, 500, 400, 350, 300, 350, 150, 450, 200, 100,
      ],
    },
  ],
};