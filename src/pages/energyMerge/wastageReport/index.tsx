import { Select, DatePicker, Button, Table } from 'antd';
const { Option } = Select;
const { RangePicker } = DatePicker;
import { Page } from './style';
import { columns, data } from './data';
import { useEffect, useState } from 'react';
import { selectEnergyLossByRegion } from '@/apis/energyMerge';
import { useImmer } from 'use-immer';
import moment, { Moment } from 'moment';
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
  const [onOpationValue, setOptionValue] = useState('电流');
  const onChangeOption = (option: string) => {
    setOptionValue(option);
  };
  const [rangePickerValue, setrangePickerValue] = useState([
    moment(),
    moment(),
  ]);
  const onChangeRangePick = (range: Moment[]) => {
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
  useEffect(() => {
    selectEnergyLossByRegion({
      energyType: 1,
      queryStartDate: '2022-03-15',
      queryEndDate: '2022-03-15',
      regionIdList: [1, 2, 3],
    }).then((res) => {
      if (res.meta?.code === 200) {
        console.log(res.data);
        setTableData(formatTableData(res.data));
      }
    });
  }, []);
  return (
    <Page>
      <div className="search-box">
        <Select
          size="large"
          defaultValue={onOpationValue}
          onChange={onChangeOption}
          style={{
            width: '320px',
          }}
        >
          <Option value="电流">电流</Option>
          <Option value="电压">电压</Option>
          <Option value="功率因素">功率因素</Option>
          <Option value="有功功率">有功功率</Option>
          <Option value="频率">频率</Option>
          <Option value="有功电能">有功电能</Option>
        </Select>
        <RangePicker
          size="large"
          value={rangePickerValue}
          onChange={onChangeRangePick}
          disabledDate={(current) => {
            return current && current >= moment().endOf('day');
          }}
        />
        <Button size="large" type="primary">
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
