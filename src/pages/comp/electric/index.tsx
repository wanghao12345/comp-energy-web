import {
  DatePicker,
  Button,
  Table,
  TimePicker,
  TablePaginationConfig,
} from 'antd';
import moment, { Moment } from 'moment';
import { RealBodyContainer } from './style';
import MyTemplate, { TemplateContext } from '@/components/myTemplate';
import { useContext, useEffect, useState } from 'react';
import { getEnergyElectricData } from '@/apis/baseinfo';
import { columns, columnsOther } from './data';
const { RangePicker } = DatePicker;
const RealPage = () => {
  return (
    <MyTemplate isShowCheckBox={true}>
      <RealBodyOption />
    </MyTemplate>
  );
};

const RealBodyOption = () => {
  const templateProps = useContext(TemplateContext);
  const [rangePickerValue, setrangePickerValue] = useState<any>([
    moment(),
    moment(),
  ]);
  const [timePicker, setTimePicker] = useState(moment());
  const [dataSource, setDataSource] = useState<any>([]);
  const [pagination, setPagintion] = useState({
    total: 0,
    current: 1,
    size: 15,
  });
  const [loading, setLoading] = useState(true);
  const onChangeRangePick = (range: any) => {
    console.log(range);
    setrangePickerValue(range);
  };

  const onChangeTime = (val: moment.Moment | null) => {
    setTimePicker(val || moment());
  };

  const onClickSearch = () => {
    getTableSourceData();
  };
  const getTableSourceData = () => {
    setLoading(true);
    const queryStartDate =
      (rangePickerValue[0] as Moment).format('YYYY-MM-DD') + ' ' + '00:00:00';
    const queryEndDate =
      (rangePickerValue[1] as Moment).format('YYYY-MM-DD') +
      ' ' +
      timePicker.format('HH:mm') +
      ':00';
    getEnergyElectricData({
      type: templateProps.energyType,
      regionIdList: templateProps.area,
      current: pagination.current,
      size: pagination.size,
      queryStartDate: queryStartDate,
      queryEndDate: queryEndDate,
    }).then((res: any) => {
      setLoading(false);
      if (res?.meta?.code === 200) {
        res?.data?.list.map((item: any, index: number) => {
          item.regionId = getRegionName(parseInt(item.regionId || '1'));
          item.key = index;
        });
        setDataSource(res?.data?.list);
        setPagintion({
          ...pagination,
          total: res?.data?.count,
        });
      }
    });
  };

  const getRegionName = (id: number) => {
    let name = '';
    templateProps.regionList.map((item) => {
      if (item.id === id) {
        name = item.name;
      }
    });
    return name;
  };

  const onTableChange = (pageConfig: TablePaginationConfig) => {
    setPagintion({
      ...pagination,
      current: pageConfig.current || 1,
    });
  };

  useEffect(() => {
    getTableSourceData();
  }, [templateProps.area, templateProps.energyType, pagination.current]);
  return (
    <RealBodyContainer>
      <div className="options-box">
        <div className="search-box">
          <RangePicker
            size="large"
            value={rangePickerValue}
            onChange={onChangeRangePick}
            allowClear={false}
            disabledDate={(current) => {
              return current && current >= moment().endOf('day');
            }}
          />
          <TimePicker
            size="large"
            format={'HH:mm'}
            allowClear={false}
            value={timePicker}
            onChange={onChangeTime}
          />
          <Button size="large" type="primary" onClick={onClickSearch}>
            查询
          </Button>
        </div>
        <Button size="large" type="primary">
          导出
        </Button>
      </div>
      <div className="table-box">
        <Table
          size="middle"
          dataSource={dataSource}
          columns={templateProps.energyType === 1 ? columns : columnsOther}
          rowKey="key"
          key="key"
          onChange={onTableChange}
          loading={loading}
          pagination={{
            defaultCurrent: pagination.current,
            defaultPageSize: pagination.size,
            total: pagination.total,
          }}
          scroll={{ y: screen.height - 480, x: 1100 }}
        />
      </div>
    </RealBodyContainer>
  );
};

export default RealPage;
