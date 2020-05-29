const Service = require('egg').Service;

class ArticleService extends Service {
  
  async select(params) {    // 文章列表查询 - 分页 - 模糊搜索
    let data = {};
    data.row = await this.app.mysql.query('select nvmjs_article.id,nvmjs_user.username,`title`,nvmjs_article.create_time,`length`,`describe` from nvmjs_article left join nvmjs_user on nvmjs_article.uid = nvmjs_user.uid where title like "%'+params.search+'%" order by nvmjs_article.create_time desc limit ' + (params.pageIndex - 1) * params.pageSize +','+ params.pageSize);
    data.num = await this.app.mysql.query('select count(1) as `count` from nvmjs_article where title like "%'+ params.search +'%"');
    data.num = data.num[0] ? data.num[0].count : 0 ;
    return data;
  }

  async articleUs (params) {  // 根据用户查文章列表
    let data = {};
    data.row = await this.app.mysql.query('select * from nvmjs_article where uid = "'  + params.uid + '" order by nvmjs_article.create_time desc limit ' + (params.pageIndex - 1) * params.pageSize +','+ params.pageSize);
    data.num = await this.app.mysql.query('select count(1) as `count` from nvmjs_article where uid = "'  + params.uid + '"');
    data.num = data.num[0] ? data.num[0].count : 0 ;
    return data;
  }

  async find(id) {
    const row = await this.app.mysql.query('select nvmjs_article.id,nvmjs_user.username,nvmjs_user.avater,`title`,nvmjs_article.create_time,nvmjs_article.type,`length`,`describe`,`text` from nvmjs_article left join nvmjs_user on nvmjs_article.uid = nvmjs_user.uid where nvmjs_article.id = ' + id);
    return row;
  }

  async write (params) {
    const row = await this.app.mysql.insert('nvmjs_article',{
      text: params.text,
      describe: params.describe,
      title: params.title,
      length: params.length,
      type: params.type,
      create_time: params.create_time,
      uid: params.token
    })
    return row;
  }

  async delete (id) {
    const row = await this.app.mysql.query(' delete from nvmjs_article where id = ' + id);
    return row;
  }

  async update (params) {
    const content = {
      id: params.id,
      text: params.text,
      describe: params.describe,
      title: params.title,
      length: params.length,
      type: params.type,
      create_time: params.create_time
    }
    const row = await this.app.mysql.update('nvmjs_article', content);  
    return row;
  }
  
}

module.exports = ArticleService;