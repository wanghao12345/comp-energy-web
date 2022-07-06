export const typeList: ITypeList[] = [
  { name: '电', value: 1, unit: 'kw.h' },
  { name: '水', value: 2, unit: 't' },
  { name: '蒸汽', value: 3, unit: 't' },
  { name: '天然气', value: 4, unit: 'Nm3' },
  { name: '氮气', value: 5, unit: 'Nm3' },
  { name: '空气', value: 6, unit: 'Nm3' },
];

export interface ITypeList {
  name: string;
  value: number;
  unit: string;
}

export const dayTypeList = [
  { name: '今日', value: 1 },
  { name: '本月', value: 3 },
  { name: '本年', value: 6 },
];
