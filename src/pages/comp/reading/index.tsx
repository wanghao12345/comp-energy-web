import { DatePicker, Button, Table, TablePaginationConfig } from 'antd';
import moment, { Moment } from 'moment';
import { RealBodyContainer } from './style';
import MyTemplate, { TemplateContext } from '@/components/myTemplate';
import { useContext, useEffect, useState } from 'react';
import { getEnergyElectricData } from '@/apis/baseinfo';
import { EnergyType } from '@/commonInterface';
import { formatNumer } from '@/utils/common';
import * as XLSX from 'xlsx';
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
  const defaultSize = 15;
  const [timePicker, setTimePicker] = useState(moment());
  const [dataSource, setDataSource] = useState<any>([]);
  const [columns, setColumns] = useState<any>([]);
  const [pagination, setPagintion] = useState({
    total: 0,
    current: 1,
    size: defaultSize,
  });
  const [loading, setLoading] = useState(true);
  const onChangeRangePick = (range: any) => {
    console.log(range);
    setrangePickerValue(range);
  };
  const [exportLoading, setExportLoading] = useState(false);
  const onChangeTime = (val: moment.Moment | null) => {
    setTimePicker(val || moment());
  };

  const onClickSearch = () => {
    getTableSourceData(true);
  };
  const export2Excel = () => {
    setExportLoading(true);
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
        let exportData: any = [];
        list.map((item: any) => {
          const obj = {
            createDate: item.createDate,
            regionId: item.regionId,
            dstart: item.dstart,
            activeElectricalEnergyCurrent: item.activeElectricalEnergyCurrent,
            activeElectricalEnergy: item.activeElectricalEnergy,
          };
          exportData.push(obj);
        });
        let header: any = [
          'createDate',
          'regionId',
          'dstart',
          'activeElectricalEnergyCurrent',
          'activeElectricalEnergy',
        ];
        let headerDisplay: any = {
          createDate: '抄表时间',
          regionId: '节点名称',
          dstart: '起始抄表值',
          activeElectricalEnergyCurrent: '截止数值',
          activeElectricalEnergy: '差值',
        };
        if (templateProps.energyType !== EnergyType.Electric) {
          header = ['createDate', 'regionId', 'start', 'flowCurrent', 'flow'];
          headerDisplay = {
            createDate: '抄表时间',
            regionId: '节点名称',
            start: '起始抄表值',
            flowCurrent: '截止数值',
            flow: '差值',
          };
          list.map((item: any) => {
            const obj = {
              createDate: item.createDate,
              regionId: item.regionId,
              start: item.start,
              flowCurrent: item.flowCurrent,
              flow: item.flow,
            };
            exportData.push(obj);
          });
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
        XLSX.writeFile(book, `能源集抄报表.xlsx`);
        setExportLoading(false);
      }
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
              title: '抄表时间',
              dataIndex: 'createDate',
              fixed: 'left',
              width: 160,
            },
            {
              title: '节点名称',
              dataIndex: 'regionId',
              fixed: 'left',
              width: 120,
            },
            {
              title: '起始抄表值',
              dataIndex: 'dstart',
            },
            {
              title: '截止数值',
              dataIndex: 'activeElectricalEnergyCurrent',
            },
            {
              title: '差值',
              dataIndex: 'activeElectricalEnergy',
            },
          ];
          setColumns(tcolumns);
        } else {
          const tcolumns = [
            {
              title: '抄表时间',
              dataIndex: 'createDate',
              fixed: 'left',
              width: 160,
            },
            {
              title: '节点名称',
              dataIndex: 'regionId',
              fixed: 'left',
              width: 120,
            },
            {
              title: '起始抄表值',
              dataIndex: 'start',
            },
            {
              title: '截止数值',
              dataIndex: 'flowCurrent',
            },
            {
              title: '差值',
              dataIndex: 'flow',
            },
          ];
          setColumns(tcolumns);
        }
        setDataSource([...list]);
        setPagintion({
          current: isReset ? 1 : pagination.current,
          size: isReset ? defaultSize : pagination.size,
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
      size: pageConfig.pageSize || defaultSize,
    });
  };

  useEffect(() => {
    if (templateProps.area.length && templateProps.energyType) {
      getTableSourceData(true);
    } else {
      setDataSource([]);
    }
  }, [templateProps.area, templateProps.energyType]);

  useEffect(() => {
    if (templateProps.area.length && templateProps.energyType) {
      getTableSourceData();
    } else {
      setDataSource([]);
    }
  }, [pagination.current, pagination.size]);

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
          id="myTable-reading"
          size="large"
          dataSource={dataSource}
          columns={columns}
          rowKey="activePower"
          key="activePower"
          onChange={onTableChange}
          loading={loading}
          pagination={{
            current: pagination.current,
            pageSize: pagination.size,
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
