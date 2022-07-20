import { useContext, useEffect, useState } from 'react';
import { Select, Input, Tabs, DatePicker, Button, Table, Form } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { RealBodyContainer } from './style';
import {
  chartOption,
  ContactColumns,
  optionsData,
  tabStatus,
  WarnColumns,
} from './data';
import MyChartBox from '@/components/myChartsBox';
import moment from 'moment';
import MyTemplate, { TemplateContext } from '@/components/myTemplate';
import { formatTime } from '@/utils/common';
import { dayRealTime } from '@/apis/monitor';

const { Option } = Select;
const { TabPane } = Tabs;
const RealPage = () => {
  return (
    <MyTemplate>
      <RealBodyOption />
    </MyTemplate>
  );
};

const RealBodyOption = () => {
  const templateProps = useContext(TemplateContext);
  const options = optionsData[templateProps.energyType - 1];
  const [tab, setTab] = useState(tabStatus.RealTime);
  const [chartLoading, setChartLoading] = useState(1);
  const [form] = Form.useForm();
  const { RangePicker } = DatePicker;
  //图表数据
  const [chartData, setChartData] = useState<any>();
  //表数据
  const [dataSource, setDataSource] = useState<any>([]);
  //表头
  const [columns, setColumns] = useState<any>([]);

  const onTabChange = (key: string) => {
    const tab = key as tabStatus;
    setTab(tab);
  };
  const onFinish = (values: any) => {
    handleResponse(values);
    console.log(values);
  };

  const handleResponse = (values: any) => {
    getRealTimeRes(values);
  };

  const getRealTimeRes = (values?: any) => {
    setChartLoading(0);
    if (tab === tabStatus.RealTime) {
      const searchDate = values?.date || form.getFieldValue('date');
      const { queryStartDate, queryEndDate } = formatTime(searchDate.toDate());
      dayRealTime({
        energyType: templateProps.energyType,
        regionId: templateProps.area[0],
        queryStartDate: queryStartDate,
        queryEndDate: queryEndDate,
      }).then((res: any) => {
        setChartLoading(0);
        if (res?.meta?.code === 200) {
          console.log(res.data);
          formatColumnAndChartData(
            templateProps.energyType,
            form.getFieldValue('option'),
            res.data,
          );
        }
      });
    }
    if (tab === tabStatus.Warnning) {
      setDataSource([]);
      setColumns(WarnColumns);
    }
    if (tab === tabStatus.Contact) {
      setDataSource([]);
      setColumns(ContactColumns);
    }
  };

  const formatColumnAndChartData = (
    type: number,
    detailType: string,
    data: any,
  ) => {
    const columnDataSource: any[] = [];
    let columns: any[] = [
      {
        title: '采集时间',
        dataIndex: 'time',
        key: 'time',
      },
      {
        title: 'Ia（A） ',
        dataIndex: 'A',
        key: 'A',
      },
      {
        title: 'Ib（A）',
        dataIndex: 'B',
        key: 'B',
      },
      {
        title: 'Ic（A）',
        dataIndex: 'C',
        key: 'C',
      },
    ];

    const series: any[][] = [[], [], [], [], [], []];

    const judegeIsZD = (time: string) => {
      const colck = time.split(' ')[1];
      if (colck) {
        return colck.endsWith(':00:00');
      }
      return false;
    };
    if (type === 1) {
      if (detailType === '电流') {
        columns = [
          {
            title: '采集时间',
            dataIndex: 'time',
            key: 'time',
            responsive: ['md'],
          },
          {
            title: 'Ia（A） ',
            dataIndex: 'A',
            key: 'A',
            responsive: ['md'],
          },
          {
            title: 'Ib（A）',
            dataIndex: 'B',
            key: 'B',
            responsive: ['md'],
          },
          {
            title: 'Ic（A）',
            dataIndex: 'C',
            key: 'C',
            responsive: ['md'],
          },
        ];
        data.list.map((item: any, index: number) => {
          const column = {
            key: index,
            time: item.createDate.split(' ')[1],
            A: item.currentA,
            B: item.currentB,
            C: item.currentC,
          };
          if (judegeIsZD(item.createDate)) {
            series[0].push(item.currentA);
            series[1].push(item.currentB);
            series[2].push(item.currentC);
          }
          columnDataSource.push(column);
        });
        const originSeries = [
          {
            name: 'Ia',
            type: 'line',
            smooth: true,
            markPoint: {
              data: [
                { type: 'max', name: 'Max' },
                { type: 'min', name: 'Min' },
              ],
              label: {
                color: '#FFFFFF',
              },
            },
            lineStyle: {
              color: '#FFEF6C',
            },
            data: series[0],
          },
          {
            name: 'Ib',
            type: 'line',
            smooth: true,
            markPoint: {
              data: [
                { type: 'max', name: 'Max' },
                { type: 'min', name: 'Min' },
              ],
              label: {
                color: '#FFFFFF',
              },
            },
            lineStyle: {
              color: '#FD264E',
            },
            data: series[1],
          },
          {
            name: 'Ic',
            type: 'line',
            smooth: true,
            markPoint: {
              data: [
                { type: 'max', name: 'Max' },
                { type: 'min', name: 'Min' },
              ],
              label: {
                color: '#FFFFFF',
              },
            },
            lineStyle: {
              color: '#2DFCC0',
            },
            data: series[2],
          },
        ];
        chartOption.yAxis.name = 'A';
        chartOption.series = originSeries;
      }
      if (detailType === '电压') {
        columns = [
          {
            title: '采集时间',
            dataIndex: 'time',
            key: 'time',
          },
          {
            title: 'Ua（V） ',
            dataIndex: 'A',
            key: 'A',
          },
          {
            title: 'Ub（V）',
            dataIndex: 'B',
            key: 'B',
          },
          {
            title: 'Uc（V）',
            dataIndex: 'C',
            key: 'C',
          },
        ];
        data.list.map((item: any, index: number) => {
          const column = {
            key: index,
            time: item.createDate.split(' ')[1],
            A: item.voltageA,
            B: item.voltageB,
            C: item.voltageC,
          };
          if (judegeIsZD(item.createDate)) {
            series[0].push(item.voltageA);
            series[1].push(item.voltageB);
            series[2].push(item.voltageC);
          }
          columnDataSource.push(column);
        });
        chartOption.yAxis.name = 'V';
        const originSeries = [
          {
            name: 'Ua',
            type: 'line',
            smooth: true,
            markPoint: {
              data: [
                { type: 'max', name: 'Max' },
                { type: 'min', name: 'Min' },
              ],
              label: {
                color: '#FFFFFF',
              },
            },
            lineStyle: {
              color: '#FFEF6C',
            },
            data: series[0],
          },
          {
            name: 'Ub',
            type: 'line',
            smooth: true,
            markPoint: {
              data: [
                { type: 'max', name: 'Max' },
                { type: 'min', name: 'Min' },
              ],
              label: {
                color: '#FFFFFF',
              },
            },
            lineStyle: {
              color: '#FD264E',
            },
            data: series[1],
          },
          {
            name: 'Uc',
            type: 'line',
            smooth: true,
            markPoint: {
              data: [
                { type: 'max', name: 'Max' },
                { type: 'min', name: 'Min' },
              ],
              label: {
                color: '#FFFFFF',
              },
            },
            lineStyle: {
              color: '#2DFCC0',
            },
            data: series[2],
          },
        ];
        chartOption.series = originSeries;
      }
      if (detailType === '功率因数') {
        columns = [
          {
            title: '采集时间',
            dataIndex: 'time',
            key: 'time',
          },
          {
            title: 'Pfa ',
            dataIndex: 'A',
            key: 'A',
          },
          {
            title: 'Pfb',
            dataIndex: 'B',
            key: 'B',
          },
          {
            title: 'Pfc',
            dataIndex: 'C',
            key: 'C',
          },
          {
            title: 'Pf',
            dataIndex: 'D',
            key: 'D',
          },
        ];
        data.list.map((item: any, index: number) => {
          const column = {
            key: index,
            time: item.createDate.split(' ')[1],
            A: item.cosA,
            B: item.cosB,
            C: item.cosC,
            D: item.cosZ,
          };
          if (judegeIsZD(item.createDate)) {
            series[0].push(item.cosA);
            series[1].push(item.cosB);
            series[2].push(item.cosC);
            series[3].push(item.cosZ);
          }
          columnDataSource.push(column);
        });
        chartOption.yAxis.name = '';
        const originSeries = [
          {
            name: 'Pfa',
            type: 'line',
            smooth: true,
            markPoint: {
              data: [
                { type: 'max', name: 'Max' },
                { type: 'min', name: 'Min' },
              ],
              label: {
                color: '#FFFFFF',
              },
            },
            lineStyle: {
              color: '#FFEF6C',
            },
            data: series[0],
          },
          {
            name: 'Pfb',
            type: 'line',
            smooth: true,
            markPoint: {
              data: [
                { type: 'max', name: 'Max' },
                { type: 'min', name: 'Min' },
              ],
              label: {
                color: '#FFFFFF',
              },
            },
            lineStyle: {
              color: '#FD264E',
            },
            data: series[1],
          },
          {
            name: 'Pfc',
            type: 'line',
            smooth: true,
            markPoint: {
              data: [
                { type: 'max', name: 'Max' },
                { type: 'min', name: 'Min' },
              ],
              label: {
                color: '#FFFFFF',
              },
            },
            lineStyle: {
              color: '#2DFCC0',
            },
            data: series[2],
          },
          {
            name: 'Pf',
            type: 'line',
            smooth: true,
            markPoint: {
              data: [
                { type: 'max', name: 'Max' },
                { type: 'min', name: 'Min' },
              ],
              label: {
                color: '#fff',
              },
            },
            lineStyle: {
              color: '#381ae0',
            },
            data: series[3],
          },
        ];
        chartOption.series = originSeries;
      }
      if (detailType === '有功功率') {
        columns = [
          {
            title: '采集时间',
            dataIndex: 'time',
            key: 'time',
          },
          {
            title: 'Pa（KW） ',
            dataIndex: 'A',
            key: 'A',
          },
          {
            title: 'Pb（KW）',
            dataIndex: 'B',
            key: 'B',
          },
          {
            title: 'Pc（KW）',
            dataIndex: 'C',
            key: 'C',
          },
          {
            title: 'Ps（KW）',
            dataIndex: 'D',
            key: 'D',
          },
        ];
        data.list.map((item: any, index: number) => {
          const column = {
            key: index,
            time: item.createDate.split(' ')[1],
            A: item.activePowerA,
            B: item.activePowerB,
            C: item.activePowerC,
            D: item.activePower,
          };
          if (judegeIsZD(item.createDate)) {
            series[0].push(item.activePowerA);
            series[1].push(item.activePowerB);
            series[2].push(item.activePowerC);
            series[3].push(item.activePower);
          }
          columnDataSource.push(column);
        });

        chartOption.yAxis.name = 'KW';
        const originSeries = [
          {
            name: 'Pa',
            type: 'line',
            smooth: true,
            markPoint: {
              data: [
                { type: 'max', name: 'Max' },
                { type: 'min', name: 'Min' },
              ],
              label: {
                color: '#FFFFFF',
              },
            },
            lineStyle: {
              color: '#FFEF6C',
            },
            data: series[0],
          },
          {
            name: 'Pb',
            type: 'line',
            smooth: true,
            markPoint: {
              data: [
                { type: 'max', name: 'Max' },
                { type: 'min', name: 'Min' },
              ],
              label: {
                color: '#FFFFFF',
              },
            },
            lineStyle: {
              color: '#FD264E',
            },
            data: series[1],
          },
          {
            name: 'Pc',
            type: 'line',
            smooth: true,
            markPoint: {
              data: [
                { type: 'max', name: 'Max' },
                { type: 'min', name: 'Min' },
              ],
              label: {
                color: '#FFFFFF',
              },
            },
            lineStyle: {
              color: '#2DFCC0',
            },
            data: series[2],
          },
          {
            name: 'P',
            type: 'line',
            smooth: true,
            markPoint: {
              data: [
                { type: 'max', name: 'Max' },
                { type: 'min', name: 'Min' },
              ],
              label: {
                color: '#fff',
              },
            },
            lineStyle: {
              color: '#381ae0',
            },
            data: series[3],
          },
        ];
        chartOption.series = originSeries;
      }
      if (detailType === '频率') {
        columns = [
          {
            title: '采集时间',
            dataIndex: 'time',
            key: 'time',
          },
          {
            title: 'F r ',
            dataIndex: 'A',
            key: 'A',
          },
        ];
        data.list.map((item: any, index: number) => {
          const column = {
            key: index,
            time: item.createDate.split(' ')[1],
            A: item.frequency,
          };
          if (judegeIsZD(item.createDate)) {
            series[0].push(item.frequency);
          }
          columnDataSource.push(column);
        });
        chartOption.series[0].data = series[0];
        chartOption.series[0].name = 'Fr';
        chartOption.series = [chartOption.series[0]];
        chartOption.yAxis.name = 'HZ';
      }
      if (detailType === '有功电能') {
        columns = [
          {
            title: '采集时间',
            dataIndex: 'time',
            key: 'time',
          },
          {
            title: 'EPI（KW.h） ',
            dataIndex: 'A',
            key: 'A',
          },
        ];
        data.list.map((item: any, index: number) => {
          const column = {
            key: index,
            time: item.createDate.split(' ')[1],
            A: item.activeElectricalEnergy,
          };
          if (judegeIsZD(item.createDate)) {
            series[0].push(item.activeElectricalEnergy);
          }
          columnDataSource.push(column);
        });
        chartOption.series[0].data = series[0];
        chartOption.series[0].name = 'EPI';
        chartOption.series = [chartOption.series[0]];
        chartOption.yAxis.name = 'KW.h';
      }
    }
    if (type === 2) {
      columns = [
        {
          title: '采集时间',
          dataIndex: 'time',
          key: 'time',
        },
        {
          title: 'qm（t） ',
          dataIndex: 'A',
          key: 'A',
        },
      ];
      data.list.map((item: any, index: number) => {
        const column = {
          key: index,
          time: item.createDate.split(' ')[1],
          A: item.flowCurrent,
        };
        if (judegeIsZD(item.createDate)) {
          series[0].push(item.flowCurrent);
        }
        columnDataSource.push(column);
      });
      chartOption.series[0].data = series[0];
      chartOption.series[0].name = 'qm';
      chartOption.series = [chartOption.series[0]];
      chartOption.yAxis.name = 't';
    }

    if (type === 3) {
      columns = [
        {
          title: '采集时间',
          dataIndex: 'time',
          key: 'time',
        },
        {
          title: 'qm（t） ',
          dataIndex: 'A',
          key: 'A',
        },
        {
          title: 'T（℃） ',
          dataIndex: 'B',
          key: 'B',
        },
        {
          title: 'p（MPa） ',
          dataIndex: 'C',
          key: 'C',
        },
      ];
      data.list.map((item: any, index: number) => {
        const column = {
          key: index,
          time: item.createDate.split(' ')[1],
          A: item.flowCurrent,
          B: item.flowRate,
          C: item.flow,
        };
        if (judegeIsZD(item.createDate)) {
          series[0].push(item.flowCurrent);
        }
        columnDataSource.push(column);
      });
      chartOption.series[0].data = series[0];
      chartOption.series[0].name = 'qm';
      chartOption.series = [chartOption.series[0]];
      chartOption.yAxis.name = 't';
    }

    if (type === 4 || type === 5 || type === 6) {
      columns = [
        {
          title: '采集时间',
          dataIndex: 'time',
          key: 'time',
        },
        {
          title: 'qm（t） ',
          dataIndex: 'A',
          key: 'A',
        },
        {
          title: 'T（℃） ',
          dataIndex: 'B',
          key: 'B',
        },
        {
          title: 'p（MPa） ',
          dataIndex: 'C',
          key: 'C',
        },
      ];
      data.list.map((item: any, index: number) => {
        const column = {
          key: index,
          time: item.createDate.split(' ')[1],
          A: item.flowCurrent,
          B: item.flowRate,
          C: item.flow,
        };
        if (judegeIsZD(item.createDate)) {
          series[0].push(item.flowCurrent);
        }
        columnDataSource.push(column);
      });
      chartOption.series[0].data = series[0];
      chartOption.series[0].name = 'qv';
      chartOption.series = [chartOption.series[0]];
      chartOption.yAxis.name = 'NM3';
    }
    setColumns([...columns]);
    setTimeout(() => {
      setDataSource([...columnDataSource]);
    }, 200);
    if (!data?.list?.length) {
      setChartData(undefined);
      return;
    }
    setChartData(Object.assign({}, chartOption));
  };

  useEffect(() => {
    if (options.length === 1) {
      form.setFieldsValue({ option: '限时流量' });
    } else {
      form.setFieldsValue({ option: options[0] });
    }
    if (!form.getFieldValue('date')) {
      form.setFieldsValue({ date: moment() });
    }
    getRealTimeRes();
  }, [options, tab, templateProps.area]);

  return (
    <RealBodyContainer>
      <div className="options-box">
        <div className="tab-box">
          <Tabs
            hideAdd
            defaultActiveKey={tab}
            type="editable-card"
            tabPosition={'top'}
            onChange={onTabChange}
          >
            <TabPane tab={'实时数据'} key={tabStatus.RealTime}></TabPane>
            <TabPane
              tab={'报警信息（二期）'}
              key={tabStatus.Warnning}
              disabled
            ></TabPane>
            <TabPane
              tab={'通讯状态（二期）'}
              key={tabStatus.Contact}
              disabled
            ></TabPane>
          </Tabs>
        </div>
        <div className="search-box">
          <Form
            form={form}
            name="dynamic_form_nest_item"
            onFinish={onFinish}
            autoComplete="off"
          >
            {tab === tabStatus.RealTime ? (
              <>
                <Form.Item name="option">
                  <Select
                    size="large"
                    style={{
                      width: '130px',
                    }}
                  >
                    {options.length > 1
                      ? options.map((item, index) => {
                          return (
                            <Option value={item} key={index}>
                              {item}
                            </Option>
                          );
                        })
                      : null}
                  </Select>
                </Form.Item>
                <Form.Item name="date">
                  <DatePicker
                    size="large"
                    name="date"
                    style={{ width: '140px' }}
                    allowClear={false}
                    disabledDate={(current) => {
                      return current && current > moment().endOf('day');
                    }}
                  />
                </Form.Item>
              </>
            ) : tab === tabStatus.Warnning ? (
              <>
                <Form.Item name="date">
                  <RangePicker
                    size="large"
                    name="date"
                    allowClear
                    disabledDate={(current) => {
                      return current && current >= moment().endOf('day');
                    }}
                  />
                </Form.Item>
              </>
            ) : (
              <>
                <Form.Item name="name">
                  <Input
                    size="large"
                    style={{ width: '130px', marginRight: '16px' }}
                    suffix={<SearchOutlined />}
                    placeholder="节点名称"
                  />
                </Form.Item>
                <Form.Item name="xinghao">
                  <Select
                    size="large"
                    style={{
                      width: '130px',
                    }}
                    placeholder="仪表型号"
                  >
                    <Option value="DTSF1352">DTSF1352/C</Option>
                    <Option value="DTSD1300">DTSD1300</Option>
                    <Option value="ADCE1542">ADCE1542</Option>
                  </Select>
                </Form.Item>
                <Form.Item name="type">
                  <Select
                    size="large"
                    style={{
                      width: '130px',
                    }}
                    placeholder="仪表类型"
                  >
                    <Option value="电表">电表</Option>
                    <Option value="水表">水表</Option>
                    <Option value="气表">气表</Option>
                  </Select>
                </Form.Item>
                <Form.Item name="status">
                  <Select
                    size="large"
                    style={{
                      width: '80px',
                    }}
                    placeholder="状态"
                  >
                    <Option value="在线">在线</Option>
                    <Option value="离线">离线</Option>
                    <Option value="异常">异常</Option>
                  </Select>
                </Form.Item>
              </>
            )}
            <Form.Item>
              <Button size="large" type="primary" htmlType="submit">
                查询
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
      {tab === tabStatus.RealTime ? (
        <>
          <div className="echart-box">
            <MyChartBox
              id="realTime-chartbox"
              loading={chartLoading}
              options={chartData}
            />
          </div>
          <Button size="large" type="primary">
            导出
          </Button>
        </>
      ) : null}
      <div className="table-box">
        <Table
          size="small"
          rowKey={'key'}
          key={'key'}
          dataSource={dataSource}
          columns={columns}
          pagination={{ pageSize: 10 }}
        />
      </div>
    </RealBodyContainer>
  );
};

export default RealPage;
