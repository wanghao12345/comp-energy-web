import request from '@/utils/request';
//energyType
//电  = 1;
//水  = 2;
//空气   = 3;
//氮气   = 4;
//天然气  = 5;
//蒸汽   = 6;

//dateType
// 日 = 1;
// 周 = 2;
// 月= 3;
// 季度= 4;
// 半年= 5;
// 全年 = 6;

export interface energyConsumptionOverviewData {
  energyType: number;
  dateType: number;
  queryStartDate: string;
  queryEndDate: string;
}
// 能源概况
export const energyConsumptionOverview = async (
  data: energyConsumptionOverviewData,
) => {
  return await request('/ea/webEnergy/energyConsumptionOverview', {
    method: 'POST',
    data,
  });
};

// 能源看板
export const energyConsumptionBulletinBoard = async (
  data: energyConsumptionOverviewData,
) => {
  return await request('/ea/webEnergy/energyConsumptionBulletinBoard', {
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
