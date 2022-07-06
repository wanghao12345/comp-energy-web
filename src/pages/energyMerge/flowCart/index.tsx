// 能源管理=>能源流向图
import { FlowCartPage } from './style';
import { flowOptions } from './data';
import MyChartsBox from '@/components/myChartsBox';
import { Select } from 'antd';
const { Option } = Select;
export default () => {
  return (
    <FlowCartPage>
      <div className="filter-box">
        <Select
          size="large"
          style={{ width: '320px' }}
          defaultValue="电"
          onChange={() => {}}
        >
          <Option value="电">电</Option>
          <Option value="水">水</Option>
          <Option value="蒸汽">蒸汽</Option>
          <Option value="空气">空气</Option>
          <Option value="氮气">氮气</Option>
          <Option value="天然气">天然气</Option>
        </Select>
      </div>
      <div className="chart-box">
        <MyChartsBox id="flowCart" options={flowOptions} />
      </div>
    </FlowCartPage>
  );
};
