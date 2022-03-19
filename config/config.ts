import { defineConfig } from 'umi';
import routes from './routes';

export default defineConfig({
  // layout: {
  //   menu: {},
  //   siderWidth: 216,
  //   contentStyle: {
  //     backgroundColor: '#142655'
  //   }
  // },
  mfsu: {},
  nodeModulesTransform: {
    type: 'none',
  },
  routes: routes,
  fastRefresh: {},
});
