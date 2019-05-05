'use strict';

const Controller = require('egg').Controller;
const yktool     = require('./../public/js/yktool.js');

class UserController extends Controller {

  async login () {
	const { ctx } = this;
  	const params = ctx.request.body;
	const data = await ctx.service.user.login(params);	
	if(data.length){
		ctx.body = {
			code: 200,
			message: '登录成功',
			data: data[0]
		}
	}else{
		ctx.body = {
			code: 400,
			message: '登录失败，用户名或者密码不正确',
			data: null
		}
	}  	
  }		

  async register () {
    const { ctx } = this;    
    const params  = ctx.request.body;
    console.log(ctx.cookies.get('count'));
    const user = await ctx.service.user.find(params.username);
    if(user.length == 0){
    	params.create_time = yktool.time().getTime;
	    const data = await ctx.service.user.write(params);
	    ctx.body = {
	    	code: 200,
	    	message: '注册成功',
	    	data: data
	    };
    }else{
    	ctx.body = {
	    	code: 401,
	    	message: '用户已存在',
	    	data: null
	    };
    }

  }
}

module.exports = UserController;
