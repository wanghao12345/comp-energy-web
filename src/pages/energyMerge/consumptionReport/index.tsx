// 能源管理=>用能报表
import { Select, DatePicker, Button, Table } from 'antd';
import { RealBodyContainer } from './style';
const { Option } = Select;
import { useContext, useEffect } from 'react';
import { boardDayList, typeList } from '@/commonInterface';
import { formatDate, getWeek } from '@/utils/common';
import moment, { Moment } from 'moment';
import { useImmer } from 'use-immer';
import { energyElectricselectList } from '@/apis/energyMerge';
import MyTemplate, { TemplateContext } from '@/components/myTemplate';

const RealPage = () => {
  return (
    <MyTemplate isShowCheckBox={true}>
      <RealBodyOption></RealBodyOption>
    </MyTemplate>
  );
};

const RealBodyOption = () => {
  const templateProps = useContext(TemplateContext);
  const [form, setForm] = useImmer({
    energyType: 1,
    dateType: 1,
    queryStartDate: formatDate(),
    dataSource: [],
    columns: [],
  });
  const handleDateTypeChange = (val: any) => {
    setForm((p) => {
      p.dateType = val;
    });
  };
  const handleQueryStartDateChange = (val: Moment) => {
    console.log(getWeek(val.toDate()));
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
      regionIdList: templateProps.area,
      energyType: templateProps.energyType,
      dateType: form.dateType,
    }).then((res: any) => {
      if (res?.meta?.code === 200) {
        const dataSource = res.data;
        formatTableData(dataSource);
        const columns = formatTableColumns(res?.data[0]?.queryDataList);
        setForm((p) => {
          p.dataSource = dataSource;
          p.columns = columns as any;
        });
      }
    });
  };

  const formatTableColumns = (data: any | undefined) => {
    if (!data) {
      return [];
    }
    const unit = typeList[templateProps.energyType - 1].unit;
    const columns = [
      {
        title: '节点名称',
        dataIndex: 'name',
      },
    ];

    data.map((item: any, index: number) => {
      let qz = index.toString();
      const column = { title: '', dataIndex: '' };
      if (index < 10) {
        qz = '0' + index;
      }
      column.title = `${qz}时（${unit}）`;
      column.dataIndex = `time${index}`;
      columns.push(column);
    });
    return columns;
  };

  const formatTableData = (data: any) => {
    data.map((item: any) => {
      item?.queryDataList.map((list: any, index: number) => {
        item[`time${index}`] = list?.flow;
      });
      if (item?.children && item?.children.length) {
        formatTableData(item.children);
      } else {
        delete item.children;
      }
    });
  };

  useEffect(() => {
    getDatasource();
  }, [templateProps.energyType, templateProps.area]);
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
            defaultValue={moment()}
            allowClear={false}
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
      <div className="tabWrapper">
        <div className="table-box">
          <Table
            size="small"
            rowKey="A"
            key="A"
            pagination={{ pageSize: 20 }}
            dataSource={form.dataSource}
            columns={form.columns}
          />
        </div>
      </div>
    </RealBodyContainer>
  );
};

export default RealPage;
