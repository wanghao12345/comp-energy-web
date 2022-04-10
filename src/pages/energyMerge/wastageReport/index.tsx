import { Select, DatePicker, Button, Table } from 'antd';
const { Option } = Select;
const { RangePicker } = DatePicker;
import { Page } from './style';
import { columns } from './data';
import { useEffect } from 'react';
import { selectEnergyLossByRegion } from '@/apis/energyMerge';
import { useImmer } from 'use-immer';
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
  const [tableData, setTableData] = useImmer([]);
  useEffect(() => {
    selectEnergyLossByRegion({
      energyType: 1,
      queryStartDate: '2022-03-15',
      queryEndDate: '2022-03-15',
    }).then((res) => {
      console.log(res);
      if (res.meta.code === 200) {
        console.log(res.data);
        setTableData(() => res.data);
      }
    });
  }, []);
  return (
    <Page>
      <div className="search-box">
        <Select
          size="large"
          defaultValue="电流"
          onChange={() => {}}
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
        <RangePicker size="large" />
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
