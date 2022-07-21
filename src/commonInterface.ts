export enum EnergyType {
  Electric = 1,
  Water = 2,
  Steam = 3,
  NaturalGas = 4,
  Nitrogen = 5,
  Air = 6,
}

export enum TimeType {
  Day = 1,
  Week = 2,
  Month = 3,
  Quarter = 4,
  HalfYear = 5,
  Year = 6,
}

//尖2峰1平4谷3
export enum MeterParameters {
  jian = '2',
  feng = '1',
  ping = '4',
  gu = '3',
}
export interface ITypeList {
  name: string;
  value: number;
  unit: string;
}

export const EnergyTypeList: ITypeList[] = [
  { name: '电', value: EnergyType.Electric, unit: 'kW.h' },
  { name: '水', value: EnergyType.Water, unit: 't' },
  { name: '蒸汽', value: EnergyType.Steam, unit: 't' },
  { name: '天然气', value: EnergyType.NaturalGas, unit: 'Nm3' },
  { name: '氮气', value: EnergyType.Nitrogen, unit: 'Nm3' },
  { name: '空气', value: EnergyType.Air, unit: 'Nm3' },
];

export const dayTypeList = [
  { name: '今日', value: 1 },
  { name: '本月', value: 3 },
  { name: '本年', value: 6 },
];

export const boardDayList = [
  { name: '日', value: 1, type: 'date' },
  { name: '周', value: 2, type: 'week' },
  { name: '月', value: 3, type: 'month' },
  { name: '季度', value: 4, type: 'quarter' },
  { name: '年', value: 6, type: 'year' },
];

export const boardDayListnoDay = [
  { name: '周', value: 2, type: 'week' },
  { name: '月', value: 3, type: 'month' },
  { name: '季度', value: 4, type: 'quarter' },
  { name: '年', value: 6, type: 'year' },
];
