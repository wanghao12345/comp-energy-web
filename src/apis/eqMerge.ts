import request from '@/utils/request';

export interface getEquipmentListProps {
  current: number;
  size: number;
  type?: number; //设备类型
  name?: string; //设备名称
  model?: string; //仪表型号
  manufacturer?: string; //生产厂家
  equipmentCode?: number; //设备的编号
  regionId?: string;
  isEnable?: number;
}
// 接口：设备列表
export const getTbEquipmentList = async (data: getEquipmentListProps) => {
  return await request('/ea/tbEquipment/selectList', {
    method: 'POST',
    data,
  });
};

export interface equipmentDetail {
  equipmentCode: number;
  regionId: number;
  name: string;
  model: string;
  type: number;
  isEnable: number;
  manufacturer: string;
  manufactureDate: string;
  verificationDate: string;
  verificationCycle: number;
  remark: string;
}
// 新增设备
export const tbEquipmentAdd = async (data: equipmentDetail) => {
  return await request('/ea/tbEquipment/add', {
    method: 'POST',
    data,
  });
};

//接口：设备详情接口
export const getTbEquipmentDetail = async (data: { id: number }) => {
  return await request('/ea/tbEquipment/selectById', {
    method: 'POST',
    data,
  });
};

export interface updateTbequipmentProps extends equipmentDetail {
  id: number;
}

//接口：修改设备信息
export const updateTbEquipmentDetail = async (data: updateTbequipmentProps) => {
  return await request('/ea/tbEquipment/updateById', {
    method: 'POST',
    data,
  });
};
