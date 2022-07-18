import request from '@/utils/request';

// {
// "queryStartDate":"2022-03-14",
// "dateType":1,
// "regionIdList":[1,2]
// }
export interface electricMultiRateProps {
  queryStartDate: string;
  queryEndDate?: string;
  dateType: number;
  regionIdList: number[];
}
//报表统计-复费率统计
export const electricMultiRate = async (data: electricMultiRateProps) => {
  return await request('/ea/webEnergy/electricMultiRate', {
    method: 'POST',
    data,
  });
};
