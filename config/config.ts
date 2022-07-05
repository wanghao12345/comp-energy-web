import { defineConfig } from 'umi';
import routes from './routes';

export default defineConfig({
  theme: {
    '@primary-color': '#347D9B',
    '@font-size-base': '14px',
    '@text-color': '#ffffff',
    '@border-radius-base': '4px',
    '@border-color-base': '#438CAC',
  },
  mfsu: {},
  nodeModulesTransform: {
    type: 'none',
  },
  routes: routes,
  fastRefresh: {},
  dva: {
    immer: true,
    hmr: true,
  },
  proxy: {
    '/api': {
      target: 'http://47.113.119.138',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },
});
