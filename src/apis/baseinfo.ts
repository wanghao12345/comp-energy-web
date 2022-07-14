import request from '@/utils/request';

export interface baseEnergyElectric {
  type: number;
  queryStartDate: string;
  queryEndDate: string;
  regionIdList: number[];
  current: number;
  size: number;
}
//基本参数列表
export const getEnergyElectricData = async (data: baseEnergyElectric) => {
  const requestUrl = [
    '',
    '/ea/energyElectric/selectList',
    '/ea/energyWater/selectList',
    '/ea/energyGasSteam/selectList',
    '/ea/energyGasNatural/selectList',
    '/ea/energyGasNitrogen/selectList',
    '/ea/energyGasAir/selectList',
  ];
  return await request(requestUrl[data.type], {
    method: 'POST',
    data,
  });
};
