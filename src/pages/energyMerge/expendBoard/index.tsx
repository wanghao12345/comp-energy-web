// 能源管理=>能耗看板
import { Select, DatePicker, Button } from 'antd';
import { RealBodyContainer } from './style';
import MyChartBox from '@/components/myChartsBox';
import { barCartDataOptions } from './data';
import { useImmer } from 'use-immer';
import { useContext, useEffect, useState } from 'react';
import { energyConsumptionBulletinBoard } from '@/apis/energyMerge';
import moment, { Moment } from 'moment';
import { EnergyTypeList, boardDayList } from '@/commonInterface';
import { TemplateContext } from '@/components';
import MyTemplate from '@/components/myTemplate';
import { formatTime, formatNumer } from '@/utils/common';
const { Option } = Select;

interface chartProps {
  regionName: string;
  x: string;
  y: number;
}
const RealPage = () => {
  return (
    <MyTemplate isShowCheckBox={true}>
      <RealBodyOption />
    </MyTemplate>
  );
};

const RealBodyOption = () => {
  const templateProps = useContext(TemplateContext);
  const [form, setForm] = useImmer({
    dateType: 1,
    queryStartDate: new Date(),
    loading: 1,
  });
  const [barChartData, setBarChartData] = useState<any>();
  const handleDateTypeChange = (val: any) => {
    console.log(val);
    setForm((p) => {
      p.dateType = val;
    });
  };
  const handleQueryStartDateChange = (val: any) => {
    const m = val as Moment;
    setForm((p) => {
      p.queryStartDate = m.toDate();
    });
  };

  const onClickSearch = () => {
    getBoardData();
  };

  const getBoardData = () => {
    const { queryStartDate, queryEndDate } = formatTime(
      form.queryStartDate,
      form.dateType,
    );
    setForm((p) => {
      p.loading = 1;
    });
    energyConsumptionBulletinBoard({
      energyType: templateProps.energyType,
      dateType: form.dateType,
      queryStartDate: queryStartDate,
      queryEndDate: queryEndDate,
      regionIdList: templateProps.area,
    }).then((res: any) => {
      if (res?.meta?.code === 200) {
        setForm((p) => {
          p.loading = 0;
        });
        const data = res?.data;
        if (!data.length) {
          setBarChartData(undefined);
          return;
        }
        const { xAxisData, seriesData } = formChartData(data);
        barCartDataOptions.xAxis.data = xAxisData;
        barCartDataOptions.yAxis.name =
          EnergyTypeList[templateProps.energyType - 1].unit;
        barCartDataOptions.series[0].data = seriesData;
        barCartDataOptions.series[0].name =
          (boardDayList[form.dateType - 1]?.name || '年') + '消耗';
        setBarChartData(Object.assign({}, barCartDataOptions));
      }
    });
  };

  const formChartData = (data: chartProps[]) => {
    const xAxisData: string[] = [];
    const seriesData: number[] = [];
    data.map((item) => {
      xAxisData.push(item.regionName);
      seriesData.push(formatNumer(item.y));
    });
    return {
      xAxisData,
      seriesData,
    };
  };

  useEffect(() => {
    getBoardData();
  }, [templateProps.area, templateProps.energyType]);
  return (
    <RealBodyContainer>
      <div className="search-box">
        <Select
          size="large"
          value={form.dateType}
          style={{ width: 120 }}
          onChange={handleDateTypeChange}
        >
          {boardDayList.map((item) => (
            <Option key={item.value} value={item.value}>
              {item.name}
            </Option>
          ))}
        </Select>
        <DatePicker
          size="large"
          onChange={handleQueryStartDateChange}
          defaultValue={moment()}
          allowClear={false}
          picker={(boardDayList[form.dateType - 1]?.type as any) || 'year'}
          disabledDate={(current) => {
            return current && current >= moment().endOf('day');
          }}
        />
        <Button size="large" type="primary" onClick={onClickSearch}>
          查询
        </Button>
      </div>
      <div className="echart-box">
        <MyChartBox
          id="expend-barChart"
          options={barChartData}
          loading={form.loading}
        ></MyChartBox>
      </div>
    </RealBodyContainer>
  );
};

export default RealPage;
