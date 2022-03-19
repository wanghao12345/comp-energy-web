// 能源管理=>用能概括
import { PageBox, HeaderFilterBox, LineCartBox, BarCartBox } from './style';
import { useImmer } from 'use-immer';
import {
  typeList,
  dayTypeList,
  lineCartDataOptions,
  barCartDataOptions,
} from './data';
import { Select, Tag } from 'antd';
const { Option } = Select;
import MyChartBox from '@/components/MyChartsBox';
import MyCard from '@/components/MyCard';
import { current } from 'immer';
export default () => {
  const [form, setForm] = useImmer({
    typeValue: '1',
    areaValue: '',
  });
  const [tabCurrentDay, setTabCurrentDay] = useImmer('1');
  const handleChange = (val) => {
    console.log(val);
    setForm((p) => {
      p.typeValue = val;
    });
  };
  const initPage = () => {
    console.log('34');
  };
  return (
    <>
      <PageBox>
        <HeaderFilterBox>
          <Select
            size="large"
            value={form.typeValue}
            style={{ width: 120 }}
            onChange={handleChange}
          >
            {typeList.map((item) => (
              <Option key={item.value} value={item.value}>
                {item.name}
              </Option>
            ))}
          </Select>
          <Select
            size="large"
            placeholder="区域"
            value={form.areaValue}
            style={{ width: 320, marginLeft: '16px' }}
          ></Select>
        </HeaderFilterBox>
        <LineCartBox title="日用能平均曲线">
          <MyChartBox id="lineChart" options={lineCartDataOptions}></MyChartBox>
        </LineCartBox>
        <div className="content-box">
          <MyCard className="chain-list" title="环比">
            <div className="chain-row">
              {new Array(2).fill(null).map((item, index) => (
                <div className="chain-row-item" key={index}>
                  <div className="title">2001.42</div>
                  <div className="desc">今日用能(t)</div>
                </div>
              ))}
              <div className="chain-row-item trend-box">
                <div className="title line">+33.26%</div>
                <div className="title">+46036.84kw.h</div>
                <div className="desc">趋势</div>
              </div>
            </div>
            <div className="chain-row">
              {new Array(2).fill(null).map((item, index) => (
                <div className="chain-row-item" key={index}>
                  <div className="title">2001.42</div>
                  <div className="desc">今日用能(t)</div>
                </div>
              ))}
              <div className="chain-row-item trend-box">
                <div className="title line">+33.26%</div>
                <div className="title">+46036.84kw.h</div>
                <div className="desc">趋势</div>
              </div>
            </div>
            <div className="chain-row">
              {new Array(2).fill(null).map((item, index) => (
                <div className="chain-row-item" key={index}>
                  <div className="title">2001.42</div>
                  <div className="desc">今日用能(t)</div>
                </div>
              ))}
              <div className="chain-row-item trend-box">
                <div className="title line">+33.26%</div>
                <div className="title">+46036.84kw.h</div>
                <div className="desc">趋势</div>
              </div>
            </div>
          </MyCard>
          <BarCartBox title="环比能耗趋势">
            <div className="tabs">
              {dayTypeList.map((item) => (
                <Tag
                  className={item.value === tabCurrentDay ? 'active' : ''}
                  onClick={() => setTabCurrentDay(item.value)}
                  color="#203564"
                  key={item.value}
                >
                  {item.name}
                </Tag>
              ))}
            </div>
            <MyChartBox id="barChart" options={barCartDataOptions}></MyChartBox>
          </BarCartBox>
        </div>
      </PageBox>
    </>
  );
};
