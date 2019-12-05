'use strict';
const Controller = require('egg').Controller;
const qiniu = require("qiniu");

class QiniuController extends Controller {

  async getToken () {
	const { ctx } = this;

	let accessKey = 'jLw0H9YcmpG8cch4JPOGeAOH3ex5ZkkpqahcnY8X';
	let secretKey = 'Y97e6zYiKYhp10Y-ZznzJ0v0uwYtSAmvp6AzZWY1';
	let mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
	let options = {
	  scope: 'pito' //七牛资源目录
	};
	let putPolicy = new qiniu.rs.PutPolicy(options);
	let uploadToken = putPolicy.uploadToken(mac);
	ctx.body = {
		code: 200,
		message: '获取七牛云token成功',
		data: {
			token: uploadToken
		}
	}
  }
}

module.exports = QiniuController;
