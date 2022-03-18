import type { RunTimeLayoutConfig, RequestConfig } from 'umi';

export function onRouteChange({ location, routes, action }) {
  // console.log(location, routes, action);
}

// export const layout: RunTimeLayoutConfig = () => {
//   return {
//     headerContentRender:()=>1234,
//     rightContentRender:()=>'HeaderContent',
//     footerRender: () => '我是footer',
//     onPageChange:()=>{
//       console.log('pageChange');
//     },
//     // breadcrumbRender:
//     // loading:true,
//     menuHeaderRender:()=>(<div style={{color:'#fff'}}>'menuHeaderRender'</div>),
//     childrenRender: (children, props) =>{
//       return (
//         children
//       )
//     }
//   }
// }

export const request: RequestConfig = {
  // prefix: process.env.NODE_ENV === "production" ? config.baseurl :'api/',
  credentials: 'include',
  // errorHandler,
  // 自定义端口规范
  errorConfig: {
    adaptor: (res) => {
      return {
        success: res.code == 200,
        data: res.data,
        errorCode: res.code,
        errorMessage: res.msg,
      };
    },
  },
  middlewares: [],
};
