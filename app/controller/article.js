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
    const article = await ctx.service.article.select(params);
    const listNum = await ctx.service.article.listNum(params);
    ctx.body = {
    	code: 200,
    	message: '获取文章列表成功',
    	data: article,
      page: {
        pageIndex: params.pageIndex,
        pageSize: params.pageSize,
        pageAll: listNum
      }
    };
  }

  async articleUs () {
    const { ctx } = this;
    const params = ctx.request.body || {};
    params.pageIndex = params.pageIndex || 1;
    params.pageSize  = params.pageSize || 10;
    params.uid    = params.uid || '';
    const data = await ctx.service.article.articleUs(params);
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
