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
