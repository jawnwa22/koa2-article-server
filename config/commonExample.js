/**
 * @description 项目配置文件
 * 使用时需要将文件名改成common.js
 */



const env = {
  development: {
    port: process.env.PORT || 4000,
    mongo: {
      uri: 'mongodb://user:password@127.0.0.1:27017/test'
    }
  },

  production: {
    port: process.env.PORT || 5000,
    mongo: {
      uri: 'mongodb://user:password@127.0.0.1:27017/blog'
    }
  }
}

export {
  env
}