import { SSL_OP_LEGACY_SERVER_CONNECT } from "constants";

/**
 * @description 统一try catch 处理中间件
 * @ 用于捕获内部错误，输出日志信息
 * 
 */

export default async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    let  errorMsg = err.message || 'unknown error!';
    ctx.error({msg: errorMsg })
  }
};
