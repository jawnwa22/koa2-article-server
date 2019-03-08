/**
 * @description 管理后台用户的路由配置
 */


import Router from 'koa-router';
import User from '../../controllers/user';

const router = new Router();

router
  .post('/register', User.create_user)
  .post('/login', User.signIn)
  .post('/refresh_token', User.auth_refresh_token)
  .get('/admin/auth_token', User.token_test)


export default router;