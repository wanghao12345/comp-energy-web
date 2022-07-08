// 能源管理=>趋势分析
import { Select, Tabs, DatePicker, Button, Table } from 'antd';
import { barCartDataOptions, columns, dataSource } from './data';
import { RealBodyContainer } from './style';
import MyChartBox from '@/components/myChartsBox';
import MyTemplate from '@/components/myTemplate';
import { useEffect, useState } from 'react';
import { energyConsumptionBulletinBoard } from '@/apis/energyMerge';
import { boardDayList } from '@/commonInterface';
import { formatDate, formatNumer } from '@/utils/common';
import moment, { Moment } from 'moment';
import { useImmer } from 'use-immer';
const { Option } = Select;
const { TabPane } = Tabs;
const RealPage = () => {
  return (
    <MyTemplate>
      <RealBodyOption />
    </MyTemplate>
  );
};

const RealBodyOption = () => {
  const onChange = (key: string) => {
    console.log(key);
  };
  const [form, setForm] = useImmer({
    energyType: 1,
    dateType: 1,
    queryStartDate: formatDate(),
  });
  const [barChartData, setBarChartData] = useState(barCartDataOptions);
  const handleDateTypeChange = (val: any) => {
    console.log(val);
    setForm((p) => {
      p.dateType = val;
    });
  };
  const handleQueryStartDateChange = (val: any) => {
    if (!val) {
      setForm((p) => {
        p.queryStartDate = formatDate();
      });
      return;
    }
    const m = val as Moment;
    const cdate = `${m.year()}-${m.month() + 1}-${m.date()}`;
    setForm((p) => {
      p.queryStartDate = cdate;
    });
  };
  const onClickSearch = () => {
    getBoardData();
  };

  const getBoardData = () => {
    energyConsumptionBulletinBoard({
      energyType: form.energyType,
      dateType: form.dateType,
      queryStartDate: '2022-04-01',
      queryEndDate: '2022-04-30',
    }).then((res: any) => {
      if (res?.meta?.code === 200) {
        const { xAxisData, seriesData } = formChartData(res?.data);
        barCartDataOptions.xAxis.data = xAxisData;
        barCartDataOptions.series[0].data = seriesData;
        setBarChartData(Object.assign({}, barCartDataOptions));
      }
    });
  };

  const formChartData = (data: any[]) => {
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
  }, []);

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
            allowClear
            picker={(boardDayList[form.dateType - 1]?.type as any) || 'year'}
            disabledDate={(current) => {
              return current && current >= moment().endOf('day');
            }}
          />
          <Button size="large" type="primary" onClick={onClickSearch}>
            查询
          </Button>
        </div>
      </div>
      <div className="echart-box">
        <MyChartBox id="barChart" options={barCartDataOptions}></MyChartBox>
      </div>
      <div className="table-box">
        <Table
          scroll={{ y: 260 }}
          size="middle"
          dataSource={dataSource}
          columns={columns}
        />
      </div>
    </RealBodyContainer>
  );
};

export default RealPage;
