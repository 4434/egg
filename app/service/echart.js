const Service = require('egg').Service;

class EchartService extends Service {

  async select(params) {    // 数据列表查询
    let data = {};
    data.row = await this.app.mysql.query('select * from nvmjs_data where uid = "'  + params.token + '" order by time');
    data.num = await this.app.mysql.query('select count(1) as `count` from nvmjs_article where uid = "'  + params.token + '"');
    data.num = data.num[0] ? data.num[0].count : 0 ;
    return data;
  }

  async write (params) {    
  	const row = await this.app.mysql.query("insert into nvmjs_data (`time`, `num`, `uid`, `flag`) value('"+params.time+"','"+ params.num +"','"+ params.token +"','"+ params.flag +"')");
    return row;
  }

  async delete (id) {
    const row = await this.app.mysql.query(' delete from nvmjs_data where id = ' + id);
    return row;
  }

  async update (params) {
    const row = await this.app.mysql.query("update nvmjs_data set `num` = '"+ params.num +"', `time` = '"+ params.time +"' where id= " + params.id);    
    return row;
  }  

}

module.exports = EchartService;