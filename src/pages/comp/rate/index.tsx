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
import { boardDayListnoDay } from '@/commonInterface';
import moment, { Moment } from 'moment';
import { useImmer } from 'use-immer';
import { getRegionTreeList } from '@/apis';
import { formatNumer, formatTime } from '@/utils/common';

const { Option } = Select;
const { Column, ColumnGroup } = Table;
const RatePage = () => {
  const [form, setForm] = useImmer({
    dateType: 2,
    queryStartDate: new Date(),
  });
  const [pieChartData, setPieChartData] = useState({
    electricity: circleChart,
    money: circleChart1,
  });

  const [barChartData, setBarchartData] = useState(barStaticChartData);
  const [selectData, setSelectData] = useState<any>({
    value: { label: '站点', value: 1 },
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
    keys.map((item, index) => {
      pieChartData.electricity.series[0].data[index].value =
        data[item]?.activeElectricalEnergy;
      pieChartData.money.series[0].data[index].value = data[item]?.electricCost;
    });
    setPieChartData({
      electricity: Object.assign({}, pieChartData.electricity),
      money: Object.assign({}, pieChartData.money),
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
        xAxisData.push(list?.statisticsDate);
        dataList.push(list?.activeElectricalEnergy);
        const column = {
          time: list?.statisticsDate,
          fd: list?.activeElectricalEnergy,
          fm: list?.electricCost,
          fq: formatNumer(list?.electricCost / list?.activeElectricalEnergy),
        };
        columnData[index].push(column);
      });
      barChartData.series[index].data = dataList;
    });
    barChartData.xAxis.data = [...new Set(xAxisData)];
    setBarchartData(Object.assign({}, barChartData));
    const tempDataSource: any[] = [];
    columnData[0].map((item: any, index: number) => {
      const column = {
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
      column.tod = column.fd + column.sd + column.td + column.fod;
      column.tom = column.fm + column.sm + column.tm + column.fom;
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
    const { queryStartDate, queryEndDate } = formatTime(
      form.queryStartDate,
      form.dateType,
    );
    electricMultiRate({
      queryStartDate: queryStartDate.split(' ')[0],
      queryEndDate: queryEndDate.split(' ')[0],
      dateType: form.dateType,
      regionIdList: reginIdList || [selectData.value?.value],
    }).then((res: any) => {
      if (res?.meta?.code === 200) {
        console.log(res?.data);
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
              value: selectData.options[0],
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
              width: '320px',
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
            style={{ width: 120 }}
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
            ></MyChartBox>
          </div>
          <div className="rate-item-box">
            <h4>用电金额</h4>
            <MyChartBox
              id="rate-chart-box2"
              options={pieChartData.money}
            ></MyChartBox>
          </div>
        </RateBodyLeftContainer>
        <RateBodyRightContainer>
          <RateBodyRightTopContainer>
            <MyChartBox
              id="enterprise-reate-bar"
              options={barChartData}
            ></MyChartBox>
          </RateBodyRightTopContainer>
          <RateBodyRightBottomContainer>
            {/* <Table size="middle" dataSource={dataSource} columns={columns} /> */}
            <Table
              dataSource={dataSource}
              rowKey="time"
              key="time"
              size="small"
              className="table"
            >
              <Column title="时间" dataIndex="time" key="time" width={110} />
              <ColumnGroup title="尖">
                <Column title="电量" dataIndex="fd" key="firstName" />
                <Column title="单价（元/kW.h)" dataIndex="fq" key="lastName" />
                <Column title="金额(元)" dataIndex="fm" key="lastName" />
              </ColumnGroup>
              <ColumnGroup title="峰">
                <Column title="电量" dataIndex="sd" key="firstName" />
                <Column
                  title="单价（元/kW.h)"
                  dataIndex="sq"
                  key="lastName"
                  width={120}
                />
                <Column title="金额(元)" dataIndex="sm" key="lastName" />
              </ColumnGroup>
              <ColumnGroup title="谷">
                <Column title="电量" dataIndex="td" key="firstName" />
                <Column
                  title="单价（元/kW.h)"
                  dataIndex="tq"
                  key="lastName"
                  width={120}
                />
                <Column title="金额(元)" dataIndex="tm" key="lastName" />
              </ColumnGroup>
              <ColumnGroup title="平">
                <Column title="电量" dataIndex="fod" key="firstName" />
                <Column
                  title="单价（元/kW.h)"
                  dataIndex="foq"
                  key="lastName"
                  width={120}
                />
                <Column title="金额(元)" dataIndex="fom" key="lastName" />
              </ColumnGroup>
              <ColumnGroup title="合计">
                <Column title="电量" dataIndex="tod" key="firstName" />
                <Column title="电费" dataIndex="tom" key="lastName" />
              </ColumnGroup>
            </Table>
          </RateBodyRightBottomContainer>
        </RateBodyRightContainer>
      </RateBodyContainer>
    </RateContainer>
  );
};

export default RatePage;
