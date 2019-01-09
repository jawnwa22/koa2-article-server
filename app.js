import koa from 'koa';
import logger from 'koa-logger';
import koaBody from 'koa-body';
import path from 'path';
import cors from 'koa2-cors';

import Router from './rest/routes/index';
import {env} from './config/common';
import response_middleware from './rest/middlewares/response';
import filter_middleware from './rest/middlewares/filter';
import './config/check_dir';
import './rest/models/db';

const app = new koa();
const port = env[process.env.NODE_ENV || 'development'].port;

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
app.use(Router.routes());

app.listen(port, () => {
  console.log(`✅  The server is running at http://localhost:${port}/`);
})