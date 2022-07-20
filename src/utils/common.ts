import { getDictionarySlectOptions } from '@/apis';
import moment, { Moment } from 'moment';

export const debounce = (fn: (params: any) => void, ms: number) => {
  let timer: any;
  return (...args: any) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn(args);
      timer = null;
    }, ms);
  };
};

export const formatNumer = (value: any, bit?: number) => {
  if (typeof value !== 'number') {
    if (value === 'Infinity') {
      return value;
    }
    return 0;
  }
  const cbit = bit || 2;
  let tzero = '1';
  Array.from({ length: cbit }).map(() => {
    tzero += '0';
  });
  const tvalue = Math.round(value * parseInt(tzero)) / parseInt(tzero);
  return tvalue;
};

export const formatDate = (d?: Date) => {
  const date = d || new Date();
  const yaer = date.getFullYear();
  let mon: any = date.getMonth() + 1;
  let day: any = date.getDate();
  if (mon < 10) {
    mon = '0' + mon;
  }
  if (day < 10) {
    day = '0' + day;
  }
  return `${yaer}-${mon}-${day}`;
};

export const formatTime = (realDay: Date, type?: number) => {
  let queryStartDate = '',
    queryEndDate = '';
  const date = realDay;
  const currentDate = new Date();
  const yaer = date.getFullYear();
  let mon: any = date.getMonth() + 1;
  let day: any = date.getDate();
  let hour: any = date.getHours();
  let minute: any = date.getMinutes();
  let second: any = date.getSeconds();
  if (mon < 10) {
    mon = '0' + mon;
  }
  if (day < 10) {
    day = '0' + day;
  }
  if (minute < 10) {
    minute = '0' + minute;
  }
  if (hour < 10) {
    hour = '0' + hour;
  }
  if (second < 10) {
    second = '0' + second;
  }
  queryStartDate = `${yaer}-${mon}-${day} 00:00:00`;
  const currentEnd = `${yaer}-${mon}-${day} 23:59:59`;
  queryEndDate = currentEnd;

  if (type === 2) {
    const { weekStart, weekEnd } = getWeek(date);
    queryStartDate = weekStart;
    queryEndDate = weekEnd;
  }

  if (type === 3) {
    const { monthStart, monthEnd } = getMonth(date);
    queryStartDate = monthStart;
    queryEndDate = monthEnd;
  }

  if (type === 4) {
    const { quarStart, quarEnd } = getQuar(date);
    queryStartDate = quarStart;
    queryEndDate = quarEnd;
  }
  //半年
  if (type === 5) {
  }

  //年

  if (type === 6) {
    const { yaerStart, yearEnd } = getYear(date);
    queryStartDate = yaerStart;
    queryEndDate = yearEnd;
  }

  if (new Date(queryEndDate).getTime() > currentDate.getTime()) {
    const yaer = currentDate.getFullYear();
    let mon: any = currentDate.getMonth() + 1;
    let day: any = currentDate.getDate();
    let hour: any = currentDate.getHours();
    let minute: any = currentDate.getMinutes();
    let second: any = currentDate.getSeconds();
    if (mon < 10) {
      mon = '0' + mon;
    }
    if (day < 10) {
      day = '0' + day;
    }
    if (minute < 10) {
      minute = '0' + minute;
    }
    if (hour < 10) {
      hour = '0' + hour;
    }
    if (second < 10) {
      second = '0' + second;
    }
    queryEndDate = `${yaer}-${mon}-${day} ${hour}:${minute}:${second}`;
  }

  return { queryStartDate, queryEndDate };
};

export const getWeek = (date: Date) => {
  var one_day = 86400000;
  var day = date.getDay();
  // 设置时间为当天的0点
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);
  var week_start_time = date.getTime() - (day - 1) * one_day;
  var week_end_time = date.getTime() + (7 - day) * one_day;
  var last = week_start_time - 2 * 24 * 60 * 60 * 1000;
  var next = week_end_time + 24 * 60 * 60 * 1000;
  const year = date.getFullYear();
  var month1: any = new Date(week_start_time).getMonth() + 1;
  var month2: any = new Date(week_end_time).getMonth() + 1;
  var day1: any = new Date(week_start_time).getDate();
  var day2: any = new Date(week_end_time).getDate();
  if (month1 < 10) {
    month1 = '0' + month1;
  }
  if (month2 < 10) {
    month2 = '0' + month2;
  }
  if (day1 < 10) {
    day1 = '0' + day1;
  }
  if (day2 < 10) {
    day2 = '0' + day2;
  }
  var time1 = month1 + '.' + day1;
  var time2 = month2 + '.' + day2;
  var map: any = new Map();
  map['stime'] = week_start_time; // 当前周周一零点的毫秒数
  map['etime'] = week_end_time; // 当前周周日零点的毫秒数
  map['stext'] = time1; // 当前周 周一的日期 mm.dd 如 03.14
  map['etext'] = time2; // 当前周 周日的日期 mm.dd 如 03.20
  map['last'] = last; // 上一周 周六零点的毫秒数
  map['next'] = next; // 下一周  周一零点的毫秒数
  map['text'] = time1 + '-' + time2;
  var start = `${year}-${month1}-${day1} 00:00:00`;
  var end = `${year}-${month2}-${day2} 23:59:59`;

  return {
    weekStart: start,
    weekEnd: end,
  };
};

export const getMonth = (date: Date) => {
  var y = date.getFullYear(); //获取年份
  var m: any = date.getMonth() + 1; //获取月份
  var d: any = new Date(y, m, 0).getDate(); //获取当月最后一日
  m = m < 10 ? '0' + m : m; //月份补 0
  return {
    monthStart: `${y}-${m}-01 00:00:00`,
    monthEnd: `${y}-${m}-${d} 23:59:59`,
  };
};

export const getQuar = (date: Date) => {
  var y = date.getFullYear(); //获取年份
  var m: any = date.getMonth() + 1; //获取月份
  var d: any = new Date(y, m, 0).getDate(); //获取当月最后一日
  let quarStart = '',
    quarEnd = '';
  if (m <= 3) {
    quarStart = `${y}-01-01 00:00:00`;
    d = new Date(y, 3, 0).getDate();
    quarEnd = `${y}-03-${d} 23:59:59`;
  }
  if (m > 3 && m <= 6) {
    quarStart = `${y}-04-01 00:00:00`;
    d = new Date(y, 6, 0).getDate();
    quarEnd = `${y}-06-${d} 23:59:59`;
  }
  if (m > 6 && m <= 9) {
    quarStart = `${y}-06-01 00:00:00`;
    d = new Date(y, 9, 0).getDate();
    quarEnd = `${y}-09-${d} 23:59:59`;
  }
  if (m > 9) {
    quarStart = `${y}-09-01 00:00:00`;
    d = new Date(y, 12, 0).getDate();
    quarEnd = `${y}-12-${d} 23:59:59`;
  }
  return { quarStart, quarEnd };
};

export const getYear = (date: Date) => {
  const yaer = date.getFullYear();
  const lastDay = new Date(yaer, 12, 0).getDate();
  return {
    yaerStart: `${yaer}-01-01 00:00:00`,
    yearEnd: `${yaer}-12-${lastDay} 23:59:59`,
  };
};

// 今天昨天明天时间处理 v==3为昨天。v==6为今天。v==9为明天
export function getTheDay(date: Date, v: number) {
  let b = 24 * 60 * 60 * 1000; //一天的时间
  let day = date; //当天的时间
  v == 3
    ? day.setTime(day.getTime() - b)
    : v == 6
    ? day.setTime(day.getTime())
    : day.setTime(day.getTime() + b);
  let dayMon =
    day.getMonth() + 1 >= 10 ? day.getMonth() + 1 : '0' + (day.getMonth() + 1);
  let dayDat = day.getDate() + 1 >= 10 ? day.getDate() : '0' + day.getDate();
  let s = day.getFullYear() + '-' + dayMon + '-' + dayDat;
  return s;
}
//获取本、上、下周开始结束时间
/**
 * @description 得到本、上、下周的起始、结束日期
 * @param {Number} n 不传或0代表本周，-1代表上周，1代表下周
 */
export function getTheWeek(date1: Date, n: number) {
  var now = date1;
  var year = now.getFullYear();
  var month = now.getMonth() + 1;
  var day = now.getDay(); //返回星期几的某一天;
  n = day == 0 ? n + 6 : n + (day - 1);
  now.setDate(now.getDate() - n);
  var date = now.getDate();
  var s =
    year +
    '-' +
    (month < 10 ? '0' + month : month) +
    '-' +
    (date < 10 ? '0' + date : date);
  return s;
}
//获取本、上、下月开始结束时间
/**
 * @description 得到本月、上月、下月的起始、结束日期
 * @param {Number} n 不传或0代表本月，-1代表上月，1代表下月
 */
export function Timetools(date1: Date, n: number) {
  var now = date1;
  var year = now.getFullYear();
  var month = now.getMonth() + 1 + n;
  var date = new Date(year, month, 1).getDate();
  var s =
    year +
    '-' +
    (month < 10 ? '0' + month : month) +
    '-' +
    (date < 10 ? '0' + date : date);
  return s;
}
//计算本上下季度
/*type='s'为开始时间，type='e'季度结束时间
  n=0,-1,1(本，上，下季度)
*/
export function getTheQuater(date: Moment, type: string, n: number) {
  let currentQuarter = date.quarter(); // 当前是第几季度
  let currentYear = date.year(); // 当前年
  let getQuar: any = currentQuarter + n;
  // 本季度开始
  if (type == 's') {
    let startMoth = moment(moment(currentYear + '-01-01').toDate()).quarter(
      getQuar,
    );
    return moment(startMoth).format('YYYY-MM-DD');
  } else if (type == 'e') {
    let endMonth: any = 3 * parseInt(getQuar); //当季度最后一个月
    /* 对月数进行格式化 */
    if (endMonth < 10) endMonth = '0' + endMonth;
    else endMonth += '';
    let endMonthDays = moment(currentYear + '-' + endMonth).daysInMonth(); // 末尾月天数
    let endDays = currentYear + '-' + endMonth + '-' + endMonthDays; //完整年月日整合
    return moment(endDays).format('YYYY-MM-DD');
  }
}

// export const getSelectOptionObj = async(obj: string[]) => {
//   const dictionary: any = {};
//   const mySove = () => {
//     obj.map(async (item: string, index: number) => {
//       const res: any = await getDictionarySlectOptions({ groupCode: item });
//       if (res?.meta?.code === 200) {
//         dictionary[item] = res?.data;
//       }
//     });
//     return dictionary;
//   }
//   let myPromise = new Promise((mySove) => {
//     mySove(555);
//   });
//   return myPromise;
// };

export function dateFtt(fmt: any, date: any) {
  var o: any = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    S: date.getMilliseconds(),
    // 毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + '').substr(4 - RegExp.$1.length),
    );
  for (var k in o)
    if (new RegExp('(' + k + ')').test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length),
      );
  return fmt;
}
export function addMonth(date: any, add: any) {
  if (date instanceof Date) {
    let nowMonth = date.getMonth();
    let newMonth = nowMonth + add;
    date.setMonth(newMonth);
    return date;
  }
}
export function fb(jsonOld: any, key: any, type: any, dateType: any) {
  if (!key) {
    return '';
  }
  let jsonOldData = jsonOld.data;
  for (let i = 0; i < jsonOldData.length; i++) {
    let x = jsonOldData[i].x;
    let len = jsonOldData[i].x.length;
    if (dateType == 2) {
      let upperDateStr = dateFtt(
        'yyyy-MM-dd',
        new Date(new Date(x).getTime() + 7 * 1000 * 60 * 60 * 24),
      );
      if (key == upperDateStr) {
        return type == 1 ? jsonOldData[i].x : jsonOldData[i].y;
      }
    } else if (dateType == 3) {
      if (key.substring(3, 5) == x.substring(8, 10)) {
        return type == 1 ? jsonOldData[i].x : jsonOldData[i].y;
      }
    } else if (dateType == 4) {
      let upperDateStr = dateFtt('yyyy-MM', addMonth(new Date(x), 3));
      if (key == upperDateStr) {
        return type == 1 ? jsonOldData[i].x : jsonOldData[i].y;
      }
    } else {
      let xStr =
        len == 2
          ? x
          : len == 7
          ? x.substring(5, 7)
          : len == 10
          ? x.substring(5, 10)
          : '';
      if (key == xStr) {
        return type == 1 ? jsonOldData[i].x : jsonOldData[i].y;
      }
    }
  }
  return '';
}
export function getTrendsNewArray(jsonOld: any, jsonCurr: any, dateType: any) {
  let jsonCurrData = jsonCurr.data;
  for (let i = 0; i < jsonCurrData.length; i++) {
    let x = jsonCurrData[i].x;
    let len = jsonCurrData[i].x.length;
    let xStr =
      len == 2
        ? x
        : len == 7
        ? x.substring(5, 7)
        : len == 10
        ? x.substring(5, 10)
        : '';
    xStr = dateType == 2 || dateType == 4 ? x : xStr;
    jsonCurrData[i].upperX = fb(jsonOld, xStr, 1, dateType);
    jsonCurrData[i].upperY = fb(jsonOld, xStr, 2, dateType);
  }
  return jsonCurr;
}
