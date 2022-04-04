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
      target: 'http://117.50.98.136',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },
});
