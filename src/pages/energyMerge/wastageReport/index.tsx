import { Select, DatePicker, Button, Table } from 'antd';
const { Option } = Select;
const { RangePicker } = DatePicker;
import { Page } from './style';
import { columns, data } from './data';
import { useEffect, useState } from 'react';
import { selectEnergyLossByRegion } from '@/apis/energyMerge';
import { useImmer } from 'use-immer';
import moment, { Moment } from 'moment';
import { formatDate, formatNumer } from '@/utils/common';
import { typeList } from '@/commonInterface';
// const rowSelection = {
//   onChange: (selectedRowKeys, selectedRows) => {
//     console.log(
//       `selectedRowKeys: ${selectedRowKeys}`,
//       'selectedRows: ',
//       selectedRows,
//     );
//   },
//   onSelect: (record, selected, selectedRows) => {
//     console.log(record, selected, selectedRows);
//   },
//   onSelectAll: (selected, selectedRows, changeRows) => {
//     console.log(selected, selectedRows, changeRows);
//   },
// };

export default () => {
  const [tableData, setTableData] = useImmer<any[]>([]);
  const [optionValue, setOptionValue] = useState(1);
  const onChangeOption = (option: string) => {
    setOptionValue(parseInt(option));
  };
  const [rangePickerValue, setrangePickerValue] = useState<any>([
    moment(),
    moment(),
  ]);
  const onChangeRangePick = (range: any) => {
    setrangePickerValue(range);
  };
  const formatTableData = (data: any) => {
    data.map((item: any) => {
      item.lowTotal = 0;
      if (item.children && item.children?.length) {
        item.children.map((tt: any) => {
          item.current += tt.current;
          item.lowTotal += tt.current;
          formatTableData(item.children);
        });
      } else {
        delete item.children;
      }
    });
  };

  const formatTableDataSecond = (data: any) => {
    data.map((item: any) => {
      item.CZ = item.current - item.lowTotal;
      if (item.children && item.children?.length) {
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
    getResponseData(optionValue, rangePickerValue, [1, 2, 3]);
  };

  const getResponseData = (
    optionValue: number,
    dataRange: any,
    regionIdList: number[],
  ) => {
    const qs = formatDate(dataRange[0].toDate());
    const qe = formatDate(dataRange[1].toDate());
    console.log(qs, qe);
    selectEnergyLossByRegion({
      energyType: optionValue,
      queryStartDate: qs,
      queryEndDate: qe,
      regionIdList: regionIdList,
    }).then((res) => {
      if (res.meta?.code === 200) {
        const data = res.data;
        formatTableData(data);
        formatTableDataSecond(data);
        setTableData(data);
        console.log(data);
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
          defaultValue={optionValue as any}
          onChange={onChangeOption}
          style={{
            width: '320px',
          }}
        >
          {typeList.map((item) => (
            <Option key={item.value} value={item.value}>
              {item.name}
            </Option>
          ))}
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
