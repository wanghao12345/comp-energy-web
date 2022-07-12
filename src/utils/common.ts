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
  if (typeof value !== 'number') return value;
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
