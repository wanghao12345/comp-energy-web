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
// import { current } from 'immer';
import { useEffect, useState } from 'react';
import { energyConsumptionOverview } from '@/apis/energyMerge';
import { formatDate, formatNumer } from '@/utils/common';

interface chartProps {
  x: string;
  y: number;
}

export default () => {
  const [form, setForm] = useImmer({
    typeValue: 1,
    areaValue: 1,
  });
  const [tabCurrentDay, setTabCurrentDay] = useImmer(1);
  //中间折线图
  const [chartMiddle, setChartMiddle] = useState<any>();
  //右下角柱状图
  const [chartData, setChartData] = useState<any>();
  const handleChange = (val: any) => {
    setForm((p) => {
      p.typeValue = val;
    });
  };

  const getChartData = (energyType: number, dateType: number) => {
    energyConsumptionOverview({
      energyType,
      dateType,
      queryStartDate: '2022-03-15',
      queryEndDate: '2022-04-15',
    }).then((res: any) => {
      if (res?.meta?.code === 200) {
        const { xAxisData, seriesData } = formChartData(res.data);
        barCartDataOptions.xAxis.data = xAxisData;
        barCartDataOptions.series[0].data = seriesData;
        barCartDataOptions.yAxis.name = typeList[form.typeValue - 1].unit;
        lineCartDataOptions.xAxis.data = xAxisData;
        lineCartDataOptions.series[0].data = seriesData;
        lineCartDataOptions.yAxis.name = typeList[form.typeValue - 1].unit;
        setChartData(Object.assign({}, barCartDataOptions));
        setChartMiddle(Object.assign({}, lineCartDataOptions));
      }
    });
  };

  const formChartData = (data: chartProps[]) => {
    const xAxisData: string[] = [];
    const seriesData: number[] = [];
    data.map((item) => {
      xAxisData.push(item.x);
      seriesData.push(formatNumer(item.y));
    });
    return {
      xAxisData,
      seriesData,
    };
  };

  useEffect(() => {
    getChartData(form.typeValue, tabCurrentDay);
  }, [form.typeValue, form.areaValue, tabCurrentDay]);
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
          <MyChartBox id="lineChart" options={chartMiddle}></MyChartBox>
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
            <MyChartBox id="barChart" options={chartData}></MyChartBox>
          </BarCartBox>
        </div>
      </PageBox>
    </>
  );
};
