/**
 * Created Date: 2019-06-04
 * Author: DarkReunion
 * @description 环境变量文件
 * @use
 *
 * Copyright (c) 2019 19cm_without_head Team
 */

const env = {
    // 开发环境变量
    development: {
        port: 5000,
        secret: "jwt-secret",
        mongo: {
            url: "mongodb://fancyd:123456qq@mickeyhouse.top:27017/test"
        }
    },

    // 生产环境变量
    production: {
        port: 6000,
        secret: "jwt-secret",
        mongo: {
            url: "mongodb://fancyd:123456qq@mickeyhouse.top:27017/blog"
        }
    }
};

export default env[process.env.NODE_ENV || "development"];
