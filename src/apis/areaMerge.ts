import request from '@/utils/request';
// 新增节点
export const addTree = async (data: any) => {
  return await request('/ea/tbRegion/add', {
    method: 'POST',
    data,
  });
};
// 详情
export const findById = async (data: any) => {
  return await request('/ea/tbRegion/selectById', {
    method: 'POST',
    data,
  });
};
