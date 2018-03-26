
var captions=[{'text_miami':'MIAMI',
	
	
	
}];


exports.getLang=function()
{
	return captions;

}
exports.load=function(fname)
{
	var ff=require(_dirname+'//'+fname);
	return ff;

}