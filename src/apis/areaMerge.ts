import request from '@/utils/request';
export interface queryTreeProps {
  current: number;
  size: number;
  name?: string;
}
// 区域节点树
export const queryTree = async (data: queryTreeProps) => {
  return await request('/ea/tbRegion/selectTreeList', {
    method: 'POST',
    data,
  });
};
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
