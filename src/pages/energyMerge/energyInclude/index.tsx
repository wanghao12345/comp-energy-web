// 能源管理=>用能概括
import { PageBox, HeaderFilterBox, LineCartBox, BarCartBox } from './style';
import { useImmer } from 'use-immer';
import { dayTypeList, lineCartDataOptions, barCartDataOptions } from './data';
import { Select, Tag } from 'antd';
const { Option } = Select;
import MyChartBox from '@/components/MyChartsBox';
import MyCard from '@/components/MyCard';
// import { current } from 'immer';
import { useEffect, useState } from 'react';
import { energyConsumptionOverview } from '@/apis/energyMerge';
import { formatDate, formatNumer } from '@/utils/common';
import { typeList } from '@/commonInterface';

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
  const [lineChart, setLineChartData] = useState<any>();
  //右下角柱状图
  const [barChart, setBarChartData] = useState<any>();
  const handleChange = (val: any) => {
    setForm((p) => {
      p.typeValue = val;
    });
  };

  const getChartData = (
    energyType: number,
    dateType: number,
    updateType: string,
  ) => {
    if (updateType === 'both') {
      energyConsumptionOverview({
        energyType,
        dateType,
        queryStartDate: '2022-04-01',
        queryEndDate: '2022-04-30',
      }).then((res: any) => {
        if (res?.meta?.code === 200) {
          const { xAxisData, seriesData } = formChartData(res.data);
          barCartDataOptions.xAxis.data = xAxisData;
          barCartDataOptions.series[0].data = seriesData;
          barCartDataOptions.series[0].name = typeList[form.typeValue - 1].name;
          barCartDataOptions.yAxis.name = typeList[form.typeValue - 1].unit;
          lineCartDataOptions.xAxis.data = xAxisData;
          lineCartDataOptions.series[0].data = seriesData;
          lineCartDataOptions.series[0].name =
            typeList[form.typeValue - 1].name;
          lineCartDataOptions.yAxis.name = typeList[form.typeValue - 1].unit;
          setBarChartData(Object.assign({}, barCartDataOptions));
          setLineChartData(Object.assign({}, lineCartDataOptions));
        }
      });
    }
    if (updateType === 'barChart') {
      energyConsumptionOverview({
        energyType,
        dateType,
        queryStartDate: '2022-04-01',
        queryEndDate: '2022-04-30',
      }).then((res: any) => {
        if (res?.meta?.code === 200) {
          const { xAxisData, seriesData } = formChartData(res.data);
          if (updateType === 'barChart') {
            barCartDataOptions.xAxis.data = xAxisData;
            barCartDataOptions.series[0].data = seriesData;
            barCartDataOptions.series[0].name =
              typeList[form.typeValue - 1].name;
            barCartDataOptions.yAxis.name = typeList[form.typeValue - 1].unit;
            setBarChartData(Object.assign({}, barCartDataOptions));
          }
        }
      });
    }
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
    getChartData(form.typeValue, form.areaValue, 'both');
  }, [form.typeValue, form.areaValue]);

  useEffect(() => {
    getChartData(form.typeValue, tabCurrentDay, 'barChart');
  }, [tabCurrentDay]);

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
          <MyChartBox id="lineChart" options={lineChart}></MyChartBox>
        </LineCartBox>
        <div className="content-box">
          <MyCard className="chain-list" title="环比">
            <div className="chain-row">
              <div className="chain-row-item">
                <div className="title">2001.42</div>
                <div className="desc">{`今日用能(${
                  typeList[form.typeValue - 1].unit
                })`}</div>
              </div>
              <div className="chain-row-item">
                <div className="title">2001.42</div>
                <div className="desc">{`昨日用能(${
                  typeList[form.typeValue - 1].unit
                })`}</div>
              </div>
              <div className="chain-row-item trend-box">
                <div className="title line">+33.26%</div>
                <div className="title">+46036.84kw.h</div>
                <div className="desc">趋势</div>
              </div>
            </div>
            <div className="chain-row">
              <div className="chain-row-item">
                <div className="title">2001.42</div>
                <div className="desc">{`当月用能(${
                  typeList[form.typeValue - 1].unit
                })`}</div>
              </div>
              <div className="chain-row-item">
                <div className="title">2001.42</div>
                <div className="desc">{`上月用能(${
                  typeList[form.typeValue - 1].unit
                })`}</div>
              </div>
              <div className="chain-row-item trend-box">
                <div className="title line">+33.26%</div>
                <div className="title">+46036.84kw.h</div>
                <div className="desc">趋势</div>
              </div>
            </div>
            <div className="chain-row">
              <div className="chain-row-item">
                <div className="title">2001.42</div>
                <div className="desc">{`当年用能(${
                  typeList[form.typeValue - 1].unit
                })`}</div>
              </div>
              <div className="chain-row-item">
                <div className="title">2001.42</div>
                <div className="desc">{`上年用能(${
                  typeList[form.typeValue - 1].unit
                })`}</div>
              </div>
              <div className="chain-row-item trend-box">
                <div className="title line">+33.26%</div>
                <div className="title">+46036.84kw.h</div>
                <div className="desc">趋势</div>
              </div>
            </div>
          </MyCard>
          <BarCartBox title="能耗趋势">
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
            <MyChartBox id="barChart" options={barChart}></MyChartBox>
          </BarCartBox>
        </div>
      </PageBox>
    </>
  );
};
