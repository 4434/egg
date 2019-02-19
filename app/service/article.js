const Service = require('egg').Service;

class UserService extends Service {
  async select() {
    const row = await this.app.mysql.query('select `id`,`title`,`create_time`,`length`,`describe` from nvmjs_article');
    return row;
  }
  async find(id) {
    const row = await this.app.mysql.query('select * from nvmjs_article where id = ' + id);
    return row;
  }

  async write (params) {
  	const row = await this.app.mysql.query('insert into nvmjs_article (`text`, `describe`, `title`, `length`, `type`, `create_time`) value("'+params.text+'","'+ params.describe +'","'+ params.title +'","'+ params.length +'","'+ params.type +'","'+ params.create_time +'")');
    return row;
  }

  async delete (id) {
    const row = await this.app.mysql.query(' delete from nvmjs_article where id = ' + id);
    return row;
  }

  async update (params) {
    const row = await this.app.mysql.query('update nvmjs_article set `text` = "'+ params.text +'", `describe` = "'+ params.describe +'", `title` = "'+ params.title +'", `length` = "'+ params.length +'", `type` = "' + params.type + '", `create_time` = "' + params.create_time + '" where id= ' + params.id);    
    return row;
  }  

}

module.exports = UserService;