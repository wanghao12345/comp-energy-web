import { Select, DatePicker, Button, Table } from 'antd';
const { Option } = Select;
const { RangePicker } = DatePicker;
import { Page } from './style';
import { columns, data } from './data';
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
        pagination={false}
        columns={columns}
        dataSource={data}
        // rowSelection={{ ...rowSelection }}
      />
    </Page>
  );
};
