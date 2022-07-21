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

const { Option } = Select;
const { Column, ColumnGroup } = Table;
const RatePage = () => {
  const [form, setForm] = useImmer({
    dateType: TimeType.Week,
    queryStartDate: new Date(),
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
      p.queryStartDate = m.toDate();
    });
  };

  const onClickSearch = () => {
    getElectricMultiRate();
  };

  const formatResponseDataTotal = (data: any) => {
    const keys = Object.keys(data);
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
      }
      if (item === MeterParameters.feng) {
        mySeries.feng = formatNumer(data[item]?.activeElectricalEnergy || 0);
        mySeries.fengCost = formatNumer(data[item]?.electricCost || 0);
      }
      if (item === MeterParameters.ping) {
        mySeries.ping = formatNumer(data[item]?.activeElectricalEnergy || 0);
        mySeries.pingCost = formatNumer(data[item]?.electricCost || 0);
      }
      if (item === MeterParameters.gu) {
        mySeries.gu = formatNumer(data[item]?.activeElectricalEnergy || 0);
        mySeries.guCost = formatNumer(data[item]?.electricCost || 0);
      }
    });

    circleChart.series[0].data = [
      {
        value: mySeries.jian,
        name: '尖',
        itemStyle: {
          color: '#D65050',
        },
      },
      {
        value: mySeries.feng,
        name: '峰',
        itemStyle: {
          color: '#E7804A',
        },
      },
      {
        value: mySeries.ping,
        name: '平',
        itemStyle: {
          color: '#1B81FB',
        },
      },
      {
        value: mySeries.gu,
        name: '谷',
        itemStyle: {
          color: '#3B57A2',
        },
      },
    ];

    circleChart1.series[0].data = [
      {
        value: mySeries.jianCost,
        name: '尖',
        itemStyle: {
          color: '#D65050',
        },
      },
      {
        value: mySeries.fengCost,
        name: '峰',
        itemStyle: {
          color: '#E7804A',
        },
      },
      {
        value: mySeries.pingCost,
        name: '平',
        itemStyle: {
          color: '#1B81FB',
        },
      },
      {
        value: mySeries.guCost,
        name: '谷',
        itemStyle: {
          color: '#3B57A2',
        },
      },
    ];

    setPieChartData({
      electricity: Object.assign({}, circleChart),
      money: Object.assign({}, circleChart1),
    });
  };

  const formatResponseDataList = (data: any) => {
    const columnData: any[] = [[], [], [], []];
    const xAxisData: any[] = [];
    const keys = Object.keys(data);
    if (!keys.length) {
      return;
    }
    keys.map((item, index) => {
      const dataList: any[] = [];
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
        columnData[index].push(column);
        xAxisData.push(dateFormat);
      });
      //按照尖峰平谷的顺序
      if (item === MeterParameters.jian) {
        barStaticChartData.series[0].data = dataList;
        if (
          form.dateType === TimeType.Week ||
          form.dateType === TimeType.Month
        ) {
          barStaticChartData.xAxis.name = '日';
        } else {
          barStaticChartData.xAxis.name = '月';
        }
      }
      if (item === MeterParameters.feng) {
        barStaticChartData.series[1].data = dataList;
        if (
          form.dateType === TimeType.Week ||
          form.dateType === TimeType.Month
        ) {
          barStaticChartData.xAxis.name = '日';
        } else {
          barStaticChartData.xAxis.name = '月';
        }
      }
      if (item === MeterParameters.ping) {
        barStaticChartData.series[2].data = dataList;
        if (
          form.dateType === TimeType.Week ||
          form.dateType === TimeType.Month
        ) {
          barStaticChartData.xAxis.name = '日';
        } else {
          barStaticChartData.xAxis.name = '月';
        }
      }
      if (item === MeterParameters.gu) {
        barStaticChartData.series[3].data = dataList;
        if (
          form.dateType === TimeType.Week ||
          form.dateType === TimeType.Month
        ) {
          barStaticChartData.xAxis.name = '日';
        } else {
          barStaticChartData.xAxis.name = '月';
        }
      }
      if (dataList.length > 10) {
        barStaticChartData.series[0]['barWidth'] = undefined;
      } else {
        barStaticChartData.series[0]['barWidth'] = 40;
      }
    });
    barStaticChartData.xAxis.data = [...new Set(xAxisData)];
    setBarchartData(Object.assign({}, barStaticChartData));
    const tempDataSource: any[] = [];
    columnData[0].map((item: any, index: number) => {
      const column = {
        key: index,
        time: columnData[0][index].time,
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
    const { queryStartDate, queryEndDate } = formatTime(
      form.queryStartDate,
      form.dateType,
    );
    electricMultiRate({
      queryStartDate: queryStartDate.split(' ')[0],
      queryEndDate: queryEndDate.split(' ')[0],
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
              width: '280px',
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
          <div className="rate-item-box">
            <h4>用电量</h4>
            <MyChartBox
              id="rate-chart-box1"
              options={pieChartData.electricity}
              loading={form.dPieLoading}
            ></MyChartBox>
          </div>
          <div className="rate-item-box">
            <h4>用电金额</h4>
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
              size="small"
              className="table"
              pagination={{ pageSize: 10 }}
              scroll={{ x: 1400 }}
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
