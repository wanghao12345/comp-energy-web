const context = require.context('./', true, /js$/)
const moduleStores = {};
const whiteList = ['index']
context.keys().forEach(key => {
  // 获取读取到的文件名字并且截取
  const fileName = key.slice(2, -3);
  if (!whiteList.includes(fileName)) {
    //通过 context(key)导出文件内容
    const fileModule = context(key).default;
    moduleStores[fileName] = {
      ...fileModule
    };
  }
});
export const Api = {
  ...moduleStores
}