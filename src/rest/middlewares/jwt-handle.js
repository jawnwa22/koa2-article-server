/**
 * @description 捕获jwt的错误码并加工
 * 
 */

export default async (ctx, next) => {
  return next().catch((err) => {
    if (err.status === 401) {
      ctx.error({
        status: 401, 
        msg: err.originalError ? err.originalError.message : err.message})
    } else {
      throw err;
    }
  })
}