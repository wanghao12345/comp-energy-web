// 能源管理=>趋势分析
import { Select, Tabs, DatePicker, Button, Table } from 'antd';
import { barCartDataOptions, dataSource, getColumns } from './data';
import { RealBodyContainer } from './style';
import MyChartBox from '@/components/myChartsBox';
import MyTemplate, { TemplateContext } from '@/components/myTemplate';
import { useContext, useEffect, useState } from 'react';
import {
  selectTrendAnalysisQOQByRegionIds,
  selectTrendAnalysisYOYByRegionIds,
} from '@/apis/energyMerge';
import { boardDayList, typeList } from '@/commonInterface';
import { formatDate, formatNumer } from '@/utils/common';
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
  yaerOnyear = 'yaerOnyear',
  monthOnmonth = 'monthOnmonth',
}

const RealBodyOption = () => {
  const [currentTab, setTab] = useState(ITabStatus.yaerOnyear);
  const templateProps = useContext(TemplateContext);
  const [columnDataSource, setDataSource] = useState(dataSource);
  const onTabChange = (key: string) => {
    if (key === ITabStatus.yaerOnyear) {
      setTab(ITabStatus.yaerOnyear);
    }
    if (key === ITabStatus.monthOnmonth) {
      setTab(ITabStatus.monthOnmonth);
    }
  };
  const [form, setForm] = useImmer({
    dateType: 1,
    queryStartDate: moment(),
  });

  const [barChartData, setBarChartData] = useState<any>(barCartDataOptions);

  const handleDateTypeChange = (val: any) => {
    console.log(val);
    setForm((p) => {
      p.dateType = val;
    });
  };
  const handleQueryStartDateChange = (val: any) => {
    setForm((p) => {
      p.queryStartDate = val;
    });
  };
  const onClickSearch = () => {
    // getTrendAnalysisData();
  };

  const getTrendAnalysisData = (
    energyType: number,
    currentTabStatus: ITabStatus,
  ) => {
    if (currentTab === ITabStatus.yaerOnyear) {
      selectTrendAnalysisYOYByRegionIds({
        energyType: energyType,
        dateType: 2,
        regionIdList: [1],
        queryStartDate: '2022-03-15',
      }).then((res: any) => {
        if (res?.meta?.code === 200) {
          console.log(res.data);
          handleResponseData(res.data, energyType, currentTabStatus);
        }
      });
    }

    if (currentTab === ITabStatus.monthOnmonth) {
      selectTrendAnalysisQOQByRegionIds({
        energyType: templateProps.energyType,
        dateType: 2,
        regionIdList: [1],
        queryStartDate: '2022-03-15',
      }).then((res: any) => {
        if (res?.meta?.code === 200) {
          console.log(res.data);
          handleResponseData(res.data, energyType, currentTabStatus);
        }
      });
    }
  };

  const handleResponseData = (
    data: any,
    energyType: number,
    currentTabStatus: ITabStatus,
  ) => {
    if (currentTabStatus === ITabStatus.monthOnmonth) {
      if (form.dateType === 1) {
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
            data: [formatDate()],
          },
          yAxis: {
            type: 'value',
            name: typeList[energyType - 1].unit,
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
            },
            {
              name: '环比能耗',
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
        setDataSource(columns);
      }
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
          name: typeList[energyType - 1].unit,
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
          },
          {
            name: '环比能耗',
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
      setDataSource(columns);
    }
  };

  const formChartData = (data: any[], currentTabStatus: ITabStatus) => {
    const xAxisData: string[] = [];
    const seriesData: number[][] = [[], []];
    const columns: any = [];
    data.map((item) => {
      if (currentTabStatus === ITabStatus.monthOnmonth) {
        const column = {
          A: item.statisticsDate,
          B: item.regionName,
          C: formatNumer(item.flow, 5),
          D: item.statisticsDateEndUpper,
          E: formatNumer(item.flowUpper, 5),
          F: formatNumer(item.flow - item.flowUpper, 5),
          G: formatNumer(item.flow - item.flowUpper, 5) < 0 ? '下降' : '上升',
        };
        xAxisData.push(item.regionName);
        seriesData[0].push(item.flow);
        seriesData[1].push(item.flowUpper);
        columns.push(column);
      }
      if (currentTabStatus === ITabStatus.yaerOnyear) {
        const column = {
          A: item.statisticsDate,
          B: item.regionName,
          C: formatNumer(item.flow, 5),
          D: item.statisticsDateUpper,
          E: formatNumer(item.flowUpper, 5),
          F: formatNumer(item.flow - item.flowUpper, 5),
          G: formatNumer(item.flow - item.flowUpper, 5) < 0 ? '下降' : '上升',
        };
        xAxisData.push(item.statisticsDate);
        seriesData[0].push(item.flow);
        seriesData[1].push(item.flowUpper);
        columns.push(column);
      }
    });
    return {
      xAxisData,
      seriesData,
      columns,
    };
  };

  useEffect(() => {
    getTrendAnalysisData(templateProps.energyType, currentTab);
  }, [templateProps.energyType, currentTab]);

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
            <TabPane
              tab={'趋势分析'}
              key={''}
              disabled
              className="noClick"
            ></TabPane>
            <TabPane tab={'同比分析'} key={ITabStatus.yaerOnyear}></TabPane>
            <TabPane tab={'环比分析'} key={ITabStatus.monthOnmonth}></TabPane>
          </Tabs>
        </div>
        <div className="search-box">
          {currentTab === ITabStatus.monthOnmonth ? (
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
          ) : null}
          <DatePicker
            size="large"
            onChange={handleQueryStartDateChange}
            picker={
              currentTab === ITabStatus.yaerOnyear
                ? 'year'
                : (boardDayList[form.dateType - 1]?.type as any) || 'year'
            }
            value={form.queryStartDate}
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
        <MyChartBox id="barChart" options={barChartData}></MyChartBox>
      </div>
      <div className="table-box">
        <Table
          scroll={{ y: window.screen.availHeight - 820 }}
          size="middle"
          dataSource={columnDataSource}
          columns={getColumns(
            currentTab,
            typeList[templateProps.energyType - 1].unit,
          )}
          rowKey="A"
          key="A"
        />
      </div>
    </RealBodyContainer>
  );
};

export default RealPage;
