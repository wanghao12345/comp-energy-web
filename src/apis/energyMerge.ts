import request from '@/utils/request';

// 能源概况
export const energyConsumptionOverview = async (data: any) => {
  return await request('/ea/webEnergy/energyConsumptionOverview', {
    method: 'POST',
    data,
  });
};
// 损耗报表
export const selectEnergyLossByRegion = async (data: any) => {
  return await request('/ea/webEnergy/selectEnergyLossByRegion', {
    method: 'POST',
    data,
  });
};
