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

export interface tbEarlyWarningSelectListProps {
  current: number;
  size: number;
}
//事件列表
export const tbEarlyWarningSelectList = async (
  data: tbEarlyWarningSelectListProps,
) => {
  return await request('/ea/tbEarlyWarning/selectList', {
    method: 'POST',
    data,
  });
};
