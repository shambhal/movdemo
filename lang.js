var tlang='';
module.exports.load=function(fname){
	p=__dirname+'/lang/'+tlang+'/'+fname;
	//console.log(p);
	f=require(p);
	//console.log("returning f");
	//console.log(f);
	return f;
	 };
module.exports.set=function(language)
{
	tlang=language;

}

/*
exports.lan=lang;
function lang(options)
{
	
	 var opts = options || {}
	 var language=opts.language;
	 
//return {'options':opts};

}
exports.load=lang.prototype.load=function(fname)
{tlang=this.opts.language;
	p=__dirname+'/lang/'+tlang+'/'+fname;
	console.log(p);
	f=require(p);
	return f; 

}*/