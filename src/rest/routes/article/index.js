/**
 * @description 管理文章的接口配置
 */

import Router from 'koa-router';
import Article from '../../controllers/article';

const router = new Router();

router
  .post('/admin/article', Article.upload)                     // 上传文章
  .put('/admin/article/:id', Article.update)                  // 更新文章
  .delete('/admin/article/:id', Article.delete)               // 删除文章
  .get('/article/list', Article.getArticleList)               // 获取文章列表
  .get('/article/total_page', Article.get_totoal_page)  // 获取总页数
  .get('/article/:id', Article.get_article)             // 获取文章内容


export default router