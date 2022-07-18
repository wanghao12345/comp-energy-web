// 能源管理=>趋势分析
import { Select, Tabs, DatePicker, Button, Table } from 'antd';
import { getColumns } from './data';
import { RealBodyContainer } from './style';
import MyChartBox from '@/components/myChartsBox';
import MyTemplate, { TemplateContext } from '@/components/myTemplate';
import { useContext, useEffect, useState } from 'react';
import {
  energyConsumptionOverview,
  selectTrendAnalysisQOQByRegionIds,
  selectTrendAnalysisYOYByRegionIds,
} from '@/apis/energyMerge';
import { boardDayList, EnergyTypeList, TimeType } from '@/commonInterface';
import { formatDate, formatNumer, formatTime } from '@/utils/common';
import moment, { Moment } from 'moment';
import { useImmer } from 'use-immer';
const { Option } = Select;
const { TabPane } = Tabs;
const RealPage = () => {
  return (
    <MyTemplate>
      <RealBodyOption />
    </MyTemplate>
  );
};

enum ITabStatus {
  normal = 'normal',
  yaerOnyear = 'yaerOnyear',
  monthOnmonth = 'monthOnmonth',
}

const RealBodyOption = () => {
  const [currentTab, setTab] = useState(ITabStatus.normal);
  const templateProps = useContext(TemplateContext);
  const [columnDataSource, setDataSource] = useState<any>();
  const [columns, setColumns] = useState<any>();
  const onTabChange = (key: any) => {
    setTab(key);
  };
  const [form, setForm] = useImmer({
    dateType: 1,
    queryStartDate: new Date(),
    loading: 1,
    cateGory: moment(),
  });

  const [barChartData, setBarChartData] = useState<any>();

  const handleDateTypeChange = (val: any) => {
    setForm((p) => {
      p.dateType = val;
    });
  };
  const handleQueryStartDateChange = (val: any) => {
    const m = val as Moment;
    setForm((p) => {
      p.queryStartDate = m.toDate();
      p.cateGory = m;
    });
  };
  const onClickSearch = () => {
    getTrendAnalysisData(currentTab);
  };

  const getTrendAnalysisData = (currentTabStatus: ITabStatus) => {
    setForm((p) => {
      p.loading = 1;
    });
    //查两年的数据
    if (currentTab === ITabStatus.yaerOnyear) {
      const { queryStartDate } = formatTime(form.queryStartDate, TimeType.Year);
      const qsd = queryStartDate.split(' ')[0];
      selectTrendAnalysisYOYByRegionIds({
        energyType: templateProps.energyType,
        dateType: TimeType.Year,
        regionIdList: templateProps.area,
        queryStartDate: qsd.replace(
          qsd.split('-')[0],
          ((qsd.split('-')[0] as any) - 1) as any,
        ),
      }).then((res: any) => {
        setForm((p) => {
          p.loading = 0;
        });
        if (res?.meta?.code === 200) {
          if (!res?.data?.length) {
            setBarChartData(undefined);
            setDataSource([]);
            return;
          }
          const allData = [res.data];
          selectTrendAnalysisYOYByRegionIds({
            energyType: templateProps.energyType,
            dateType: TimeType.Year,
            regionIdList: templateProps.area,
            queryStartDate: qsd,
          }).then((res: any) => {
            if (res?.meta?.code === 200) {
              if (!res?.data?.length) {
                setBarChartData(undefined);
                setDataSource([]);
                return;
              }
              allData.push(res?.data);
              handleResponseData(allData, currentTabStatus);
            }
          });
        }
      });
    }

    if (currentTab === ITabStatus.monthOnmonth) {
      const { queryStartDate } = formatTime(form.queryStartDate, form.dateType);
      const qsd = queryStartDate.split(' ')[0];
      selectTrendAnalysisQOQByRegionIds({
        energyType: templateProps.energyType,
        dateType: form.dateType,
        regionIdList: templateProps.area,
        queryStartDate: qsd,
      }).then((res: any) => {
        setForm((p) => {
          p.loading = 0;
        });
        if (res?.meta?.code === 200) {
          if (!res?.data?.length) {
            setBarChartData(undefined);
            setDataSource([]);
            return;
          }
          handleResponseData(res?.data, currentTabStatus);
        }
      });
    }

    if (currentTab === ITabStatus.normal) {
      const { queryStartDate, queryEndDate } = formatTime(
        form.queryStartDate,
        form.dateType,
      );
      const qsd = queryStartDate.split(' ')[0];
      const qed = queryEndDate.split(' ')[0];

      let lastqsd = queryStartDate.split(' ')[0];
      let lastqed = queryEndDate.split(' ')[0];

      if (form.dateType === TimeType.Day) {
        const newDate = new Date(form.queryStartDate.getTime() - 86400000);
        const { queryStartDate, queryEndDate } = formatTime(
          newDate,
          form.dateType,
        );
        lastqsd = queryStartDate.split(' ')[0];
        lastqed = queryEndDate.split(' ')[0];
      }

      if (form.dateType === TimeType.Week) {
        const lastWeek = form.cateGory.week() - 1;
        const newDate = moment().week(lastWeek).startOf('week').toDate();
        const { queryStartDate, queryEndDate } = formatTime(
          newDate,
          form.dateType,
        );
        lastqsd = queryStartDate.split(' ')[0];
        lastqed = queryEndDate.split(' ')[0];
      }
      if (form.dateType === TimeType.Month) {
        const lastMonth = form.cateGory.month() - 1;
        const newDate = moment().month(lastMonth).startOf('month').toDate();
        const { queryStartDate, queryEndDate } = formatTime(
          newDate,
          form.dateType,
        );
        lastqsd = queryStartDate.split(' ')[0];
        lastqed = queryEndDate.split(' ')[0];
      }
      if (form.dateType === TimeType.Quarter) {
        const lsatquarter = form.cateGory.quarter() - 1;
        const newDate = moment()
          .quarter(lsatquarter)
          .startOf('quarter')
          .toDate();
        const { queryStartDate, queryEndDate } = formatTime(
          newDate,
          form.dateType,
        );
        lastqsd = queryStartDate.split(' ')[0];
        lastqed = queryEndDate.split(' ')[0];
      }
      if (form.dateType === TimeType.Year) {
        const lastWeek = parseInt(form.cateGory.format('Y')) - 1;
        const newDate = moment().year(lastWeek).toDate();
        const { queryStartDate, queryEndDate } = formatTime(
          newDate,
          form.dateType,
        );
        lastqsd = queryStartDate.split(' ')[0];
        lastqed = queryEndDate.split(' ')[0];
      }

      //上期使用
      energyConsumptionOverview({
        energyType: templateProps.energyType,
        dateType: form.dateType,
        queryStartDate: lastqsd,
        queryEndDate: lastqed,
        regionIdList: templateProps.area,
      }).then((res: any) => {
        if (res?.meta?.code === 200) {
          const allData = [res?.data];
          energyConsumptionOverview({
            energyType: templateProps.energyType,
            dateType: form.dateType,
            queryStartDate: qsd,
            queryEndDate: qed,
            regionIdList: templateProps.area,
          }).then((res: any) => {
            setForm((p) => {
              p.loading = 0;
            });
            if (!res?.data?.length) {
              setBarChartData(undefined);
              setDataSource([]);
              return;
            }
            if (res?.meta?.code === 200) {
              allData.push(res?.data);
              handleResponseData(allData, currentTabStatus);
            }
          });
        }
      });
    }
  };

  const handleResponseData = (data: any, currentTabStatus: ITabStatus) => {
    if (currentTabStatus === ITabStatus.monthOnmonth) {
      let xAix = formatDate(form.cateGory.toDate());
      if (form.dateType === TimeType.Week) {
        xAix = form.cateGory.format('YYYY-W') + '周';
      }
      if (form.dateType === TimeType.Month) {
        xAix = form.cateGory.format('YYYY-M') + '月';
      }
      if (form.dateType === TimeType.Quarter) {
        xAix = form.cateGory.format('YYYY-Q') + '季度';
      }
      if (form.dateType === TimeType.Year) {
        xAix = form.cateGory.format('YYYY') + '年';
      }
      const { seriesData, columns } = formChartData(data, currentTabStatus);
      const ibarChartData = {
        legend: {
          textStyle: {
            color: '#fff',
          },
        },
        toolTip: {
          trigger: 'axis',
          formatter: xAix,
        },
        xAxis: {
          type: 'category',
          data: [xAix],
        },
        yAxis: {
          type: 'value',
          name: EnergyTypeList[templateProps.energyType - 1].unit,
        },
        series: [
          {
            type: 'bar',
            data: seriesData[0],
            itemStyle: {
              color: '#72D5DF',
            },
            barWidth: 50,
          },
          {
            type: 'bar',
            data: seriesData[1],
            itemStyle: {
              color: '#3B83EE',
            },
            barWidth: 50,
          },
        ],
      };
      setBarChartData(Object.assign({}, ibarChartData));
      const icolumns = getColumns(
        currentTab,
        EnergyTypeList[templateProps.energyType - 1].unit,
      );
      setColumns(icolumns);
      setDataSource(columns);
    }
    if (currentTabStatus === ITabStatus.yaerOnyear) {
      const { xAxisData, seriesData, columns } = formChartData(
        data,
        currentTabStatus,
      );
      const ibarChartData = {
        legend: {
          textStyle: {
            color: '#fff',
          },
        },
        xAxis: {
          type: 'category',
          data: xAxisData,
        },
        yAxis: {
          type: 'value',
          name: EnergyTypeList[templateProps.energyType - 1].unit,
        },
        series: [
          {
            name: '本期能耗',
            type: 'bar',
            data: seriesData[0],
            itemStyle: {
              color: '#72D5DF',
            },
          },
          {
            name: '上期能耗',
            type: 'bar',
            data: seriesData[1],
            itemStyle: {
              color: '#3B83EE',
            },
          },
        ],
      };
      setBarChartData(Object.assign({}, ibarChartData));
      const icolumns = getColumns(
        currentTab,
        EnergyTypeList[templateProps.energyType - 1].unit,
      );
      setColumns(icolumns);
      setDataSource(columns);
    }
    if (currentTabStatus === ITabStatus.normal) {
      const { xAxisData, seriesData, columns } = formChartData(
        data,
        currentTabStatus,
      );
      const ibarChartData = {
        legend: {
          textStyle: {
            color: '#fff',
          },
        },
        xAxis: {
          type: 'category',
          data: xAxisData,
        },
        yAxis: {
          type: 'value',
          name: EnergyTypeList[templateProps.energyType - 1].unit,
        },
        series: [
          {
            name: '本期能耗',
            type: 'bar',
            data: seriesData[0],
            itemStyle: {
              color: '#72D5DF',
            },
          },
          {
            name: '上期能耗',
            type: 'bar',
            data: seriesData[1],
            itemStyle: {
              color: '#3B83EE',
            },
          },
        ],
      };
      setBarChartData(Object.assign({}, ibarChartData));
      const icolumns = getColumns(
        currentTab,
        EnergyTypeList[templateProps.energyType - 1].unit,
      );
      setColumns(icolumns);
      setDataSource(columns);
    }
  };
  const formChartData = (data: any[], currentTabStatus: ITabStatus) => {
    const xAxisData: string[] = [];
    const seriesData: number[][] = [[], []];
    const columns: any = [];
    if (currentTabStatus === ITabStatus.monthOnmonth) {
      let column: any = {};
      data.reverse().map((item: any, index: number) => {
        column = {
          Key: index,
          A: item.statisticsDate,
          B: item.regionName,
          C: formatNumer(item.flow, 5),
          D: item.statisticsDateStartUpper,
          E: formatNumer(item.flowUpper, 5),
          F: formatNumer(item.flow, 5) - formatNumer(item.flowUpper, 5),
          G:
            formatNumer(item.flow, 5) - formatNumer(item.flowUpper, 5) > 0
              ? '上升'
              : '下降',
        };
        seriesData[0].push(item.flow);
        seriesData[1].push(item.flowUpper);
        columns.push(column);
      });
    }

    if (currentTabStatus === ITabStatus.yaerOnyear) {
      let column: any = {};
      data[0].map((item: any, index: number) => {
        column = {
          Key: index,
          D: item.statisticsDate,
          B: item.regionName,
          E: formatNumer(item.flow, 5),
        };
        column.A = data[1][index]?.statisticsDate;
        column.C = formatNumer(data[1][index]?.flow, 5);
        column.F = formatNumer(data[1][index]?.flow || 0 - column.E, 5);
        column.G =
          formatNumer(data[1][index]?.flow || 0 - column.E, 5) < 0
            ? '下降'
            : '上升';
        columns.push(column);
        seriesData[0].push(item.flow);
        xAxisData.push(item.statisticsDate?.split('-')[1]);
      });
      data[1].map((item: any) => {
        seriesData[1].push(item.flow);
      });
    }

    if (currentTabStatus === ITabStatus.normal) {
      let column: any = {};
      data[0].map((item: any, index: number) => {
        column = {
          Key: index,
          D: item.x,
          E: item.y,
        };
        column.A = data[1][index]?.x || item.x;
        column.C = data[1][index]?.y || 0;
        xAxisData.push(item.x?.split('-')[1]);

        columns.push(column);
        seriesData[1].push(item.y);
      });
      data[1].map((item: any) => {
        seriesData[0].push(item.y);
      });
    }
    return {
      xAxisData,
      seriesData,
      columns,
    };
  };

  useEffect(() => {
    if (templateProps.energyType && templateProps.area.length) {
      getTrendAnalysisData(currentTab);
    }
  }, [templateProps.energyType, currentTab, templateProps.area]);

  return (
    <RealBodyContainer>
      <div className="options-box">
        <div className="tab-box">
          <Tabs
            hideAdd
            defaultActiveKey={currentTab}
            type="editable-card"
            tabPosition={'top'}
            onChange={onTabChange}
          >
            <TabPane tab={'趋势分析'} key={ITabStatus.normal}></TabPane>
            <TabPane tab={'同比分析'} key={ITabStatus.yaerOnyear}></TabPane>
            <TabPane tab={'环比分析'} key={ITabStatus.monthOnmonth}></TabPane>
          </Tabs>
        </div>
        <div className="search-box">
          {currentTab === ITabStatus.monthOnmonth ||
          currentTab === ITabStatus.normal ? (
            <Select
              size="large"
              value={form.dateType}
              style={{ width: 180 }}
              onChange={handleDateTypeChange}
            >
              {boardDayList.map((item) => (
                <Option key={item.value} value={item.value}>
                  {item.name}
                </Option>
              ))}
            </Select>
          ) : null}
          <DatePicker
            size="large"
            onChange={handleQueryStartDateChange}
            allowClear={false}
            defaultValue={moment()}
            picker={
              currentTab === ITabStatus.yaerOnyear
                ? 'year'
                : (boardDayList[form.dateType - 1]?.type as any) || 'year'
            }
            disabledDate={(current) => {
              return current && current >= moment().endOf('day');
            }}
          />
          <Button size="large" type="primary" onClick={onClickSearch}>
            查询
          </Button>
        </div>
      </div>
      <div className="echart-box">
        <MyChartBox
          id="trend-barChart"
          options={barChartData}
          loading={form.loading}
        ></MyChartBox>
      </div>
      <div className="table-box">
        <Table
          size="middle"
          dataSource={columnDataSource}
          pagination={{ pageSize: 10 }}
          columns={columns}
          scroll={{ y: 'max-content' }}
          rowKey="Key"
          key="Key"
        />
      </div>
    </RealBodyContainer>
  );
};

export default RealPage;
