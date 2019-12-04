/**
 * @description: env.js的示例文件
 * @use 使用时需要将该文件改为env.js 并且将配置修改为自己的配置
 * @since: 2019-07-31 07:15:53
 * @Author: jawnwa22
 * @LastEditors: jawnwa22
 * @LastEditTime: 2019-07-31 07:20:12
 */

// 示例文件 不可用
const env = {
    // 开发环境变量
    development: {
        port: 5000,                     // 运行的端口
        secret: "123456",           // jwt加密的密码 
        register_code: "example",      //注册码
        mongo: {                    // mongodb 数据库的对象
            url: "mongodb://username:password@ip/database_name"
        }
    },

    // 生产环境变量
    production: {
        port: 6000,
        secret: "123456",
        register_code: "example",        
        mongo: {
            url: "mongodb://username:password@ip/database_name"
        }
    }
};

export default env[process.env.NODE_ENV || "development"];