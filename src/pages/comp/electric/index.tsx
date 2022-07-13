import { Tabs, DatePicker, Button, Table, TimePicker } from 'antd';
import moment from 'moment';
import { RealBodyContainer } from './style';
import MyTemplate from '@/components/myTemplate';

const RealPage = () => {
  return (
    <MyTemplate isShowCheckBox={true}>
      <RealBodyOption />
    </MyTemplate>
  );
};

const RealBodyOption = () => {
  const dataSource = [
    {
      key: '1',
      name: '胡彦斌',
      age: 32,
      address: '西湖区湖底公园1号',
    },
    {
      key: '2',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号',
    },
  ];

  const columns = [
    {
      title: '采集时间',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Ia（A） ',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Ib（A）',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Ic（A）',
      dataIndex: 'age',
      key: 'age',
    },
  ];
  const onChange = (key: string) => {
    console.log(key);
  };
  return (
    <RealBodyContainer>
      <div className="options-box">
        <div className="search-box">
          <DatePicker size="large" onChange={() => {}} allowClear={false} />
          <TimePicker
            size="large"
            defaultValue={moment('12:08', 'HH:mm')}
            format={'HH:mm'}
          />
          <Button size="large" type="primary">
            查询
          </Button>
        </div>
      </div>
      <div className="table-box">
        <Table size="middle" dataSource={dataSource} columns={columns} />
      </div>
    </RealBodyContainer>
  );
};

export default RealPage;
