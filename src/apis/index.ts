import request from '@/utils/request';
// 新增设备
export const addEquipment = async (data: any) => {
  return await request('/ea/tbEquipment/add', {
    method: 'POST',
    data,
  });
};

// 新增区域
export const addRegion = async (data: any) => {
  return await request('/ea/tbRegion/add', {
    method: 'POST',
    data,
  });
};

// 区域详情接口
export const getRegionById = async (id: number) => {
  return await request('/ea/tbRegion/selectById', {
    method: 'POST',
    data: {
      id,
    },
  });
};

export interface getRegionListData {
  current: number;
  size: number;
  name: string;
}

// 区域分页查询列表
export const getRegionList = async (data: getRegionListData) => {
  return await request('/ea/tbRegion/selectList', {
    method: 'POST',
    data,
  });
};

// 区域树列表
export const getRegionTreeList = async () => {
  return await request('/ea/tbRegion/selectTreeList', {
    method: 'POST',
  });
};

//查字典
export const getDictionarySlectOptions = async (data: {
  groupCode: string;
}) => {
  return await request('/ea/dictionary/selectList', {
    method: 'POST',
    data,
  });
};
