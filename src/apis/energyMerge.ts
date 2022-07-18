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

export interface energyConsumptionBulletinBoardDate
  extends energyConsumptionOverviewData {
  regionIdList?: number[];
}
// 能源概况
export const energyConsumptionOverview = async (
  data: energyConsumptionBulletinBoardDate,
) => {
  return await request('/ea/webEnergy/energyConsumptionOverview', {
    method: 'POST',
    data,
  });
};

// 能源看板
export const energyConsumptionBulletinBoard = async (
  data: energyConsumptionBulletinBoardDate,
) => {
  return await request('/ea/webEnergy/energyConsumptionBulletinBoard', {
    method: 'POST',
    data,
  });
};

export interface selectEnergyLossByRegionProps {
  energyType: number;
  queryStartDate: string;
  queryEndDate: string;
  regionIdList?: number[];
}

// 损耗报表
export const selectEnergyLossByRegion = async (
  data: selectEnergyLossByRegionProps,
) => {
  return await request('/ea/webEnergy/selectEnergyLossByRegion', {
    method: 'POST',
    data,
  });
};

export interface energyConsumptionOverviewQOQProps {
  energyType: number;
  queryStartDate: string;
}
// 用能概况环比
export const energyConsumptionOverviewQOQ = async (
  data: energyConsumptionOverviewQOQProps,
) => {
  return await request('/ea/webEnergy/energyConsumptionOverviewQOQ', {
    method: 'POST',
    data,
  });
};

export interface selectTrendAnalysisQOQByRegionIdsProps {
  energyType: number;
  dateType: number;
  queryStartDate: string;
  regionIdList: number[];
}

// 趋势分析-同比分析
export const selectTrendAnalysisYOYByRegionIds = async (
  data: selectTrendAnalysisQOQByRegionIdsProps,
) => {
  return await request('/ea/webEnergy/selectTrendAnalysisYOYByRegionIds', {
    method: 'POST',
    data,
  });
};

// 趋势分析-环比分析
export const selectTrendAnalysisQOQByRegionIds = async (
  data: selectTrendAnalysisQOQByRegionIdsProps,
) => {
  return await request('/ea/webEnergy/selectTrendAnalysisQOQByRegionIds', {
    method: 'POST',
    data,
  });
};

export interface energyElectricselectListProps {
  queryStartDate: string;
  queryEndDate: string;
  regionIdList: number[];
  dateType: number;
  energyType: number;
}

//接口：能源管理-用能报表
export const energyElectricselectList = async (
  data: energyElectricselectListProps,
) => {
  return await request('/ea/webEnergy/energyConsumptionReportForm', {
    method: 'POST',
    data,
  });
};
