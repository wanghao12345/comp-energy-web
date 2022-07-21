import request from '@/utils/request';
// 新增节点
export const addTree = async (data: any) => {
  return await request('/ea/tbRegion/add', {
    method: 'POST',
    data,
  });
};
// 详情
export const findById = async (data: { id: number }) => {
  return await request('/ea/tbRegion/selectById', {
    method: 'POST',
    data,
  });
};

export interface updateRegionProps {
  id: number;
  name: string;
  parentId: number;
  isEnable: number;
}

// 详情
export const updateRegionById = async (data: updateRegionProps) => {
  return await request('/ea/tbRegion/updateById', {
    method: 'POST',
    data,
  });
};
