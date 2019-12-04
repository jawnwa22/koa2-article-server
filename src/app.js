import koa from 'koa';
import logger from 'koa-logger';
import koaBody from 'koa-body';
import path from 'path';
import cors from 'koa2-cors';
import jwt from 'koa-jwt';

import Router from './rest/routes/index';
import config from './config/env';
import response_middleware from './rest/middlewares/response';
import filter_middleware from './rest/middlewares/filter';
import jwt_middleware from './rest/middlewares/jwt-handle';
import './config/check_dir';
import './rest/models/db';

const app = new koa();
const port = config.port;
const secret = config.secret;

app
  .use(logger())
  .use(koaBody({
    multipart:true,
    formidable: {
      maxFileSize: 1024*1024*20, // 设置可接受的文件最大为20M
      keepExtensions: true,      // 带拓展名上传， 否则上传的会是二进制文件而不是图片
      onFileBegin(name, file) {
        file.path = __dirname + '/uploads/' + file.name;  //重命名上传的文件
      },
      uploadDir: path.join(__dirname, 'uploads')
    }
  }))
  .use(cors())


app.use(response_middleware);
app.use(filter_middleware);
app.use(jwt_middleware);
app.use(jwt({
    secret
  }).unless({
    //除了URL带 /admin 的API需要认证token，其他的API都不需要认证
    path: /^(?!.*admin).*/
  }))
app.use(Router.routes());

app.listen(port, () => {
  console.log(`✅  The server is running at http://localhost:${port}/`);
})