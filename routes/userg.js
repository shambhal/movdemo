
/*
 * GET users listing.
 */
exports.add=function(req,res)
{
	
	json=lang.load('/userg/add');
	var rights=[{route:'geet/add'},{route:'geet/list'}];
	json.rights=rights;
	json.arights=['geet/add'];
	json.mrights=[];
	res.render('userg/add',json);
}
exports.edit=function(req,res)
{
	
	json=lang.load('/userg/add');
	console.log(req.params.groupid);
	
	require('../models/modelUserg');
		 usergModel.find({_id:req.params.groupid},function(err,record){
		
		 if(!err)
		 {
			
			res.json(record[0]);
			 
		 }
		
	});
	
	
	
}
exports.remove=function(req,res)
{
	var form = new formidable.IncomingForm();
form.parse(req, function(err1, fields, files) 
{
	  if(!err1)
	  {
		  req.body=fields;
	console.log(req.body);
	arr=userarr=req.body.usergs;
	require('../models/modelUserg');
	for(i=0;i<userarr.length;i++)
	{
		
		//usergModel.deleteById(userg[i]);
		usergModel.findByIdAndRemove(arr[i],function(err ,todo){
			
		});
	}
	res.json({status:1});
	  }
});	
}
exports.save=function(req,res)
{
	require('../models/modelUserg');
	
	var form = new formidable.IncomingForm();
form.parse(req, function(err1, fields, files) {
	
	 if(err1)
	 {
		 
		res.json({error:err1}) ;
		return;
		 
	 }
	req.body=fields;
	 if(req.body.id)
	 {
		condition={_id:req.body.id};
	usergModel.update(condition,req.body,function(err,result)
	{
		if(!err)
		{
			
			res.json({'sflag':1});
			
		}
		
	});
	
	
	
	return;
	 }
	
	userg=new usergModel(req.body);
	userg.save(function(err,result){
		if(err)
			{
			
			console.log(err);
			msg='error Occured'+err.message;
			res.status(200).json({errflag:1,errors:[msg]});
			}
		 if(result)
			 {
			 console.log("added");
			 msg='Added Successfully';
			 res.status(200).json({sflag:1,msg:msg});
			 }
		 
	});
});
}
exports.list=function(req,res)
{
	
	json=lang.load('/userg/list');
	//var rights=[{route:'geet/add'},{route:'geet/list'}];
	//rigths=rts;
	//rights=app.get("rights");
	
	bread=[];
	var jsarr=['javascript/common/common.js'];
	bread.push({'href':'/geet/','text':'home'})
	json.arights=[];
	json.mrights=[];
	json.rights=rts.get();
	json.breadcrumbs=bread;
	json.jsarr=jsarr;
	res.render('userg/userglist',json);
}

exports.retrieve=function (req,res)
{
	
	
	var spage= require('spaginate');
	
	//console.log(req);
	//url='a.php&k=1&c=7';
	//ur=url.replace(/&{1}/,'?');
	//console.log(ur);
	filter_movie=req.query.filter_movie|| null;
	filter_year=req.query.filter_year || null;
	current_page=req.query.page||1;
	var params={};
	
	 if(filter_movie)
		 params.moviename=filter_movie;
	 if(filter_year)
		 params.movieyear=filter_year;
	var mongoosePaginate = require('mongoose-paginate');
	require('../models/modelUserg');
	
	
	json=lang.load('/userg/list');
	/*
	json.csarr=['autocomplete/angular-material.min.css'];
	json.jsarr=['/angular/angular-route.min.js',
	'angular/angular-animate.js','angular/angular-aria.min.js','angular/angular-messages.min.js','autocomplete/angular-material.min.js'
	
	
	];*/
	res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
	
	 usergModel.paginate(params,{page:current_page,limit:10,sort:{_id:-1} ,select:'name  _id'},function (error,cursor)
		{
			
			 if(!error)
			 {
				pageobj=spage.page({totpages:cursor.pages,current_page:current_page,limit:10,onclick:"showp('{{}}')"},req); 
				 
			 }
			 cursor.pagination={};
			 cursor.pagination.pages=pageobj.pages;
			 cursor.pagination.next=pageobj.next,
			 cursor.pagination.prev=pageobj.prev,
			 
			 //console.log(cursor);
			//json.arr=cursor.docs;
			//json.pagination=cursor.pagination;
			//console.log(cursor);
			 res.json(cursor);
		});
	
	
	
	
	
}