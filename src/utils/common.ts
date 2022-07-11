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

export const formatTime = (realDay: Date) => {
  const date = realDay;
  const yaer = date.getFullYear();
  let mon: any = date.getMonth();
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
  return {
    queryStartDate: `${yaer}-${mon}-${day} 00:00:00`,
    queryEndDate: `${yaer}-${mon}-${day} ${hour}:${minute}:${second}`,
  };
};
