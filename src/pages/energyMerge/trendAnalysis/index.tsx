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
import {
  formatDate,
  formatNumer,
  formatTime,
  getTrendsNewArray,
} from '@/utils/common';
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
  yearOnyear = 'yearOnyear',
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
    //同比分析
    if (currentTab === ITabStatus.yearOnyear) {
      const { queryStartDate } = formatTime(form.queryStartDate, TimeType.Year);
      const qsd = queryStartDate.split(' ')[0];
      selectTrendAnalysisYOYByRegionIds({
        energyType: templateProps.energyType,
        dateType: TimeType.Year,
        regionIdList: templateProps.area,
        queryStartDate: qsd,
      }).then((res: any) => {
        setForm((p) => {
          p.loading = 0;
        });
        if (res?.meta?.code === 200) {
          handleResponseData(res?.data, currentTabStatus);
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
          const allData = [res];
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
              allData.push(res);
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
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
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
            name: '本期能耗',
            type: 'bar',
            data: seriesData[0],
            itemStyle: {
              color: '#72D5DF',
            },
            barWidth: 50,
            barGap: '60%',
          },
          {
            name: '环比能耗',
            type: 'bar',
            data: seriesData[1],
            itemStyle: {
              color: '#3B83EE',
            },
            barWidth: 50,
            barGap: '60%',
          },
        ],
      };
      setBarChartData(Object.assign({}, ibarChartData));
      const icolumns = getColumns(
        currentTabStatus,
        EnergyTypeList[templateProps.energyType - 1].unit,
      );
      setColumns([...icolumns]);
      setDataSource(columns);
    }
    if (currentTabStatus === ITabStatus.yearOnyear) {
      const { xAxisData, seriesData, columns } = formChartData(
        data,
        currentTabStatus,
      );
      const ibarChartData = {
        legend: {
          textStyle: {
            color: '#fff',
          },
          data: ['本期能耗', '同比能耗'],
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        xAxis: {
          type: 'category',
          name: '月',
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
            label: { formatter: '{c}  {name|{a}}' },
            itemStyle: {
              color: '#72D5DF',
            },
            barGap: 0,
          },
          {
            name: '同比能耗',
            type: 'bar',
            label: { formatter: '{c}  {name|{a}}' },
            data: seriesData[1],
            itemStyle: {
              color: '#3B83EE',
            },
          },
        ],
      };
      setBarChartData(Object.assign({}, ibarChartData));
      const icolumns = getColumns(
        currentTabStatus,
        EnergyTypeList[templateProps.energyType - 1].unit,
      );
      setColumns([...icolumns]);
      setDataSource(columns);
    }

    if (currentTabStatus === ITabStatus.normal) {
      const { xAxisData, seriesData, columns } = formChartData(
        data,
        currentTabStatus,
      );
      let legends = ['能耗', '昨日能耗'];
      if (form.dateType === TimeType.Week) {
        legends = ['能耗', '上周能耗'];
      }
      if (form.dateType === TimeType.Month) {
        legends = ['能耗', '上月能耗'];
      }
      if (form.dateType === TimeType.Quarter) {
        legends = ['能耗', '上季能耗'];
      }
      if (form.dateType === TimeType.Year) {
        legends = ['能耗', '去年能耗'];
      }
      const ibarChartData = {
        legend: {
          textStyle: {
            color: '#fff',
          },
          data: legends,
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        xAxis: {
          type: 'category',
          data: xAxisData,
          axisTick: { show: false },
        },
        yAxis: {
          type: 'value',
          name: EnergyTypeList[templateProps.energyType - 1].unit,
        },
        series: [
          {
            name: legends[0],
            type: 'bar',
            data: seriesData[0],
            itemStyle: {
              color: '#72D5DF',
            },
            barGap: 0,
          },
          {
            name: legends[1],
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
        currentTabStatus,
        EnergyTypeList[templateProps.energyType - 1].unit,
      );
      setColumns([...icolumns]);
      setDataSource(columns);
    }

    // if (currentTabStatus === ITabStatus.normal) {
    //   const { xAxisData, seriesData, columns } = formChartData(
    //     data,
    //     currentTabStatus,
    //   );
    //   const ibarChartData = {
    //     legend: {
    //       textStyle: {
    //         color: '#fff',
    //       },
    //     },
    //     xAxis: {
    //       type: 'category',
    //       data: xAxisData,
    //     },
    //     yAxis: {
    //       type: 'value',
    //       name: EnergyTypeList[templateProps.energyType - 1].unit,
    //     },
    //     series: [
    //       {
    //         name: '本期能耗',
    //         type: 'bar',
    //         data: seriesData[0],
    //         itemStyle: {
    //           color: '#72D5DF',
    //         },
    //       },
    //       {
    //         name: '上期能耗',
    //         type: 'bar',
    //         data: seriesData[1],
    //         itemStyle: {
    //           color: '#3B83EE',
    //         },
    //       },
    //     ],
    //   };
    //   setBarChartData(Object.assign({}, ibarChartData));
    //   const icolumns = getColumns(
    //     currentTab,
    //     EnergyTypeList[templateProps.energyType - 1].unit,
    //   );
    //   setColumns(icolumns);
    //   setDataSource(columns);
    // }
  };
  const formChartData = (data: any[], currentTabStatus: ITabStatus) => {
    const xAxisData: string[] = [];
    const seriesData: number[][] = [[], []];
    const columns: any = [];
    if (currentTabStatus === ITabStatus.yearOnyear) {
      let column: any = {};
      data.map((item: any, index: number) => {
        const current = formatNumer(item.flow, 5);
        const last = formatNumer(item.flowUpper, 5);
        column = {
          Key: index,
          A: (item.statisticsDate?.split('-')[1] || 1) * 1 + '月',
          B: item.regionName,
          C: current,
          D: '去年' + (item.statisticsDateUpper?.split('-')[1] || 1) * 1 + '月',
          E: last,
          F: formatNumer(current - last),
          G: item.flow - item.flowUpper > 0 ? '上升' : '下降',
        };
        xAxisData.push(item.statisticsDate?.split('-')[1]);
        seriesData[0].push(current);
        seriesData[1].push(last);
        columns.push(column);
      });
    }

    if (currentTabStatus === ITabStatus.monthOnmonth) {
      let column: any = {};
      data.map((item: any, index: number) => {
        const current = formatNumer(item.flow, 5);
        const last = formatNumer(item.flowUpper, 5);
        let currentTime = item.statisticsDate;
        let lastTime = item.statisticsDateStartUpper;
        if (form.dateType === TimeType.Week) {
          currentTime = moment(currentTime).format('YYYY-W') + '周';
          lastTime = moment(lastTime).format('YYYY-W') + '周';
        }
        if (form.dateType === TimeType.Month) {
          currentTime = moment(currentTime).format('YYYY-M') + '月';
          lastTime = moment(lastTime).format('YYYY-M') + '月';
        }
        if (form.dateType === TimeType.Quarter) {
          currentTime = moment(currentTime).format('YYYY-Q') + '季度';
          lastTime = moment(lastTime).format('YYYY-Q') + '季度';
        }
        if (form.dateType === TimeType.Year) {
          currentTime = moment(currentTime).format('YYYY') + '年';
          lastTime = moment(lastTime).format('YYYY') + '年';
        }

        column = {
          Key: index,
          A: currentTime,
          B: item.regionName,
          C: current,
          D: lastTime,
          E: last,
          F: formatNumer(current - last),
          G: item.flow - item.flowUpper > 0 ? '上升' : '下降',
        };
        xAxisData.push(item.statisticsDate?.split('-')[1]);
        seriesData[0].push(current);
        seriesData[1].push(last);
        columns.push(column);
      });
    }

    if (currentTabStatus === ITabStatus.normal) {
      const getRegionName = (ids: number[]) => {
        const id = ids[0] || 1;
        let name = '';
        templateProps.regionList.map((item) => {
          if (item.id === id) {
            name = item.name;
          }
        });
        return name;
      };
      const name = getRegionName(templateProps.area);
      let column: any = {};
      const allData = getTrendsNewArray(data[0], data[1], form.dateType);
      allData.data.map((item: any, index: number) => {
        const y = formatNumer(item.y || 0, 3);
        const uppery = formatNumer(item.upperY || 0, 3);
        column = {
          Key: index,
          A: item.x,
          B: name,
          C: EnergyTypeList[templateProps.energyType - 1].name,
          D: y,
        };
        xAxisData.push(item.x);
        seriesData[0].push(y);
        seriesData[1].push(uppery);
        columns.push(column);
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
            <TabPane tab={'同比分析'} key={ITabStatus.yearOnyear}></TabPane>
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
              currentTab === ITabStatus.yearOnyear
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
          rowKey="Key"
          key="Key"
          scroll={{ x: 600, y: 400 }}
        />
      </div>
    </RealBodyContainer>
  );
};

export default RealPage;
