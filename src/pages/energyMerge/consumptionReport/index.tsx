// 能源管理=>用能报表
import { Select, Input, Tree, Tabs, DatePicker, Button, Table } from 'antd';
import { SearchOutlined, CarryOutOutlined } from '@ant-design/icons';
import { RealContainer, RealOptionContainer, RealBodyContainer } from './style';
const { Option } = Select;
import { useEffect, useState } from 'react';
import { boardDayList, typeList } from '@/commonInterface';
import { formatDate } from '@/utils/common';
import moment, { Moment } from 'moment';
import { useImmer } from 'use-immer';
import { energyElectricselectList } from '@/apis/energyMerge';
import { dayColumns } from './data';

const RealPage = () => {
  return (
    <RealContainer>
      <RealOption />
      <RealBodyOption />
    </RealContainer>
  );
};

const treeData = [
  {
    title: '1AA',
    key: '0-0',
    icon: <CarryOutOutlined />,
    children: [
      {
        title: '北厂区0101',
        key: '0-0-0',
        icon: <CarryOutOutlined />,
        children: [{ title: '站点1', key: '0-0-0-0' }],
      },
      {
        title: '南长区1901',
        key: '0-0-1',
        icon: <CarryOutOutlined />,
        children: [
          { title: '站点1', key: '0-0-1-0', icon: <CarryOutOutlined /> },
        ],
      },
      {
        title: '北厂区0101',
        key: '0-0-2',
        icon: <CarryOutOutlined />,
        children: [
          { title: '站点1', key: '0-0-2-0', icon: <CarryOutOutlined /> },
          {
            title: '站点2',
            key: '0-0-2-1',
            icon: <CarryOutOutlined />,
          },
        ],
      },
    ],
  },
];
const RealOption = () => {
  const onSelect = (selectedKeys: React.Key[], info: any) => {
    console.log('selected', selectedKeys, info);
  };
  return (
    <RealOptionContainer>
      <Select size="large" defaultValue="电" onChange={() => {}}>
        <Option value="电">电</Option>
        <Option value="水">水</Option>
        <Option value="蒸汽">蒸汽</Option>
        <Option value="空气">空气</Option>
        <Option value="氮气">氮气</Option>
        <Option value="天然气">天然气</Option>
      </Select>
      <Input size="large" suffix={<SearchOutlined />} placeholder="节点名称" />
      <Tree
        showLine={true}
        showIcon={false}
        defaultExpandedKeys={['0-0-0']}
        onSelect={onSelect}
        treeData={treeData}
      />
    </RealOptionContainer>
  );
};

const RealBodyOption = () => {
  const [form, setForm] = useImmer({
    energyType: 1,
    dateType: 1,
    queryStartDate: formatDate(),
    dataSource: [],
  });
  const handleDateTypeChange = (val: any) => {
    console.log(val);
    setForm((p) => {
      p.dateType = val;
    });
  };
  const handleQueryStartDateChange = (val: any) => {
    if (!val) {
      setForm((p) => {
        p.queryStartDate = formatDate();
      });
      return;
    }
    const m = val as Moment;
    const cdate = `${m.year()}-${m.month() + 1}-${m.date()}`;
    setForm((p) => {
      p.queryStartDate = cdate;
    });
  };
  const onClickSearch = () => {};

  const getDatasource = () => {
    energyElectricselectList({
      queryStartDate: '2022-03-15 00:00:00',
      queryEndDate: '2022-03-15 12:23:23',
      regionIdList: [1, 2],
      current: 1,
      size: 30,
    }).then((res: any) => {
      if (res?.meta?.code === 200) {
        setForm((p) => {
          console.log(res.data.list);
          p.dataSource = res?.data?.list;
        });
      }
    });
  };

  useEffect(() => {
    getDatasource();
  }, []);
  return (
    <RealBodyContainer>
      <div className="options-box">
        <div className="search-box">
          <Select
            size="large"
            value={form.dateType}
            style={{ width: 120 }}
            onChange={handleDateTypeChange}
          >
            {boardDayList.map((item) => (
              <Option key={item.value} value={item.value}>
                {item.name}
              </Option>
            ))}
          </Select>
          <DatePicker
            size="large"
            onChange={handleQueryStartDateChange}
            allowClear
            picker={(boardDayList[form.dateType - 1]?.type as any) || 'year'}
            disabledDate={(current) => {
              return current && current >= moment().endOf('day');
            }}
          />
          <Button size="large" type="primary" onClick={onClickSearch}>
            查询
          </Button>
        </div>
      </div>
      <div className="table-box">
        <Table
          size="small"
          rowKey="A"
          key="A"
          pagination={{ pageSize: 20 }}
          dataSource={form.dataSource}
          columns={dayColumns(typeList[form.energyType - 1].unit)}
        />
      </div>
    </RealBodyContainer>
  );
};

export default RealPage;
