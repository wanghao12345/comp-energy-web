import { Select, Input, Tree, Tabs, DatePicker, Button, Checkbox } from 'antd';
import { SearchOutlined, CarryOutOutlined } from '@ant-design/icons';
import { RealContainer, RealOptionContainer, RealBodyContainer } from './style';
import MyChartBox from '@/components/MyChartsBox';
import { barCartDataOptions } from './data';
const { Option } = Select;
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
      <Input
        style={{ marginBottom: '20px' }}
        size="large"
        suffix={<SearchOutlined />}
        placeholder="线路名称"
      />
      <Checkbox>是否级联</Checkbox>
      <Checkbox>全选</Checkbox>
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
  return (
    <RealBodyContainer>
      <div className="search-box">
        <Select
          size="large"
          value="1"
          onChange={() => {}}
          style={{
            width: '160px',
          }}
        >
          {[
            { name: '今日', value: '1' },
            { name: '本月', value: '2' },
            { name: '本年', value: '3' },
          ].map((item) => (
            <Option key={item.value} value={item.value}>
              {item.name}
            </Option>
          ))}
        </Select>
        <DatePicker size="large" />
        <Button size="large" type="primary">
          查询
        </Button>
      </div>
      <div className="echart-box">
        <MyChartBox id="barChart" options={barCartDataOptions}></MyChartBox>
      </div>
    </RealBodyContainer>
  );
};

export default RealPage;
