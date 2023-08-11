import { defineConfig } from 'umi';
export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index' },
    {
      path: '/guess',
      component: '@/pages/guess',
      wrappers: ['@/wrappers/auth',],
    }
  ],
  fastRefresh: {},
});
