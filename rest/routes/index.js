import Router from 'koa-router';
import articleRouter from './article/index';
import categoryRouter from './category/index';

const router = new Router({
  prefix: '/api'
});

router
  .use(articleRouter.routes(), articleRouter.allowedMethods())
  .use(categoryRouter.routes(), categoryRouter.allowedMethods())

export default router;

