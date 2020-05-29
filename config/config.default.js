'use strict';

module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1550210870502_7616';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.bodyParser = {
    jsonLimit: '100mb',
    formLimit: '100mb'
  }

  config.security = {
    csrf: {
      enable: false,
    },
  }
    
  config.cors = {
    origin:'http://localhost:9999',   // 跨域设置cookios 不能设为 *
    credentials: true,
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
  };

  config.mysql = {
    // 单数据库信息配置
    client: {
      // host
      host: '127.0.0.1',
      // 端口号
      port: '3306',
      // 用户名
      user: 'root',
      // 密码
      password: '12345678',
      // 数据库名
      database: 'nvmjs',
      charset: 'UTF8_GENERAL_CI' 
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };

  return {
    ...config,
    ...userConfig,
  };
};
