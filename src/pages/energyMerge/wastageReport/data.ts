export const columns = [
  // {
  //   title: 'key',
  //   dataIndex: 'index',
  // },
  {
    title: '节点名称',
    dataIndex: 'name',
  },
  {
    title: '当前支路能耗',
    dataIndex: 'current',
  },
  {
    title: '下级支路能耗合计',
    dataIndex: 'lowTotal',
  },
  {
    title: '当前支路与下级支路能耗合计差值',
    dataIndex: 'CZ',
  },
  {
    title: '相差百分比',
    dataIndex: 'Rate',
  },
];
export const data = [
  {
    key: 1,
    A: 'John Brown sr.',
    B: 60,
    C: 'New York No. 1 Lake Park',
    D: 'New York No. 1 Lake Park',
    E: 'New York No. 1 Lake Park',
    children: [
      {
        key: 11,
        A: 'John Brown',
        age: 42,
        address: 'New York No. 2 Lake Park',
      },
      {
        key: 12,
        A: 'John Brown jr.',
        age: 30,
        address: 'New York No. 3 Lake Park',
        children: [
          {
            key: 121,
            A: 'Jimmy Brown',
            age: 16,
            address: 'New York No. 3 Lake Park',
          },
        ],
      },
      {
        key: 13,
        A: 'Jim Green sr.',
        age: 72,
        address: 'London No. 1 Lake Park',
        children: [
          {
            key: 131,
            A: 'Jim Green',
            age: 42,
            address: 'London No. 2 Lake Park',
            children: [
              {
                key: 1311,
                A: 'Jim Green jr.',
                age: 25,
                address: 'London No. 3 Lake Park',
              },
              {
                key: 1312,
                A: 'Jimmy Green sr.',
                age: 18,
                address: 'London No. 4 Lake Park',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    key: 2,
    A: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
];
