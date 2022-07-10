import { Select, DatePicker, Button, Table } from 'antd';
const { Option } = Select;
const { RangePicker } = DatePicker;
import { Page } from './style';
import { columns, data } from './data';
import { useEffect, useState } from 'react';
import { selectEnergyLossByRegion } from '@/apis/energyMerge';
import { useImmer } from 'use-immer';
import moment, { Moment } from 'moment';
import { formatDate } from '@/utils/common';
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      'selectedRows: ',
      selectedRows,
    );
  },
  onSelect: (record, selected, selectedRows) => {
    console.log(record, selected, selectedRows);
  },
  onSelectAll: (selected, selectedRows, changeRows) => {
    console.log(selected, selectedRows, changeRows);
  },
};

export default () => {
  const [tableData, setTableData] = useImmer<any[]>([]);
  const [optionValue, setOptionValue] = useState('1');
  const onChangeOption = (option: string) => {
    setOptionValue(option);
  };
  const [rangePickerValue, setrangePickerValue] = useState<any>([
    moment(),
    moment(),
  ]);
  const onChangeRangePick = (range: any) => {
    setrangePickerValue(range);
  };
  const formatTableData = (data: any) => {
    const columns: any[] = [];
    data.map((item: any) => {
      let column = {
        name: item.name,
        current: item.statEnergyLoss?.value,
        C: item.statEnergyLoss?.valueChildren,
        D: item.statEnergyLoss?.valueDifference,
        E:
          (item.statEnergyLoss?.valueDifference / item.statEnergyLoss?.value) *
            100 +
          '%',
      };
      if (item.children?.length) {
        console.log(item.children);
        column = Object.assign({ children: item.children }, column);
      }
      columns.push(column);
    });
    return columns;
  };
  const onSearchClick = () => {
    getResponseData(optionValue, rangePickerValue, [1, 2, 3]);
  };

  const getResponseData = (
    optionValue: string,
    dataRange: any,
    regionIdList: number[],
  ) => {
    const qs = formatDate(dataRange[0].toDate());
    const qe = formatDate(dataRange[1].toDate());
    console.log(qs, qe);
    selectEnergyLossByRegion({
      energyType: parseInt(optionValue),
      queryStartDate: qs,
      queryEndDate: qe,
      regionIdList: regionIdList,
    }).then((res) => {
      if (res.meta?.code === 200) {
        console.log(res.data);
        setTableData(formatTableData(res.data));
      }
    });
  };

  useEffect(() => {
    getResponseData(optionValue, rangePickerValue, [1, 2, 3]);
  }, []);
  return (
    <Page>
      <div className="search-box">
        <Select
          size="large"
          defaultValue={optionValue}
          onChange={onChangeOption}
          style={{
            width: '320px',
          }}
        >
          <Option value="1">电流</Option>
          <Option value="2">电压</Option>
          <Option value="3">功率因素</Option>
          <Option value="4">有功功率</Option>
          <Option value="5">频率</Option>
          <Option value="6">有功电能</Option>
        </Select>
        <RangePicker
          size="large"
          value={rangePickerValue}
          onChange={onChangeRangePick}
          disabledDate={(current) => {
            return current && current >= moment().endOf('day');
          }}
        />
        <Button size="large" type="primary" onClick={onSearchClick}>
          查询
        </Button>
      </div>
      <Table
        rowKey="id"
        pagination={false}
        columns={columns}
        dataSource={tableData}
        // rowSelection={{ ...rowSelection }}
      />
    </Page>
  );
};
