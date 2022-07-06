// 能源管理=>能耗看板
import { Select, Input, Tree, Tabs, DatePicker, Button, Checkbox } from 'antd';
import { SearchOutlined, CarryOutOutlined } from '@ant-design/icons';
import { RealContainer, RealOptionContainer, RealBodyContainer } from './style';
import MyChartBox from '@/components/myChartsBox';
import { barCartDataOptions } from './data';
import { dayTypeList, typeList } from '@/commonInterface';
import { useImmer } from 'use-immer';
import { useEffect, useState } from 'react';
import { energyConsumptionBulletinBoard } from '@/apis/energyMerge';
import { formatDate, formatNumer } from '@/utils/common';
import moment, { Moment } from 'moment';
const { Option } = Select;

interface chartProps {
  regionName: string;
  x: string;
  y: number;
}
const RealPage = () => {
  return (
    <RealContainer>
      <RealOption />
      <RealBodyOption />
    </RealContainer>
  );
};

const RealOption = () => {
  const [type, setType] = useState(1);
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
  const onSelect = (selectedKeys: React.Key[], info: any) => {
    console.log('selected', selectedKeys, info);
  };
  const handleChange = (e: number) => {
    setType(e);
  };
  return (
    <RealOptionContainer>
      <Select size="large" value={type} onChange={handleChange}>
        {typeList.map((item) => (
          <Option key={item.value} value={item.value}>
            {item.name}
          </Option>
        ))}
      </Select>
      <Input
        style={{ marginBottom: '20px' }}
        size="large"
        suffix={<SearchOutlined />}
        placeholder="线路名称"
      />
      <Checkbox>是否级联</Checkbox>
      <Checkbox>全选</Checkbox>
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
  });
  const [barChartData, setBarChartData] = useState(barCartDataOptions);
  const handleDateTypeChange = (val: any) => {
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
  const onClickSearch = () => {
    getBoardData();
  };

  const getBoardData = () => {
    energyConsumptionBulletinBoard({
      energyType: form.energyType,
      dateType: form.dateType,
      queryStartDate: '2022-04-01',
      queryEndDate: '2022-04-30',
    }).then((res: any) => {
      if (res?.meta?.code === 200) {
        const { xAxisData, seriesData } = formChartData(res?.data);
        barCartDataOptions.xAxis.data = xAxisData;
        barCartDataOptions.series[0].data = seriesData;
        setBarChartData(Object.assign({}, barCartDataOptions));
      }
    });
  };

  const formChartData = (data: chartProps[]) => {
    const xAxisData: string[] = [];
    const seriesData: number[] = [];
    data.map((item) => {
      xAxisData.push(item.regionName);
      seriesData.push(formatNumer(item.y));
    });
    return {
      xAxisData,
      seriesData,
    };
  };

  useEffect(() => {
    getBoardData();
  }, []);
  return (
    <RealBodyContainer>
      <div className="search-box">
        <Select
          size="large"
          value={form.dateType}
          style={{ width: 120 }}
          onChange={handleDateTypeChange}
        >
          {dayTypeList.map((item) => (
            <Option key={item.value} value={item.value}>
              {item.name}
            </Option>
          ))}
        </Select>
        <DatePicker
          size="large"
          onChange={handleQueryStartDateChange}
          allowClear
          disabledDate={(current) => {
            return current && current >= moment().endOf('day');
          }}
        />
        <Button size="large" type="primary" onClick={onClickSearch}>
          查询
        </Button>
      </div>
      <div className="echart-box">
        <MyChartBox id="barChart" options={barChartData}></MyChartBox>
      </div>
    </RealBodyContainer>
  );
};

export default RealPage;
