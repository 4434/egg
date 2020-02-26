const Service = require('egg').Service;

class UserService extends Service {

  async find(username) {
    const row = await this.app.mysql.query('select * from nvmjs_user where username = "'+ username +'"');
    return row;
  }
  
  async login(params) {
    const row = await this.app.mysql.query('select * from nvmjs_user where username = "' + params.username + '" ' +'and password = "' + params.password + '"');
    return row;
  }

  async write (params) {
  	const row = await this.app.mysql.query('insert into nvmjs_user (`username`, `password`, `create_time`, `uid`) value("'+params.username+'","'+ params.password +'","'+ params.create_time + '","N' + params.create_time + '")');
    return row;
  }

  async update (params) {
    const row = await this.app.mysql.query("update nvmjs_user set `avater` = '"+ params.avater +"', `d` = '"+ params.desc +"', `sex` = '"+ params.sex + "' where uid = '" + params.uid + "'");    
    return row;
  }    
}

module.exports = UserService;