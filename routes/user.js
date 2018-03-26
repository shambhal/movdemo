
/*
 * GET users listing.
 */

exports.edit=function(req,res)
{
	require('../models/modelUser');
	json=lang.load('/user/add');
	console.log(req.params.userid);
	
	
		 userModel.find({_id:req.params.userid},function(err,record){
		
		 if(!err)
		 {
			var pw=userModel.decrypt(record[0].password,record[0].pkey);
			//console.log(pw);
			record[0].password=pw;
			res.json(record[0]);
			 
		 }
		
	});
	
	
	
}
exports.remove=function(req,res)
{
	require('../models/modelUser');
	var form = new formidable.IncomingForm();
form.parse(req, function(err1, fields, files) 
{
	 if(!err1){
req.body=fields;
	console.log(req.body);
	arr=userarr=req.body.users;
	
	for(i=0;i<userarr.length;i++)
	{
		
		//userModel.deleteById(user[i]);
		userModel.findByIdAndRemove(arr[i],function(err ,todo){
			
		});
	}
	res.json({status:1});
	 }
});
	
}

exports.save=function(req,res)
{
	require('../models/modelUser');
		var form = new formidable.IncomingForm();
		form.parse(req, function(err1, fields, files) 
{
	 if(err1)
	 {
		 
		res.status(200).json({error:[err1]}); 
		return;
		 
	 }
	
	req.body=fields;
	console.log("in save user");
	console.log(req.body);
	 if(req.body.id)
	 {
		
		condition={_id:req.body.id};
		vals=req.body;
		pkey=userModel.randomkey();
		
		pw=userModel.encrypt(req.body.password,pkey);
		
		vals=req.body;
		vals.pkey=pkey;
		vals.password=pw;
	userModel.update(condition,vals,function(err,result)
	{
		if(!err)
		{
			
			res.json({'status':1});
			
		}
		
	});
	
	
	
	return;
	 }
	
	user=new userModel(req.body);
	user.save(function(err,result){
		if(err)
			{
			
			
			msg='error Occured'+err.message;
			console.log(err);
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
	
	json=lang.load('/user/list');
	json.breadcrumbs=[];
	require('../models/modelUser');
	//require('acl');
	//console.log(getPin());
	
	//getting user model
	/*
	json['ugs']=[];
	require('../models/modelUserg');
	 usergModel.find({},'name ',function(err,record){
		
		 if(!err)
		 {
			console.log(record);
			console.log("above record");
			json.ugs=record;
			 
		 }
		 else{
			 console.log("error occured");
			 console.log(err);
			 
		 }
	 });
	 console.log("json is json");
		 console.log(json);*/
	res.render('user/userlist',json);
}
exports.getugs=function(req,res)
{
	ugs=[];
	require('../models/modelUserg');
	 usergModel.find({},'name',function(err,record){
		
		 if(!err)
		 {
			
			ugs=record;
			res.json(record); 
		 }
		 else{
			 console.log("error occured");
			 console.log(err);
		 }	 
		 });
	
	//res.json(ugs);
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
	require('../models/modelUser');
	
	
	json=lang.load('/user/list');
	/*
	json.csarr=['autocomplete/angular-material.min.css'];
	json.jsarr=['/angular/angular-route.min.js',
	'angular/angular-animate.js','angular/angular-aria.min.js','angular/angular-messages.min.js','autocomplete/angular-material.min.js'
	
	
	];*/
	res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
	
	 userModel.paginate(params,{page:current_page,limit:10,sort:{_id:-1} ,select:'name  _id ugname'},function (error,cursor)
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
			console.log(cursor);
			 res.json(cursor);
		});
	
	
	
	
	
}