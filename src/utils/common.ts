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

export const formatNumer = (value: number, bit?: number) => {
  if (typeof value !== 'number') return 1;
  const cbit = bit || 2;
  let tzero = '1';
  Array.from({ length: cbit }).map(() => {
    tzero += '0';
  });
  const tvalue = Math.round(value * parseInt(tzero)) / parseInt(tzero);
  return tvalue;
};

export const formatDate = () => {
  const date = new Date();
  const yaer = date.getFullYear();
  let mon: any = date.getMonth();
  let day: any = date.getDate();
  if (mon < 10) {
    mon = '0' + mon;
  }
  if (day < 10) {
    day = '0' + day;
  }
  return `${yaer}-${mon}-${day}`;
};
