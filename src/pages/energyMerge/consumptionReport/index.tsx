// 能源管理=>用能报表
import { Select, Input, Tree, Tabs, DatePicker, Button, Table } from 'antd';
import { columns } from './data';
import {
  SearchOutlined,
  CarryOutOutlined,
  FormOutlined,
} from '@ant-design/icons';
import { RealContainer, RealOptionContainer, RealBodyContainer } from './style';
const { Option } = Select;
const { TabPane } = Tabs;
const dataSource = new Array(80).fill(null).map((item, index) => ({
  key: index,
  time: '00:00',
  nodeName: '1AAA1',
  type: '电',
  energy: '190.00',
}));
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
  const onChange = (key: string) => {
    console.log(key);
  };
  return (
    <RealBodyContainer>
      <div className="options-box">
        <div className="tab-box">
          <Tabs
            hideAdd
            defaultActiveKey={'0'}
            type="editable-card"
            tabPosition={'top'}
            onChange={onChange}
          >
            <TabPane tab={'趋势分析'} key={'0'}></TabPane>
            <TabPane tab={'同比分析'} key={'1'}></TabPane>
            <TabPane tab={'环比分析'} key={'2'}></TabPane>
          </Tabs>
        </div>
        <div className="search-box">
          <Select
            size="large"
            defaultValue="电流"
            onChange={() => {}}
            style={{
              width: '160px',
            }}
          >
            <Option value="电流">电流</Option>
            <Option value="电压">电压</Option>
            <Option value="功率因素">功率因素</Option>
            <Option value="有功功率">有功功率</Option>
            <Option value="频率">频率</Option>
            <Option value="有功电能">有功电能</Option>
          </Select>
          <DatePicker size="large" />
          <Button size="large" type="primary">
            查询
          </Button>
        </div>
      </div>
      <div className="table-box">
        <Table
          scroll={{ y: 560 }}
          size="middle"
          rowKey="key"
          pagination={{ pageSize: 20 }}
          dataSource={dataSource}
          columns={columns}
        />
      </div>
    </RealBodyContainer>
  );
};

export default RealPage;
