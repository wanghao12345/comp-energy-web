//企业报表--参量采集

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
import { EnergyType } from '@/commonInterface';
import * as XLSX from 'xlsx';
const { RangePicker } = DatePicker;
const RealPage = () => {
  return (
    <MyTemplate isShowCheckBox={true}>
      <RealBodyOption />
    </MyTemplate>
  );
};

const RealBodyOption = () => {
  const defaultSize = 15;
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
    size: defaultSize,
  });
  const [exportLoading, setExportLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const onChangeRangePick = (range: any) => {
    console.log(range);
    setrangePickerValue(range);
  };

  const onChangeTime = (val: moment.Moment | null) => {
    setTimePicker(val || moment());
  };

  const onClickSearch = () => {
    getTableSourceData(true);
  };

  const export2Excel = () => {
    setExportLoading(true);
    let header, headerDisplay;
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
      current: 1,
      size: pagination.total,
      queryStartDate: queryStartDate,
      queryEndDate: queryEndDate,
    }).then((res: any) => {
      if (res.meta.code !== 200) {
        setExportLoading(false);
        return;
      }
      const list = res?.data?.list || [];
      const exportData: any = [];
      if (templateProps.energyType === EnergyType.Electric) {
        list.map((item: any) => {
          item.regionId = getRegionName(parseInt(item.regionId || '1'));
          const obj = {
            regionId: item.regionId,
            createDate: item.createDate,
            activePower: item.activePower,
            reactivePower: item.reactivePower,
            currentA: item.currentA,
            currentB: item.currentB,
            currentC: item.currentC,
            voltageA: item.voltageA,
            voltageB: item.voltageB,
            voltageC: item.voltageC,
            activeElectricalEnergy: item.activeElectricalEnergy,
            frequency: item.frequency,
            cosZ: item.cosZ,
            activePowerA: item.activePowerA,
            activePowerB: item.activePowerB,
            activePowerC: item.activePowerC,
          };
          exportData.push(obj);
        });
        header = [
          'createDate',
          'regionId',
          'activePower',
          'reactivePower',
          'currentA',
          'currentB',
          'currentC',
          'voltageA',
          'voltageB',
          'voltageC',
          'activeElectricalEnergy',
          'frequency',
          'cosZ',
          'activePowerA',
          'activePowerB',
          'activePowerC',
        ];
        headerDisplay = {
          createDate: '时间',
          regionId: '节点名称',
          activePower: 'Ps',
          reactivePower: 'Qs',
          currentA: 'Ia',
          currentB: 'Ib',
          currentC: 'Ic',
          voltageA: 'Ua',
          voltageB: 'Ub',
          voltageC: 'Uc',
          activeElectricalEnergy: 'EPI',
          frequency: 'F r ',
          cosZ: 'PF',
          activePowerA: 'Pa',
          activePowerB: 'Pb',
          activePowerC: 'Pc',
        };
      } else {
        list.map((item: any) => {
          item.regionId = getRegionName(parseInt(item.regionId || '1'));
          const obj = {
            regionId: item.regionId,
            createDate: item.createDate,
            flowRate: item.flowRate,
            flowAccumulate: item.flowAccumulate,
          };
          exportData.push(obj);
        });
        header = ['createDate', 'regionId', 'flowRate', 'flowAccumulate'];
        headerDisplay = {
          createDate: '时间',
          regionId: '节点名称',
          flowRate: '瞬时流量',
          flowAccumulate: '累计流量',
        };
      }
      //将表头放到原始数据里面去，要保证表头在数组的最前面
      const newData = [headerDisplay, ...exportData];
      const worksheet = XLSX.utils.json_to_sheet(newData, {
        header: header,
        skipHeader: true,
      });
      const book = XLSX.utils.book_new();
      // sheet1表示要导出的分区名字
      XLSX.utils.book_append_sheet(book, worksheet, 'sheet1');
      XLSX.writeFile(book, `参量采集报表.xlsx`);

      setExportLoading(false);
    });
  };

  const getTableSourceData = (isReset?: boolean) => {
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
      current: isReset ? 1 : pagination.current,
      size: isReset ? defaultSize : pagination.size,
      queryStartDate: queryStartDate,
      queryEndDate: queryEndDate,
    }).then((res: any) => {
      setLoading(false);
      if (res?.meta?.code === 200) {
        res?.data?.list.map((item: any, index: number) => {
          item.regionId = getRegionName(parseInt(item.regionId || '1'));
          item.key = index;
          // item.flowRate = formatNumer(item.flowRate, 3);
          // item.flowAccumulate = formatNumer(item.flowAccumulate, 3);
        });
        setPagintion({
          current: isReset ? 1 : pagination.current,
          size: isReset ? defaultSize : pagination.size,
          total: res?.data?.count,
        });
        setDataSource(res?.data?.list);
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
      size: pageConfig.pageSize || defaultSize,
    });
  };

  useEffect(() => {
    if (templateProps.area.length) {
      getTableSourceData(true);
    } else {
      setDataSource([]);
    }
  }, [templateProps.area, templateProps.energyType]);

  useEffect(() => {
    if (templateProps.area.length) {
      getTableSourceData();
    } else {
      setDataSource([]);
    }
  }, [pagination.size, pagination.current]);

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
        <Button
          size="large"
          type="primary"
          onClick={export2Excel}
          loading={exportLoading}
        >
          导出
        </Button>
      </div>
      <div className="table-box">
        <Table
          size="large"
          dataSource={dataSource}
          columns={
            templateProps.energyType === EnergyType.Electric
              ? columns
              : columnsOther
          }
          rowKey="key"
          key="key"
          onChange={onTableChange}
          loading={loading}
          pagination={{
            current: pagination.current,
            pageSize: pagination.size,
            total: pagination.total,
          }}
          scroll={{
            y: Math.max(screen.availHeight - 390, 500),
            x: templateProps.energyType === EnergyType.Electric ? 1500 : 700,
          }}
        />
      </div>
    </RealBodyContainer>
  );
};

export default RealPage;
