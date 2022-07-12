// 能源管理=>用能报表
import { Select, DatePicker, Button, Table } from 'antd';
import { RealBodyContainer } from './style';
const { Option } = Select;
import { useContext, useEffect } from 'react';
import { boardDayList, typeList } from '@/commonInterface';
import { formatDate, formatTime, getWeek } from '@/utils/common';
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
    queryStartDate: new Date(),
    dataSource: [],
    columns: [],
  });
  const handleDateTypeChange = (val: any) => {
    setForm((p) => {
      p.dateType = val;
    });
  };
  const handleQueryStartDateChange = (val: any) => {
    const m = val as Moment;
    setForm((p) => {
      p.queryStartDate = m.toDate();
    });
  };
  const onClickSearch = () => {
    getDatasource();
  };

  const getDatasource = () => {
    const { queryStartDate, queryEndDate } = formatTime(
      form.queryStartDate,
      form.dateType,
    );
    energyElectricselectList({
      queryStartDate: queryStartDate,
      queryEndDate: queryEndDate,
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
        className: 'tableColWidth',
      },
    ];

    data.map((item: any, index: number) => {
      const qz = formatColumnTitle(item?.createDate || '2022-03-13 23:59:59');
      const column = { title: '', dataIndex: '', className: '' };
      column.title = `${qz}（${unit}）`;
      column.dataIndex = `time${index}`;
      column.className = 'columnWidth';
      columns.push(column);
    });
    return columns;
  };

  const formatColumnTitle = (item: string) => {
    let qz = item;
    if (form.dateType === 1) {
      qz = qz.split(' ')[1].split(':')[0] + '时';
    }
    if (form.dateType === 2) {
      qz =
        qz.split(' ')[0].split('-')[1] + '-' + qz.split(' ')[0].split('-')[2];
    }
    if (form.dateType === 3) {
      qz = qz.split(' ')[0].split('-')[2];
    }
    if (form.dateType === 4) {
      qz = qz.split(' ')[0].split('-')[1] + '月';
    }

    if (form.dateType === 6) {
      qz = qz.split(' ')[0].split('-')[0] + '月';
    }
    return qz;
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
            pagination={false}
            dataSource={form.dataSource}
            columns={form.columns}
          />
        </div>
      </div>
    </RealBodyContainer>
  );
};

export default RealPage;
