import { DatePicker, Button, Table, TablePaginationConfig } from 'antd';
import moment, { Moment } from 'moment';
import { RealBodyContainer } from './style';
import MyTemplate, { TemplateContext } from '@/components/myTemplate';
import { useContext, useEffect, useState } from 'react';
import { getEnergyElectricData } from '@/apis/baseinfo';
import { EnergyType } from '@/commonInterface';
import { formatNumer } from '@/utils/common';
const { RangePicker, TimePicker } = DatePicker;
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
  const [columns, setColumns] = useState<any>([]);
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
        const list = res?.data?.list;
        if (!list.length) {
          setDataSource([]);
        }
        list.map((item: any) => {
          item.regionId = getRegionName(parseInt(item.regionId || '1'));
          item.activeElectricalEnergyCurrent = formatNumer(
            item.activeElectricalEnergyCurrent,
          );
          item.activeElectricalEnergy = formatNumer(
            item.activeElectricalEnergy,
          );
          item.flowCurrent = formatNumer(item.flowCurrent);
          item.flow = formatNumer(item.flow);
          item.dstart = formatNumer(
            item.activeElectricalEnergyCurrent - item.activeElectricalEnergy,
          );
          item.start = formatNumer(item.flowCurrent - item.flow);
        });
        if (templateProps.energyType === EnergyType.Electric) {
          const tcolumns = [
            {
              title: '????????????',
              dataIndex: 'createDate',
              fixed: 'left',
              width: 160,
            },
            {
              title: '????????????',
              dataIndex: 'regionId',
              fixed: 'left',
              width: 120,
            },
            {
              title: '???????????????',
              dataIndex: 'dstart',
            },
            {
              title: '????????????',
              dataIndex: 'activeElectricalEnergyCurrent',
            },
            {
              title: '??????',
              dataIndex: 'activeElectricalEnergy',
            },
          ];
          setColumns(tcolumns);
        } else {
          const tcolumns = [
            {
              title: '????????????',
              dataIndex: 'createDate',
              fixed: 'left',
              width: 160,
            },
            {
              title: '????????????',
              dataIndex: 'regionId',
              fixed: 'left',
              width: 120,
            },
            {
              title: '???????????????',
              dataIndex: 'start',
            },
            {
              title: '????????????',
              dataIndex: 'flowCurrent',
            },
            {
              title: '??????',
              dataIndex: 'flow',
            },
          ];
          setColumns(tcolumns);
        }
        setDataSource([...list]);
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
      size: pageConfig.pageSize || 15,
    });
  };

  useEffect(() => {
    if (templateProps.area.length && templateProps.energyType) {
      getTableSourceData();
    } else {
      setDataSource([]);
    }
  }, [
    templateProps.area,
    templateProps.energyType,
    pagination.current,
    pagination.size,
  ]);
  return (
    <RealBodyContainer>
      <div className="options-box">
        <div className="search-box">
          <RangePicker
            size="large"
            value={rangePickerValue}
            onChange={onChangeRangePick}
            allowClear={false}
            // format={'YYYY-MM-DD HH:mm:ss'}
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
            ??????
          </Button>
        </div>
        <Button size="large" type="primary">
          ??????
        </Button>
      </div>
      <div className="table-box">
        <Table
          size="large"
          dataSource={dataSource}
          columns={columns}
          rowKey="activePower"
          key="activePower"
          onChange={onTableChange}
          loading={loading}
          pagination={{
            defaultCurrent: pagination.current,
            defaultPageSize: pagination.size,
            total: pagination.total,
          }}
          scroll={{
            y: Math.max(screen.availHeight - 390, 500),
            x: 700,
          }}
        />
      </div>
    </RealBodyContainer>
  );
};

export default RealPage;
