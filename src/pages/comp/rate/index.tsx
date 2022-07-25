import { useEffect, useState } from 'react';
import { Select, DatePicker, Button, Table } from 'antd';
import {
  RateContainer,
  RateOptionsContainer,
  RateBodyContainer,
  RateBodyLeftContainer,
  RateBodyRightContainer,
  RateBodyRightTopContainer,
  RateBodyRightBottomContainer,
} from './style';
import MyChartBox from '@/components/myChartsBox';
import { barStaticChartData, circleChart, circleChart1 } from './data';
import { electricMultiRate } from '@/apis/enterpriseReport';
import {
  boardDayListnoDay,
  MeterParameters,
  TimeType,
} from '@/commonInterface';
import moment, { Moment } from 'moment';
import { useImmer } from 'use-immer';
import { getRegionTreeList } from '@/apis';
import { formatNumer, formatTime } from '@/utils/common';

const colors = ['#D65050', '#E7804A', '#1B81FB', '#3B57A2'];
const { Option } = Select;
const { Column, ColumnGroup } = Table;
const RatePage = () => {
  const [form, setForm] = useImmer({
    dateType: TimeType.Week,
    queryStartDate: moment(),
    dPieLoading: 1,
    mPieLoading: 1,
    dBarLoading: 1,
  });
  const [pieChartData, setPieChartData] = useState<any>({
    electricity: undefined,
    money: undefined,
  });

  const [barChartData, setBarchartData] = useState<any>();
  const [selectData, setSelectData] = useState<any>({
    value: undefined,
    options: [],
  });
  const [dataSource, setDataSource] = useState<any>([]);
  const handleDateTypeChange = (val: any) => {
    console.log(val);
    setForm((p) => {
      p.dateType = val;
    });
  };
  const handleQueryStartDateChange = (val: any) => {
    const m = val as Moment;
    setForm((p) => {
      p.queryStartDate = m;
    });
  };

  const onClickSearch = () => {
    getElectricMultiRate();
  };

  const formatResponseDataTotal = (data: any) => {
    const keys = Object.keys(data);
    const seriesdata1: any = {};
    const seriesdata2: any = {};
    const mySeries = {
      jian: 0,
      feng: 0,
      ping: 0,
      gu: 0,
      jianCost: 0,
      fengCost: 0,
      pingCost: 0,
      guCost: 0,
    };
    keys.map((item) => {
      if (item === MeterParameters.jian) {
        mySeries.jian = formatNumer(data[item]?.activeElectricalEnergy || 0);
        mySeries.jianCost = formatNumer(data[item]?.electricCost || 0);
        const cdata = {
          value: mySeries.jian,
          name: '尖',
          itemStyle: {
            color: colors[0],
          },
        };
        seriesdata1['1'] = cdata;
        seriesdata2['1'] = { ...cdata, value: mySeries.jianCost };
      }
      if (item === MeterParameters.feng) {
        mySeries.feng = formatNumer(data[item]?.activeElectricalEnergy || 0);
        mySeries.fengCost = formatNumer(data[item]?.electricCost || 0);
        const cdata = {
          value: mySeries.feng,
          name: '峰',
          itemStyle: {
            color: colors[1],
          },
        };
        seriesdata1['2'] = cdata;
        seriesdata2['2'] = { ...cdata, value: mySeries.fengCost };
      }
      if (item === MeterParameters.gu) {
        mySeries.gu = formatNumer(data[item]?.activeElectricalEnergy || 0);
        mySeries.guCost = formatNumer(data[item]?.electricCost || 0);
        const cdata = {
          value: mySeries.gu,
          name: '谷',
          itemStyle: {
            color: colors[2],
          },
        };
        seriesdata1['3'] = cdata;
        seriesdata2['3'] = { ...cdata, value: mySeries.guCost };
      }
      if (item === MeterParameters.ping) {
        mySeries.ping = formatNumer(data[item]?.activeElectricalEnergy || 0);
        mySeries.pingCost = formatNumer(data[item]?.electricCost || 0);
        const cdata = {
          value: mySeries.ping,
          name: '平',
          itemStyle: {
            color: colors[3],
          },
        };
        seriesdata1['4'] = cdata;
        seriesdata2['4'] = { ...cdata, value: mySeries.pingCost };
      }
    });
    const ckeys = Object.keys(seriesdata1);
    const circleChartData1: any = [];
    const circleChartData2: any = [];

    ckeys.map((item) => {
      circleChartData1.push(seriesdata1[item]);
      circleChartData2.push(seriesdata2[item]);
    });
    circleChart.series[0].data = circleChartData1;
    circleChart1.series[0].data = circleChartData2;

    setPieChartData({
      electricity: Object.assign({}, circleChart),
      money: Object.assign({}, circleChart1),
    });
  };

  const formatResponseDataList = (data: any) => {
    const columnData: any[] = [[], [], [], []];
    const xAxisData: any[] = [];
    const series: any = {};
    const keys = Object.keys(data);
    if (!keys.length) {
      return;
    }

    keys.map((item, index) => {
      const dataList: any = [];
      data[item].map((list: any) => {
        let dateFormat = list?.statisticsDate;
        let columnTime = '';
        if (
          form.dateType === TimeType.Week ||
          form.dateType === TimeType.Month
        ) {
          dateFormat = moment(dateFormat).format('DD');
          columnTime = dateFormat + '日';
        } else {
          dateFormat = moment(dateFormat).format('MM');
          columnTime = dateFormat + '月';
        }
        const activeElectricalEnergy = formatNumer(
          list?.activeElectricalEnergy,
          3,
        );
        const electricCost = formatNumer(list?.electricCost, 2);
        dataList.push(activeElectricalEnergy);
        const column = {
          time: columnTime,
          fd: activeElectricalEnergy,
          fm: electricCost,
          fq: formatNumer(list?.electricCost / list?.activeElectricalEnergy, 5),
        };
        if (item === MeterParameters.jian) {
          columnData[0].push(column);
        }
        if (item === MeterParameters.feng) {
          columnData[1].push(column);
        }
        if (item === MeterParameters.gu) {
          columnData[2].push(column);
        }
        if (item === MeterParameters.ping) {
          columnData[3].push(column);
        }
        xAxisData.push(dateFormat);
      });
      //按照尖峰谷平的顺序
      if (item === MeterParameters.jian) {
        const sery = {
          name: '尖',
          type: 'bar',
          stack: 'total',
          smooth: true,
          barWidth: undefined,
          itemStyle: {
            color: colors[0],
          },
          data: dataList,
        };
        series['1'] = sery;
      }
      if (item === MeterParameters.feng) {
        const sery = {
          name: '峰',
          type: 'bar',
          stack: 'total',
          smooth: true,
          barWidth: undefined,
          itemStyle: {
            color: colors[1],
          },
          data: dataList,
        };
        series['2'] = sery;
      }
      if (item === MeterParameters.gu) {
        const sery = {
          name: '谷',
          type: 'bar',
          stack: 'total',
          smooth: true,
          barWidth: undefined,
          itemStyle: {
            color: colors[2],
          },
          data: dataList,
        };
        series['3'] = sery;
      }
      if (item === MeterParameters.ping) {
        const sery = {
          name: '平',
          type: 'bar',
          stack: 'total',
          smooth: true,
          barWidth: undefined,
          itemStyle: {
            color: colors[3],
          },
          data: dataList,
        };
        series['4'] = sery;
      }
      if (form.dateType === TimeType.Week || form.dateType === TimeType.Month) {
        barStaticChartData.xAxis.name = '日';
      } else {
        barStaticChartData.xAxis.name = '月';
      }
    });
    const newXaix = [...new Set(xAxisData)];
    const ckeys = Object.keys(series);
    const cSeries: any = [];

    ckeys.map((item) => {
      let newSery = series[item];
      if (series[item].data.length < 10) {
        newSery = { ...series[item], barWidth: 30 };
      }
      if (series[item].data.length < 5) {
        newSery = { ...series[item], barWidth: 50 };
      }
      cSeries.push(newSery);
    });

    barStaticChartData.series = cSeries;
    barStaticChartData.xAxis.data = newXaix;
    setBarchartData(Object.assign({}, barStaticChartData));
    const tempDataSource: any[] = [];
    newXaix.map((item: any, index: number) => {
      const column = {
        key: index,
        time:
          columnData[0][index]?.time ||
          columnData[1][index]?.time ||
          columnData[2][index]?.time ||
          columnData[3][index]?.time,
        fd: columnData[0][index]?.fd || 0,
        fm: columnData[0][index]?.fm || 0,
        fq: columnData[0][index]?.fq || 0,
        sd: columnData[1][index]?.fd || 0,
        sm: columnData[1][index]?.fm || 0,
        sq: columnData[1][index]?.fq || 0,
        td: columnData[2][index]?.fd || 0,
        tm: columnData[2][index]?.fm || 0,
        tq: columnData[2][index]?.fq || 0,
        fod: columnData[3][index]?.fd || 0,
        fom: columnData[3][index]?.fm || 0,
        foq: columnData[3][index]?.fq || 0,
        tod: 0,
        tom: 0,
      };
      column.tod = formatNumer(column.fd + column.sd + column.td + column.fod);
      column.tom = formatNumer(column.fm + column.sm + column.tm + column.fom);
      tempDataSource.push(column);
    });
    setDataSource(tempDataSource);
  };

  const formatSelectOption = (data: []) => {
    data.map((item: any) => {
      const label = item?.name;
      const value = parseInt(item?.id || '1');
      selectData.options.push({
        label,
        value,
      });
      if (item?.children && item?.children.length) {
        formatSelectOption(item?.children);
      }
    });
  };

  const onSelectChange = (value: any) => {
    setSelectData({
      value: value,
      options: selectData.options,
    });
  };

  const getElectricMultiRate = (reginIdList?: number[]) => {
    setForm((p) => {
      p.dBarLoading = 1;
      p.dPieLoading = 1;
      p.mPieLoading = 1;
    });
    //后端计算时间范围，只要初始时间是对的就行
    const queryStartDate = form.queryStartDate.format('YYYY-MM-DD');
    electricMultiRate({
      queryStartDate: queryStartDate,
      queryEndDate: queryStartDate,
      dateType: form.dateType,
      regionIdList: reginIdList || [selectData.value],
    }).then((res: any) => {
      setForm((p) => {
        p.dBarLoading = 0;
        p.dPieLoading = 0;
        p.mPieLoading = 0;
      });
      if (res?.meta?.code === 200) {
        if (!Object.keys(res?.data?.dataTotal || {})?.length) {
          setPieChartData({ electricity: undefined, money: undefined });
          setDataSource([]);
          setBarchartData(undefined);
          return;
        }
        formatResponseDataTotal(res?.data?.dataTotal || {});
        formatResponseDataList(res?.data?.dataList || {});
      }
    });
  };

  useEffect(() => {
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
        getElectricMultiRate([selectData.options[0].value]);
      }
    });
  }, []);

  return (
    <RateContainer>
      <RateOptionsContainer>
        <div className="left">
          <Select
            size="large"
            value={selectData.value}
            onChange={onSelectChange}
            style={{
              width: '220px',
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
          <Select
            size="large"
            value={form.dateType}
            style={{ width: 180 }}
            onChange={handleDateTypeChange}
          >
            {boardDayListnoDay.map((item) => (
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
            picker={
              (boardDayListnoDay[form.dateType - 2]?.type as any) || 'year'
            }
            disabledDate={(current) => {
              return current && current >= moment().endOf('day');
            }}
          />
          <Button
            size="large"
            type="primary"
            onClick={onClickSearch}
            className="submitBtn"
          >
            查询
          </Button>
        </div>
        <div className="right">
          <Button size="large" type="primary">
            导出
          </Button>
        </div>
      </RateOptionsContainer>
      <RateBodyContainer>
        <RateBodyLeftContainer>
          <h4>用电量</h4>
          <div className="rate-item-box">
            <MyChartBox
              id="rate-chart-box1"
              options={pieChartData.electricity}
              loading={form.dPieLoading}
            ></MyChartBox>
          </div>
          <h4>用电金额</h4>
          <div className="rate-item-box">
            <MyChartBox
              id="rate-chart-box2"
              options={pieChartData.money}
              loading={form.mPieLoading}
            ></MyChartBox>
          </div>
        </RateBodyLeftContainer>
        <RateBodyRightContainer>
          <RateBodyRightTopContainer>
            <MyChartBox
              id="enterprise-reate-bar"
              options={barChartData}
              loading={form.dBarLoading}
            ></MyChartBox>
          </RateBodyRightTopContainer>
          <RateBodyRightBottomContainer>
            {/* <Table size="middle" dataSource={dataSource} columns={columns} /> */}
            <Table
              dataSource={dataSource}
              rowKey="key"
              key="key"
              size="large"
              className="table"
              pagination={false}
              scroll={{ x: 1400, y: 500 }}
            >
              <Column
                title="时间"
                dataIndex="time"
                key="time"
                width={60}
                fixed="left"
              />
              <ColumnGroup title="尖">
                <Column title="电量" dataIndex="fd" key="firstName" />
                <Column
                  title="单价（元/kW.h)"
                  dataIndex="fq"
                  key="lastName"
                  width={130}
                />
                <Column title="金额(元)" dataIndex="fm" key="lastName" />
              </ColumnGroup>
              <ColumnGroup title="峰">
                <Column title="电量" dataIndex="sd" key="firstName" />
                <Column
                  title="单价（元/kW.h)"
                  dataIndex="sq"
                  key="lastName"
                  width={130}
                />
                <Column title="金额(元)" dataIndex="sm" key="lastName" />
              </ColumnGroup>
              <ColumnGroup title="谷">
                <Column title="电量" dataIndex="td" key="firstName" />
                <Column
                  title="单价（元/kW.h)"
                  dataIndex="tq"
                  key="lastName"
                  width={130}
                />
                <Column title="金额(元)" dataIndex="tm" key="lastName" />
              </ColumnGroup>
              <ColumnGroup title="平">
                <Column title="电量" dataIndex="fod" key="firstName" />
                <Column
                  title="单价（元/kW.h)"
                  dataIndex="foq"
                  key="lastName"
                  width={130}
                />
                <Column title="金额(元)" dataIndex="fom" key="lastName" />
              </ColumnGroup>
              <ColumnGroup title="合计">
                <Column
                  title="电量"
                  dataIndex="tod"
                  key="firstName"
                  fixed="right"
                />
                <Column
                  title="电费"
                  dataIndex="tom"
                  key="lastName"
                  fixed="right"
                />
              </ColumnGroup>
            </Table>
          </RateBodyRightBottomContainer>
        </RateBodyRightContainer>
      </RateBodyContainer>
    </RateContainer>
  );
};

export default RatePage;
