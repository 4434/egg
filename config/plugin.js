'use strict';

// had enabled by egg
// exports.static = true

// 跨域插件
exports.cors = {
  enable: true,
  package: 'egg-cors',
};

// mysql插件
exports.mysql = {
  enable: true,
  package: 'egg-mysql',
};