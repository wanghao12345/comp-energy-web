import { extend } from 'umi-request';
import request from '@/utils/request';

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

export interface tbEarlyWarningAddProps {
  name: string;
  equipmentType: number;
  eventType: number;
  regionId: number;
  energyParameter: number;
  condition1: string;
  threshold1: number;
  condition2: string;
  threshold2: number;
  isEnable: number;
  remark: string;
}
//添加事件
export const tbEarlyWarningAdd = async (data: tbEarlyWarningAddProps) => {
  return await request('/ea/tbEarlyWarning/add', {
    method: 'POST',
    data,
  });
};

export interface tbEarlyWarningupdateByIdProps extends tbEarlyWarningAddProps {
  id: number;
}
//更新
export const tbEarlyWarningupdateById = async (
  data: tbEarlyWarningupdateByIdProps,
) => {
  return await request('/ea/tbEarlyWarning/updateById', {
    method: 'POST',
    data,
  });
};

export interface tbEarlyWarningdeleteByIdsProps {
  ids: number[];
}
//删除
export const tbEarlyWarningdeleteByIds = async (
  data: tbEarlyWarningdeleteByIdsProps,
) => {
  return await request('/ea/tbEarlyWarning/deleteByIds', {
    method: 'POST',
    data,
  });
};
//详情
export const tbEarlyWarningselectById = async (data: { id: number }) => {
  return await request('/ea/tbEarlyWarning/selectById', {
    method: 'POST',
    data,
  });
};
