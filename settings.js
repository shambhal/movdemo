var cnf=require('./config');
module.exports.set=function()
{//conf=require("./config");
conf=new cnf();

conf.DIR_IMAGE=__dirname+conf.DIR_IMAGE;
conf.DIR_CACHE=__dirname+conf.DIR_CACHE;
//console.log(conf);
	return conf;

}

