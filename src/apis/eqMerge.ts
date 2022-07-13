import request from '@/utils/request';

// 分页
export const queryList = async (data: any) => {
  return await request('/ea/tbEquipment/selectList', {
    method: 'POST',
    data,
  });
};
// 新增设备
export const eqAdd = async (data: any) => {
  return await request('/ea/tbEquipment/add', {
    method: 'POST',
    data,
  });
};
