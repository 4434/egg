'use strict';

const Controller = require('egg').Controller;
const yktool     = require('./../public/js/yktool.js');

class ArticleController extends Controller {

  async articleList() {
    const { ctx } = this;
    const params = ctx.request.body || {};
    params.pageIndex = params.pageIndex || 1;
    params.pageSize  = params.pageSize || 10;
    params.search    = params.search || '';    
    let data;
    if(ctx.request.header.token === 'admin0001'){
      data = await ctx.service.article.selectAll(params);
    }else{
      data = await ctx.service.article.select(params);  
    }
    ctx.body = {
      code: 200,
      message: '获取文章列表成功',
      data: data.row,
      page: {
        pageIndex: params.pageIndex,
        pageSize: params.pageSize,
        pageAll: data.num
      }
    }
  }

  async articleUs () {
    const { ctx } = this;
    const params = ctx.request.body || {};
    params.pageIndex = params.pageIndex || 1;
    params.pageSize  = params.pageSize || 10;
    params.search    = params.search || '';
    params.uid    = params.uid || '';
    let data;
    if(params.uid === 'admin0001'){
      data = await ctx.service.article.selectAll(params);
    }else{
      data = await ctx.service.article.articleUs(params);  
    }
    ctx.body = {
      code: 200,
      message: '获取文章列表成功',
      data: data.row,
      page: {
        pageIndex: params.pageIndex,
        pageSize: params.pageSize,
        pageAll: data.num
      }
    }
  }
  /**
   *  修改文章显示状态
   */
  async articleStatus () {
    const { ctx } = this;
    const params = ctx.request.body || {};
    const data = await ctx.service.article.status(params);
    ctx.body = {
      code: 200,
      message: '修改状态成功',
      data: data
    }
  }  

  async articleDetail () {
  	const { ctx } = this;
  	const id = ctx.query.id;
  	const detail = await ctx.service.article.find(id);
  	ctx.body = {
    	code: 200,
    	message: '获取文章详情成功',
    	data: detail[0]
    };
  }

  async articleWrite () {
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
    params.describe = yktool.clearHTML(params.text).substr(0, 70);
    params.length = yktool.clearHTML(params.text).length;
    params.create_time = yktool.time().getTime;
    params.show = params.show || 1;
    const data = await ctx.service.article.write(params);
  	ctx.body = {
    	code: 200,
    	message: '提交文章成功',
      data: data
    };
  }

  async articleDelete () {
    const { ctx } = this;
    const id = ctx.query.id;
    const row = await ctx.service.article.delete(id);
    ctx.body = {
      code: 200,
      message: '删除文章成功',
      data: row
    };
  }  

  async articleUpdate () {
    const { ctx } = this;
    const params = ctx.request.body;
    params.describe = yktool.clearHTML(params.text).substr(0, 70);
    params.length = yktool.clearHTML(params.text).length;
    params.create_time = yktool.time().getTime;
    const data = await ctx.service.article.update(params);
    ctx.body = {
      code: 200,
      message: '修改文章成功',
      data: data
    };
  }
}

module.exports = ArticleController;
