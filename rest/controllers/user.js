/**
 * @description 管理用户的相关接口层
 * 
 */

import md5 from 'md5';
import jwt from 'jsonwebtoken';
import { UserModel, BlogModel } from '../models/index';
import {env} from '../../config/common';

const secret = env[process.env.NODE_ENV || 'development'].secret; 
class BackendUser {

  static async createUser(ctx) {
    const { username, password } = ctx.request.body;

    //添加账号到数据库
    const addUser = (username, password) => {
      let user = {
        username,
        password: md5(password)
      }
      return UserModel.create(user);
    }

    let isExist = null;

    (!username || !password) ? 
      ctx.error({msg:'账号或密码为空！'}) :
      isExist = (await UserModel.findOne({username}))
    
    isExist ? 
      ctx.error({msg: '该账号已存在!'}) :
      (await addUser(username, password)) &&
      ctx.success({msg: '注册成功！'})

  }

  /**
   * 获取前端传递来的用户名和密码
   * 过滤一次信息 查看用户或密码是否为空
   * 查询用户名
   */
  static async signIn(ctx) {
    const { username, password } = ctx.request.body;
    console.log(ctx.request.body);
    
    let isExist = null;

    (!username || !password) ? 
      ctx.error({msg:'账号或密码为空！'}) :
      (isExist = (await UserModel.findOne({username})))

    // 生成token
    const getToken = (secret) => {
      let payload = {
        username
      }

      const token = jwt.sign(payload, secret, {expiresIn: '1h'});
      const refresh_token = jwt.sign(payload, secret, {expiresIn: '2h'});
      return {
        token,
        refresh_token
      }
    }

    isExist && (isExist.password === md5(password)) ?
      ctx.success({
        msg: '登陆成功！',
        data: getToken(secret)  
      }) :
      ctx.error({msg: '账号或密码错误！'})
      
    
  }

  static async authRefreshToken(ctx) {
    const { refreshToken } = ctx.request.body

    // 生成token的函数
    const getToken = (username, secret) => {
      let payload = {
        username
      }

      const token = jwt.sign(payload, secret, {expiresIn: '1h'});
      const refresh_token = jwt.sign(payload, secret, {expiresIn: '2h'});
      return {
        token,
        refresh_token
      }
    }

    jwt.verify(refreshToken, secret, (err, decoded) => {
      if (err) {
        switch (err.message) {
          case 'jwt expired': //refresh token 过期了
            ctx.error({
              status: 406,
              msg: 'refresh_token expired'
            })
            break;
          case 'jwt malformed':  //refresh token 不合法
            ctx.error({
              status: 406,
              msg: 'refresh_token malformed'
            })
            break;
          default:
            ctx.error({
              status: 406,
              msg: 'refresh_token invaild'
            })
            break;
        }
      } else {

        ctx.success({
          msg: '刷新token成功！',
          data: getToken(decoded.username, secret)
        })
        
      }
    })
  }

  // 用于测试token的接口
  static async tokenTest (ctx) {
    ctx.success({msg: 'token认证成功！'});
  }

  // 设置站点信息
  static async setWebInfo (ctx) {
    console.log(ctx.request.body);
    
    const { 
      websiteName, 
      description, 
      master } = ctx.request.body;
    
    // 删除之前的文档
    await BlogModel.deleteMany({});
    await BlogModel.create({
      websiteName,
      description,
      master
    }) && 
      ctx.success({msg: "修改网站信息成功"})

  }

  // 获取站点信息
  static async getWebInfo (ctx) {
    let webInfo = await BlogModel.find({});
    webInfo && webInfo.length ? ctx.success({
        msg: "获取站点信息成功！",
        data: webInfo[0]
      }) :
      ctx.success({
        msg: "没有找到站点信息！"
      })
  }
}

export default BackendUser;