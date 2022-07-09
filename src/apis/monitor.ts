import request from '@/utils/request';

// queryStartDate: '2022-03-01 00:00:00';
// queryEndDate: '2022-03-01 23:59:59';

export interface dayRealTimeProps {
  queryStartDate: string;
  queryEndDate: string;
  regionId: number;
  energyType: number;
}

// 数据监控-实时数据
export const dayRealTime = async (data: dayRealTimeProps) => {
  return await request('/ea/webEnergy/dayRealTime', {
    method: 'POST',
    data,
  });
};
