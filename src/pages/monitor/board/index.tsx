import { useEffect, useState } from 'react';
import { Button } from 'antd';
import {
  BoardContainer,
  BoardTopContainer,
  BoardBottomContainer,
  BoardBottomLeftContainer,
  BoardBottomRightContainer,
} from './style';
import MyChartBox from '@/components/myChartsBox';
import {
  barChartOption1,
  barChartOption2,
  barChartOption3,
  ilineChartOption,
} from './data';
import { energyConsumptionOverview } from '@/apis/energyMerge';
import { formatDate, formatNumer, formatTime } from '@/utils/common';
import { MonitorBoardData, monitorDataBoard } from '@/apis/monitor';
import { EnergyType, EnergyTypeList, TimeType } from '@/commonInterface';

interface chartProps {
  x: string;
  y: number;
}

const BoardPage = () => {
  return (
    <BoardContainer>
      <BoardTop />
      <BoardBottomContainer>
        <BoardBottomLeft />
        <BoardBottomRight />
      </BoardBottomContainer>
    </BoardContainer>
  );
};

const BoardTop = () => {
  const [dBarChartOption, setDbarChartOption] = useState<any>();
  const [sBarChartOption, setSbarChartOption] = useState<any>();
  const [QBarChartOption, setQbarChartOption] = useState<any>();

  const [dloading, setDloading] = useState(1);
  const [sloading, setSloading] = useState(1);
  const [qloading, setQloading] = useState(1);

  useEffect(() => {
    getChartOption();
  }, []);

  const getChartOption = () => {
    const { queryStartDate, queryEndDate } = formatTime(new Date(), 6);
    const qsd = queryStartDate.split(' ')[0];
    const qed = queryEndDate.split(' ')[0];

    const thisYear = qsd.split('-')[0];
    const lastYear = parseInt(thisYear) - 1;
    //年用电-去年
    const dchartOption = barChartOption1;
    energyConsumptionOverview({
      energyType: EnergyType.Electric,
      dateType: TimeType.Year,
      queryStartDate: qsd.replace(
        qsd.split('-')[0],
        ((qsd.split('-')[0] as any) - 1) as any,
      ),
      queryEndDate: qed.replace(
        qsd.split('-')[0],
        ((qsd.split('-')[0] as any) - 1) as any,
      ),
    }).then((res: any) => {
      if (res?.meta?.code === 200) {
        const { xAxisData, seriesData } = formChartData(res.data);
        dchartOption.xAxis.data = xAxisData;
        dchartOption.series[0].data = seriesData;
        dchartOption.series[0].name = lastYear.toString();
        //年用电-当年
        energyConsumptionOverview({
          energyType: EnergyType.Electric,
          dateType: TimeType.Year,
          queryStartDate: qsd,
          queryEndDate: qed,
        }).then((res: any) => {
          if (res?.meta?.code === 200) {
            setDloading(0);
            if (!res?.data?.length) {
              return;
            }
            const { seriesData } = formChartData(res.data);
            dchartOption.series[1].data = seriesData;
            dchartOption.series[1].name = thisYear;
            setDbarChartOption(dchartOption);
          }
        });
      }
    });

    //年用水-去年
    const schartOption = barChartOption2;
    energyConsumptionOverview({
      energyType: EnergyType.Water,
      dateType: TimeType.Year,
      queryStartDate: qsd.replace(
        qsd.split('-')[0],
        ((qsd.split('-')[0] as any) - 1) as any,
      ),
      queryEndDate: qed.replace(
        qsd.split('-')[0],
        ((qsd.split('-')[0] as any) - 1) as any,
      ),
    }).then((res: any) => {
      if (res?.meta?.code === 200) {
        setSloading(0);
        if (!res?.data?.length) {
          return;
        }
        const { xAxisData, seriesData } = formChartData(res.data);
        schartOption.xAxis.data = xAxisData;
        schartOption.series[0].data = seriesData;
        //年用水-当年
        energyConsumptionOverview({
          energyType: EnergyType.Water,
          dateType: TimeType.Year,
          queryStartDate: qsd,
          queryEndDate: qed,
        }).then((res: any) => {
          if (res?.meta?.code === 200) {
            const { seriesData } = formChartData(res.data);
            schartOption.series[1].data = seriesData;
            schartOption.yAxis.name = 'T';
            setSbarChartOption(schartOption);
          }
        });
      }
    });

    //年用天然气-去年
    const qchartOption = barChartOption3;
    energyConsumptionOverview({
      energyType: EnergyType.NaturalGas,
      dateType: TimeType.Year,
      queryStartDate: qsd.replace(
        qsd.split('-')[0],
        ((qsd.split('-')[0] as any) - 1) as any,
      ),
      queryEndDate: qed.replace(
        qsd.split('-')[0],
        ((qsd.split('-')[0] as any) - 1) as any,
      ),
    }).then((res: any) => {
      if (res?.meta?.code === 200) {
        setQloading(0);
        if (!res?.data?.length) {
          return;
        }
        const { xAxisData, seriesData } = formChartData(res.data);
        qchartOption.xAxis.data = xAxisData;
        qchartOption.series[0].data = seriesData;
        //年用天然气-当年
        energyConsumptionOverview({
          energyType: EnergyType.NaturalGas,
          dateType: TimeType.Year,
          queryStartDate: qsd,
          queryEndDate: qed,
        }).then((res: any) => {
          if (res?.meta?.code === 200) {
            const { seriesData } = formChartData(res.data);
            qchartOption.series[1].data = seriesData;
            qchartOption.yAxis.name = 'NM3';
            setQbarChartOption(qchartOption);
          }
        });
      }
    });
  };

  const formChartData = (data: chartProps[]) => {
    const xAxisData: string[] = [];
    const seriesData: number[] = [];
    data.map((item) => {
      let day = item.x.split('-')[1];
      xAxisData.push(day);
      seriesData.push(formatNumer(item.y));
    });
    return {
      xAxisData,
      seriesData,
    };
  };

  return (
    <BoardTopContainer>
      <h3>年能耗趋势图</h3>
      <div className="charts-box">
        <div className="chart-box">
          <h4>年用电趋势图</h4>
          <div className="chart-content-box">
            <MyChartBox
              id="d-barchart-board"
              options={dBarChartOption}
              loading={dloading}
            ></MyChartBox>
          </div>
        </div>
        <div className="chart-box">
          <h4>年用水趋势图</h4>
          <div className="chart-content-box"></div>
          <MyChartBox
            id="s-barchart-board"
            options={sBarChartOption}
            loading={sloading}
          ></MyChartBox>
        </div>
        <div className="chart-box">
          <h4>年用气趋势图</h4>
          <div className="chart-content-box"></div>
          <MyChartBox
            id="g-barchart-board"
            options={QBarChartOption}
            loading={qloading}
          ></MyChartBox>
        </div>
      </div>
    </BoardTopContainer>
  );
};

const BoardBottomLeft = () => {
  const [eneryData, setEneryData] = useState<MonitorBoardData>();
  useEffect(() => {
    monitorDataBoard({
      queryStartDate: formatDate(),
    }).then((res: any) => {
      if (res?.meta?.code === 200) {
        const data = res?.data;
        const keys = Object.keys(data);
        keys.map((item) => {
          data[item] = formatNumer(data[item], 3);
        });
        setEneryData(data);
      }
    });
  }, []);
  return (
    <BoardBottomLeftContainer>
      <h3>能耗数据</h3>
      <div className="data-item-box">
        <div className="title-box">用电能耗（kW.h)</div>
        <div className="item-box">
          <span>日用电量</span>
          <span>{eneryData?.dayElectric}</span>
        </div>
        <div className="item-box">
          <span>月用电量</span>
          <span>{eneryData?.mouthElectric}</span>
        </div>
        <div className="item-box">
          <span>年用电量</span>
          <span>{eneryData?.yearElectric}</span>
        </div>
      </div>
      <div className="data-item-box">
        <div className="title-box">用水能耗（t)</div>
        <div className="item-box">
          <span>日用水量</span>
          <span>{eneryData?.dayWater}</span>
        </div>
        <div className="item-box">
          <span>月用水量</span>
          <span>{eneryData?.mouthWater}</span>
        </div>
        <div className="item-box">
          <span>年用水量</span>
          <span>{eneryData?.yearWater}</span>
        </div>
      </div>
      <div className="data-item-box">
        <div className="title-box">用天然气能耗（Nm3)</div>
        <div className="item-box">
          <span>日用气量</span>
          <span>{eneryData?.dayGasNatural}</span>
        </div>
        <div className="item-box">
          <span>月用气量</span>
          <span>{eneryData?.dayGasNatural}</span>
        </div>
        <div className="item-box">
          <span>年用气量</span>
          <span>{eneryData?.yearGasNatural}</span>
        </div>
      </div>
      <div className="data-item-box">
        <div className="title-box">用蒸汽能耗（Nm3)</div>
        <div className="item-box">
          <span>日用蒸汽量</span>
          <span>{eneryData?.dayGasSteam}</span>
        </div>
        <div className="item-box">
          <span>月用蒸汽量</span>
          <span>{eneryData?.mouthGasSteam}</span>
        </div>
        <div className="item-box">
          <span>年用蒸汽量</span>
          <span>{eneryData?.yearGasSteam}</span>
        </div>
      </div>
      <div className="data-item-box">
        <div className="title-box">用氮气能耗（Nm3)</div>
        <div className="item-box">
          <span>日用氮气量</span>
          <span>{eneryData?.dayGasNitrogen}</span>
        </div>
        <div className="item-box">
          <span>月用氮气量</span>
          <span>{eneryData?.mouthGasNitrogen}</span>
        </div>
        <div className="item-box">
          <span>年用氮气量</span>
          <span>{eneryData?.yearGasNitrogen}</span>
        </div>
      </div>
      <div className="data-item-box">
        <div className="title-box">用空气能耗（Nm3)</div>
        <div className="item-box">
          <span>日用空气量</span>
          <span>{eneryData?.dayGasAir}</span>
        </div>
        <div className="item-box">
          <span>月用空气量</span>
          <span>{eneryData?.mouthGasAir}</span>
        </div>
        <div className="item-box">
          <span>年用空气量</span>
          <span>{eneryData?.yearGasAir}</span>
        </div>
      </div>
    </BoardBottomLeftContainer>
  );
};

const BoardBottomRight = () => {
  const [tabStatus, setTabStatus] = useState(EnergyType.Steam);
  const [lineChartOption, setLineChartOption] = useState<any>();
  const [loading, setLoading] = useState(1);
  const shiftTabStatus = (tab: EnergyType) => {
    setTabStatus(tab);
  };
  useEffect(() => {
    drawEcharts(tabStatus);
  }, [tabStatus]);

  const drawEcharts = (type: EnergyType) => {
    const { queryStartDate, queryEndDate } = formatTime(
      new Date(),
      TimeType.Year,
    );
    const qsd = queryStartDate.split(' ')[0];
    const qed = queryEndDate.split(' ')[0];
    energyConsumptionOverview({
      energyType: type,
      dateType: TimeType.Year,
      queryStartDate: qsd,
      queryEndDate: qed,
    }).then((res: any) => {
      setLoading(0);
      if (res?.meta?.code === 200) {
        const { xAxisData, seriesData } = formChartData(res.data);
        ilineChartOption.xAxis.data = xAxisData;
        ilineChartOption.series[0].data = seriesData;
        ilineChartOption.yAxis.name = EnergyTypeList[type - 1].unit;
        setLineChartOption(Object.assign({}, ilineChartOption));
      }
    });
  };

  const formChartData = (data: chartProps[]) => {
    const xAxisData: string[] = [];
    const seriesData: number[] = [];
    data.map((item) => {
      let day = item.x;
      xAxisData.push(day);
      seriesData.push(formatNumer(item.y));
    });
    return {
      xAxisData,
      seriesData,
    };
  };

  return (
    <BoardBottomRightContainer>
      <div className="option-box">
        <h3>能耗趋势</h3>
        <div className="tab-box">
          <Button
            onClick={() => {
              shiftTabStatus(EnergyType.Electric);
            }}
            type={tabStatus === EnergyType.Electric ? 'primary' : 'default'}
          >
            电
          </Button>
          <Button
            onClick={() => {
              shiftTabStatus(EnergyType.Water);
            }}
            type={tabStatus === EnergyType.Water ? 'primary' : 'default'}
          >
            水
          </Button>
          <Button
            onClick={() => {
              shiftTabStatus(EnergyType.NaturalGas);
            }}
            type={tabStatus === EnergyType.NaturalGas ? 'primary' : 'default'}
          >
            天然气
          </Button>
          <Button
            onClick={() => {
              shiftTabStatus(EnergyType.Steam);
            }}
            type={tabStatus === EnergyType.Steam ? 'primary' : 'default'}
          >
            蒸汽
          </Button>
          <Button
            onClick={() => {
              shiftTabStatus(EnergyType.Nitrogen);
            }}
            type={tabStatus === EnergyType.Nitrogen ? 'primary' : 'default'}
          >
            氮气
          </Button>
          <Button
            onClick={() => {
              shiftTabStatus(EnergyType.Air);
            }}
            type={tabStatus === EnergyType.Air ? 'primary' : 'default'}
          >
            空气
          </Button>
        </div>
      </div>
      <div className="charts-box">
        <MyChartBox
          id="barchartbox-mboard"
          options={lineChartOption}
          loading={loading}
        ></MyChartBox>
      </div>
    </BoardBottomRightContainer>
  );
};
export default BoardPage;
