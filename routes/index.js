
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};
exports.permissiond=function(req,res)
{
	breadcrumbs=[];
	json=lang.load('common/permissiond');
				//json.title=title;
			
			json.breadcrumbs=breadcrumbs;
			res.render('common/permissiond',json);
	
	
}
exports.logout=function(req,res)
{
	req.session.destroy();
	res.redirect('/admin/login');
}