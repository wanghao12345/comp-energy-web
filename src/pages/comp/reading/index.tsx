import { useRef, useEffect } from 'react';
import {
  Select,
  Input,
  Tree,
  Tabs,
  DatePicker,
  Button,
  Table,
  TimePicker,
} from 'antd';
import moment from 'moment';
import * as echarts from 'echarts';
import {
  SearchOutlined,
  CarryOutOutlined,
  FormOutlined,
} from '@ant-design/icons';
import { RealContainer, RealOptionContainer, RealBodyContainer } from './style';

const { Option } = Select;
const { TabPane } = Tabs;
const { RangePicker } = DatePicker;
const RealPage = () => {
  return (
    <RealContainer>
      <RealOption />
      <RealBodyOption />
    </RealContainer>
  );
};

const RealOption = () => {
  const treeData = [
    {
      title: '1AA',
      key: '0-0',
      icon: <CarryOutOutlined />,
      children: [
        {
          title: '北厂区0101',
          key: '0-0-0',
          icon: <CarryOutOutlined />,
          children: [{ title: '站点1', key: '0-0-0-0' }],
        },
        {
          title: '南长区1901',
          key: '0-0-1',
          icon: <CarryOutOutlined />,
          children: [
            { title: '站点1', key: '0-0-1-0', icon: <CarryOutOutlined /> },
          ],
        },
        {
          title: '北厂区0101',
          key: '0-0-2',
          icon: <CarryOutOutlined />,
          children: [
            { title: '站点1', key: '0-0-2-0', icon: <CarryOutOutlined /> },
            {
              title: '站点2',
              key: '0-0-2-1',
              icon: <CarryOutOutlined />,
            },
          ],
        },
      ],
    },
  ];
  const onSelect = (selectedKeys: React.Key[], info: any) => {
    console.log('selected', selectedKeys, info);
  };
  return (
    <RealOptionContainer>
      <Select size="large" defaultValue="电" onChange={() => {}}>
        <Option value="电">电</Option>
        <Option value="水">水</Option>
        <Option value="蒸汽">蒸汽</Option>
        <Option value="空气">空气</Option>
        <Option value="氮气">氮气</Option>
        <Option value="天然气">天然气</Option>
      </Select>
      <Input size="large" suffix={<SearchOutlined />} placeholder="节点名称" />
      <Tree
        showLine={true}
        showIcon={false}
        defaultExpandedKeys={['0-0-0']}
        onSelect={onSelect}
        treeData={treeData}
      />
    </RealOptionContainer>
  );
};

const RealBodyOption = () => {
  const dataSource = [
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

  const columns = [
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
  const onChange = (key: string) => {
    console.log(key);
  };
  return (
    <RealBodyContainer>
      <div className="options-box">
        <div className="search-box">
          <DatePicker size="large" onChange={() => {}} />
          <TimePicker
            size="large"
            defaultValue={moment('12:08', 'HH:mm')}
            format={'HH:mm'}
          />
          <Button size="large" type="primary">
            查询
          </Button>
        </div>
      </div>
      <div className="table-box">
        <Table size="middle" dataSource={dataSource} columns={columns} />
      </div>
    </RealBodyContainer>
  );
};

export default RealPage;
