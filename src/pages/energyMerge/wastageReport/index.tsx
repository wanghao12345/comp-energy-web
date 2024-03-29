import { Select, DatePicker, Button, Table } from 'antd';
const { Option } = Select;
const { RangePicker } = DatePicker;
import { Page } from './style';
import { columns } from './data';
import { useEffect, useState } from 'react';
import { selectEnergyLossByRegion } from '@/apis/energyMerge';
import { useImmer } from 'use-immer';
import moment from 'moment';
import { formatDate, formatNumer } from '@/utils/common';
import { EnergyTypeList } from '@/commonInterface';

export default () => {
  const [tableData, setTableData] = useImmer<any[]>([]);
  const [optionValue, setOptionValue] = useState(1);
  const onChangeOption = (option: string) => {
    setOptionValue(parseInt(option));
  };
  const [loading, setLoading] = useState(true);
  const [rangePickerValue, setrangePickerValue] = useState<any>([
    moment(),
    moment(),
  ]);
  const onChangeRangePick = (range: any) => {
    setrangePickerValue(range);
  };
  const formatTableData = (data: any) => {
    data.map((item: any) => {
      if (item.lossValueChildren) {
        item.Rate =
          formatNumer(item.lossValueDifference / item.lossValue) * 100 + '%';
      } else {
        item.Rate = '-';
      }
      if (item.children && item.children?.length) {
        formatTableData(item.children);
      } else {
        delete item.children;
      }
    });
  };

  const formatTableDataSecond = (data: any) => {
    data.map((item: any, index: number) => {
      item.CZ = item.current - item.lowTotal;
      if (item.children && item.children?.length) {
        item.key = index + Math.random();
        item.Rate = formatNumer((item.CZ / item.current) * 100) + '%';
        item.children.map((tt: any) => {
          formatTableDataSecond(item.children);
        });
      } else {
        delete item.children;
        item.Rate = '-';
      }
    });
  };

  const onSearchClick = () => {
    getResponseData(optionValue, rangePickerValue);
  };

  const getResponseData = (optionValue: number, dataRange: any) => {
    const qs = formatDate(dataRange[0].toDate());
    const qe = formatDate(dataRange[1].toDate());
    selectEnergyLossByRegion({
      energyType: optionValue,
      queryStartDate: qs,
      queryEndDate: qe,
    }).then((res) => {
      if (res.meta?.code === 200) {
        const data = res.data;

        formatTableData(data);
        // formatTableDataSecond(data);
        setTableData(data);
        setLoading(false);
      }
    });
  };

  useEffect(() => {
    getResponseData(optionValue, rangePickerValue);
  }, []);
  return (
    <Page>
      <div className="search-box">
        <Select
          size="large"
          defaultValue={optionValue as any}
          onChange={onChangeOption}
          style={{
            width: '320px',
          }}
        >
          {EnergyTypeList.map((item) => (
            <Option key={item.value} value={item.value}>
              {item.name}
            </Option>
          ))}
        </Select>
        <RangePicker
          size="large"
          value={rangePickerValue}
          onChange={onChangeRangePick}
          allowClear={false}
          disabledDate={(current) => {
            return current && current >= moment().endOf('day');
          }}
        />
        <Button size="large" type="primary" onClick={onSearchClick}>
          查询
        </Button>
      </div>
      <Table
        rowKey="key"
        key="key"
        pagination={false}
        columns={columns}
        dataSource={tableData}
        loading={loading}
        size="large"
        scroll={{ y: Math.max(window.screen.height - 390, 500), x: 500 }}
      />
    </Page>
  );
};
