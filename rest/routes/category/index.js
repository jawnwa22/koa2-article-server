/**
 * @description 管理文章类别的接口配置
 * 
 */

import Router from 'koa-router';
import Category from '../../controllers/category';

const router = new Router();

router
  .post('/category', Category.add);


export default router;