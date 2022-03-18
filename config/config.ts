import { defineConfig } from 'umi';
import routes from './routes';

export default defineConfig({
  layout: {
    menu: {},
  },
  mfsu: {},
  nodeModulesTransform: {
    type: 'none',
  },
  routes: routes,
  fastRefresh: {},
});
