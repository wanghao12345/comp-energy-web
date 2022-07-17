// 能源管理=>用能概括
import { PageBox, HeaderFilterBox, LineCartBox, BarCartBox } from './style';
import { useImmer } from 'use-immer';
import { lineCartDataOptions, barCartDataOptions } from './data';
import { Select, Tag } from 'antd';
const { Option } = Select;
import MyChartBox from '@/components/myChartsBox';
import MyCard from '@/components/myCard';
import { useEffect, useState } from 'react';
import {
  energyConsumptionOverview,
  energyConsumptionOverviewQOQ,
} from '@/apis/energyMerge';
import { formatDate, formatNumer, formatTime } from '@/utils/common';
import { dayTypeList, EnergyTypeList, TimeType } from '@/commonInterface';
import { getRegionTreeList } from '@/apis';
import moment from 'moment';

interface chartProps {
  x: string;
  y: number;
}

interface huanbiProps {
  dayQOQDiff: string;
  dayQOQRate: string;
  lastMouthNumber: number;
  lastYearNumber: number;
  mouthQOQDiff: string;
  mouthQOQRate: string;
  thisMouthNumber: number;
  thisYearNumber: number;
  todayNumber: number;
  yearQOQDiff: string;
  yearQOQRate: string;
  yesterdayNumber: number;
}

export default () => {
  const [form, setForm] = useImmer({
    energyType: 1,
    lineChartLoading: 1,
    barChartLoading: 1,
  });
  const [huanBiData, setHuanbiData] = useState<huanbiProps | null>();
  const [tabCurrentDay, setTabDateType] = useImmer(1);
  //中间折线图
  const [lineChart, setLineChartData] = useState<any>();
  //右下角柱状图
  const [barChart, setBarChartData] = useState<any>();
  const [selectData, setSelectData] = useState<any>({
    value: 1,
    options: [],
  });
  const handleChange = (val: any) => {
    setForm((p) => {
      p.energyType = val;
    });
  };

  const getChartData = (
    energyType: number,
    regionList: number,
    dateType: number,
    updateType: string,
  ) => {
    const { queryStartDate, queryEndDate } = formatTime(new Date(), dateType);

    const qsd = queryStartDate.split(' ')[0];
    const qed = queryEndDate.split(' ')[0];
    if (updateType === 'both') {
      setForm((p) => {
        p.barChartLoading = 1;
        p.lineChartLoading = 1;
      });
      energyConsumptionOverview({
        energyType,
        dateType: TimeType.Day,
        queryStartDate: qsd,
        queryEndDate: qed,
        regionIdList: [regionList],
      }).then((res: any) => {
        setForm((p) => {
          p.lineChartLoading = 0;
          p.barChartLoading = 0;
        });
        if (res?.meta?.code === 200) {
          if (!res?.data?.length) {
            setBarChartData(undefined);
            setLineChartData(undefined);
            return;
          }
          const { xAxisData, seriesData } = formChartData(res.data, dateType);
          barCartDataOptions.xAxis.data = xAxisData;
          barCartDataOptions.series[0].data = seriesData;
          barCartDataOptions.series[0].name =
            EnergyTypeList[form.energyType - 1].name;
          barCartDataOptions.yAxis.name =
            EnergyTypeList[form.energyType - 1].unit;
          lineCartDataOptions.xAxis.data = xAxisData;
          lineCartDataOptions.series[0].data = seriesData;
          lineCartDataOptions.series[0].name =
            EnergyTypeList[form.energyType - 1].name;
          lineCartDataOptions.yAxis.name =
            EnergyTypeList[form.energyType - 1].unit;
          setBarChartData(Object.assign({}, barCartDataOptions));
          setLineChartData(Object.assign({}, lineCartDataOptions));
        }
      });
    }
    if (updateType === 'barChart') {
      setForm((p) => {
        p.barChartLoading = 1;
      });
      energyConsumptionOverview({
        energyType,
        dateType,
        queryStartDate: qsd,
        queryEndDate: qed,
        regionIdList: [selectData.value],
      }).then((res: any) => {
        setForm((p) => {
          p.barChartLoading = 0;
        });
        if (res?.meta?.code === 200) {
          if (!res?.data?.length) {
            setBarChartData(undefined);
            return;
          }
          const { xAxisData, seriesData } = formChartData(res.data, dateType);
          if (updateType === 'barChart') {
            barCartDataOptions.xAxis.data = xAxisData;
            barCartDataOptions.series[0].data = seriesData;
            barCartDataOptions.series[0].name =
              EnergyTypeList[form.energyType - 1].name;
            barCartDataOptions.yAxis.name =
              EnergyTypeList[form.energyType - 1].unit;
            setBarChartData(Object.assign({}, barCartDataOptions));
          }
        }
      });
    }
  };

  const formChartData = (data: chartProps[], dateType: number) => {
    const xAxisData: string[] = [];
    const seriesData: number[] = [];
    data.map((item) => {
      let day = item.x;
      if (dateType == TimeType.Month) {
        day = item.x.split('-')[1] + '-' + item.x.split('-')[2];
      }
      xAxisData.push(day);
      seriesData.push(formatNumer(item.y));
    });
    return {
      xAxisData,
      seriesData,
    };
  };

  const onClickTag = (item: any) => {
    setTabDateType(item.value);
    getChartData(form.energyType, selectData.value, item.value, 'barChart');
  };

  const formatSelectOption = (data: []) => {
    data.map((item: any) => {
      if (item?.children && item?.children.length) {
        formatSelectOption(item?.children);
      } else {
        selectData.options.push({
          label: item?.name,
          value: parseInt(item?.id || '1'),
        });
      }
    });
  };

  const getRegionList = () => {
    getRegionTreeList().then((res: any) => {
      if (res?.meta?.code === 200) {
        formatSelectOption(res?.data);
        setSelectData(
          Object.assign(
            {},
            {
              value: selectData.options[0].value,
              options: selectData.options,
            },
          ),
        );
      }
    });
  };

  const onSelectChange = (value: any) => {
    setSelectData({
      value: value,
      options: selectData.options,
    });
  };

  useEffect(() => {
    getRegionList();
  }, []);

  useEffect(() => {
    setTabDateType(dayTypeList[0].value);
    getChartData(form.energyType, selectData.value, 1, 'both');
    getEnergyConsumptionOverviewQOQ(form.energyType);
  }, [form.energyType, selectData.value]);

  const getEnergyConsumptionOverviewQOQ = (energyType: number) => {
    const queryStartDate = formatDate();
    energyConsumptionOverviewQOQ({ energyType, queryStartDate }).then(
      (res: any) => {
        if (res?.meta?.code === 200) {
          let hbd: any = {};
          for (let name in res?.data) {
            hbd[name] = formatNumer(res?.data[name]);
            if (
              (name.includes('Rate') || name.includes('Diff')) &&
              hbd[name] > 0
            ) {
              hbd[name] = '+' + hbd[name];
            }
            if (name.includes('Rate')) {
              if (typeof hbd[name] === 'number') hbd[name] = hbd[name] + '%';
            }
          }
          setHuanbiData(hbd);
        }
      },
    );
  };
  return (
    <>
      <PageBox>
        <HeaderFilterBox>
          <Select
            size="large"
            value={form.energyType}
            style={{ width: 160 }}
            onChange={handleChange}
          >
            {EnergyTypeList.map((item) => (
              <Option key={item.value} value={item.value}>
                {item.name}
              </Option>
            ))}
          </Select>
          <Select
            size="large"
            value={selectData.value}
            onChange={onSelectChange}
            style={{
              width: '320px',
              marginLeft: '24px',
            }}
          >
            {selectData.options.map((item: any, index: number) => {
              return (
                <Option value={item?.value} key={index}>
                  {item?.label}
                </Option>
              );
            })}
          </Select>
        </HeaderFilterBox>
        <LineCartBox title="日用能平均曲线">
          <MyChartBox
            id="energy-lineChart"
            options={lineChart}
            loading={form.lineChartLoading}
          ></MyChartBox>
        </LineCartBox>
        <div className="content-box">
          <MyCard className="chain-list" title="环比">
            <div className="chain-row">
              <div className="chain-row-item">
                <div className="title">{huanBiData?.todayNumber || 0}</div>
                <div className="desc">{`今日用能(${
                  EnergyTypeList[form.energyType - 1].unit
                })`}</div>
              </div>
              <div className="chain-row-item">
                <div className="title">{huanBiData?.yesterdayNumber || 0}</div>
                <div className="desc">{`昨日用能(${
                  EnergyTypeList[form.energyType - 1].unit
                })`}</div>
              </div>
              <div className="chain-row-item trend-box">
                <div className="title line">{huanBiData?.dayQOQRate || 0}</div>
                <div className="title">
                  {huanBiData?.dayQOQDiff || 0}
                  {EnergyTypeList[form.energyType - 1].unit}
                </div>
                <div className="desc">趋势</div>
              </div>
            </div>
            <div className="chain-row">
              <div className="chain-row-item">
                <div className="title">{huanBiData?.thisMouthNumber || 0}</div>
                <div className="desc">{`当月用能(${
                  EnergyTypeList[form.energyType - 1].unit
                })`}</div>
              </div>
              <div className="chain-row-item">
                <div className="title">{huanBiData?.lastMouthNumber || 0}</div>
                <div className="desc">{`上月用能(${
                  EnergyTypeList[form.energyType - 1].unit
                })`}</div>
              </div>
              <div className="chain-row-item trend-box">
                <div className="title line">
                  {huanBiData?.mouthQOQRate || 0}
                </div>
                <div className="title">
                  {huanBiData?.mouthQOQDiff || 0}
                  {EnergyTypeList[form.energyType - 1].unit}
                </div>
                <div className="desc">趋势</div>
              </div>
            </div>
            <div className="chain-row">
              <div className="chain-row-item">
                <div className="title">{huanBiData?.thisYearNumber || 0}</div>
                <div className="desc">{`当年用能(${
                  EnergyTypeList[form.energyType - 1].unit
                })`}</div>
              </div>
              <div className="chain-row-item">
                <div className="title">{huanBiData?.lastYearNumber || 0}</div>
                <div className="desc">{`上年用能(${
                  EnergyTypeList[form.energyType - 1].unit
                })`}</div>
              </div>
              <div className="chain-row-item trend-box">
                <div className="title line">{huanBiData?.yearQOQRate || 0}</div>
                <div className="title">
                  {huanBiData?.yearQOQDiff || 0}
                  {EnergyTypeList[form.energyType - 1].unit}
                </div>
                <div className="desc">趋势</div>
              </div>
            </div>
          </MyCard>
          <BarCartBox title="能耗趋势">
            <div className="tabs">
              {dayTypeList.map((item) => (
                <Tag
                  className={item.value === tabCurrentDay ? 'active' : ''}
                  onClick={() => onClickTag(item)}
                  color="#203564"
                  key={item.value}
                >
                  {item.name}
                </Tag>
              ))}
            </div>
            <MyChartBox
              id="energy-barChart"
              options={barChart}
              loading={form.barChartLoading}
            ></MyChartBox>
          </BarCartBox>
        </div>
      </PageBox>
    </>
  );
};
