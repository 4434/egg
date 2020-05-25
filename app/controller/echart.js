'use strict';

const Controller = require('egg').Controller;
class EchartController extends Controller {
	async addData () {
		const { ctx } = this;
		const params = ctx.request.body;
	    if(!params.token){
	      ctx.body = {
	        code: 401,
	        message: '请先登陆',
	        data: null
	      };      
	      return;
	    }
	    const data = await ctx.service.echart.write(params);
	    ctx.body = {
	      code: 200,
	      message: '数据插入成功',
	      data: data,
	    }
	}

	async listData () {
		const { ctx } = this;
		const params = ctx.request.body;
	    if(!params.token){
	      ctx.body = {
	        code: 401,
	        message: '请先登陆',
	        data: null
	      };      
	      return;
	    }
	    const data = await ctx.service.echart.select(params);
	    ctx.body = {
	      code: 200,
	      message: '数据获取成功',
	      data: data.row
	    }	    
	}

	async dataDelete () {
	    const { ctx } = this;
	    const id = ctx.query.id;
	    const row = await ctx.service.echart.delete(id);
	    ctx.body = {
	      code: 200,
	      message: '删除数据成功',
	      data: row
	    };
	}

	async dataUpdate () {
	    const { ctx } = this;
	    const params = ctx.request.body;
	    const data = await ctx.service.echart.update(params);
	    ctx.body = {
	      code: 200,
	      message: '修改数据成功',
	      data: data
	    };
	}	  			
}

module.exports = EchartController;