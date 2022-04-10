import request from '@/utils/request';

// 分页
export const queryList = async (data: any) => {
  return await request('/ea/tbEquipment/selectList', {
    method: 'POST',
    data,
  });
};
// // 损耗报表
// export const selectEnergyLossByRegion = async (data: any) => {
//   return await request('/ea/webEnergy/selectEnergyLossByRegion', {
//     method: 'POST',
//     data,
//   });
// };
