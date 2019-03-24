/**
 * @description 管理后台用户的路由配置
 */


import Router from 'koa-router';
import User from '../../controllers/user';

const router = new Router();

router
  .post('/register', User.createUser)
  .post('/login', User.signIn)
  .post('/refresh_token', User.authRefreshToken)
  .get('/admin/auth_token', User.tokenTest)
  .post('/website_info', User.setWebInfo)
  .get('/website_info', User.getWebInfo)


export default router;