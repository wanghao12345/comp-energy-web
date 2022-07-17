import request from '@/utils/request';

// queryStartDate: '2022-03-01 00:00:00';
// queryEndDate: '2022-03-01 23:59:59';

export interface dayRealTimeProps {
  queryStartDate: string;
  queryEndDate: string;
  regionId: number;
  energyType: number;
}

export interface MonitorBoardData {
  dayElectric: string;
  dayWater: string;
  dayGasAir: string;
  dayGasNitrogen: string;
  dayGasNatural: string;
  dayGasSteam: string;
  mouthElectric: string;
  mouthWater: string;
  mouthGasAir: string;
  mouthGasNitrogen: string;
  mouthGasNatural: string;
  mouthGasSteam: string;
  yearElectric: string;
  yearWater: string;
  yearGasAir: string;
  yearGasNitrogen: string;
  yearGasNatural: string;
  yearGasSteam: string;
}

// 数据监控-实时数据
export const dayRealTime = async (data: dayRealTimeProps) => {
  return await request('/ea/webEnergy/dayRealTime', {
    method: 'POST',
    data,
  });
};

// 数据监控-数据看板
export const monitorDataBoard = async (data: { queryStartDate: string }) => {
  return await request('/ea/webEnergy/dataBoard', {
    method: 'POST',
    data,
  });
};
