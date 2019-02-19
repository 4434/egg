let yktool = {
	clearHTML (data) {
		let str = data || '';
		str = str.replace(/<\/?.+?>/g,"");
		return str.replace(/&nbsp;/ig,'');
	},
	time (time) {
		if(!time) time = new Date();
		let timeData = {};
		var t = new Date(time);
		timeData.getTime = t.getTime();
		timeData.year    = t.getFullYear();
		timeData.month   = (t.getMonth() + 1) < 10 ? '0' + (t.getMonth() + 1) : (t.getMonth() + 1);
		timeData.day     = t.getDate() < 10 ? '0' + t.getDate() : t.getDate();
		timeData.week    = t.getDay() < 10 ? '0' + t.getDay() : t.getDay();
		timeData.hour    = t.getHours() < 10 ? '0' + t.getHours() : t.getHours();
		timeData.minute  = t.getMinutes() < 10 ? "0" + t.getMinutes() : t.getMinutes();
		timeData.second  = t.getSeconds() < 10 ? "0" + t.getSeconds() : t.getSeconds();
		return 	timeData;			
	}	
}
module.exports = yktool;