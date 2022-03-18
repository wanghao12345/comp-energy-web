import { request } from 'umi';

export const getNews = async () => {
  return await request('https://autumnfish.cn/api/joke', {
    method: 'GET',
  });
};
