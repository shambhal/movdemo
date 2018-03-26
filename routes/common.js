/*
 * GET users listing.
 */

exports.update=function(req,res)
{
	captions=lang.load('geet/add');
		var form = new formidable.IncomingForm();
form.parse(req, function(err1, fields, files) {
	
	  if(!err1){
		  req.body=fields;
	req.assert('moviename',captions.error_movie_name).notEmpty();
req.assert("mukhda",captions.error_mukhda).notEmpty();

req.assert("movieyear",captions.error_movie_year).notEmpty();
req.assert("translation",captions.error_translation).notEmpty();



var errors = req.validationErrors();  
//post=req.
if(errors)
	{
	
	 res.status(200).json({errors:errors});
	
	}
else
	{
	require('../models/song');
	//save 
	//var nact=new Song(req.body);
	var msg='';
	condition={_id:req.query.id};
	

		
		 if(!err1)
		 {
			 
			Song.update(condition,fields,function(error,result){
		if(error)
			{
			
			console.log(error);
			 res.status(200).json({sflag:1,error:error})
			}
		 if(result)
			 {
			
			 msg=captions.text_updated;
			 res.status(200).json({sflag:1,msg:msg});
			 }
		 
	});
	
			 
		 }
		 else{
			 
			 res.status(200).json({errors:err});
			 
			 
		 }
		
	
	
	}
	  }
});
	
}
exports.getSong=function(req,res)
{
	songid=req.params.songid;
	require('../models/song');

	
	Song.find({_id:songid},function(err,record){
		
		 if(!err)
		 {
			
			res.json(record[0]);
			 
		 }
		
	});
	
}
exports.edit=function(req,res)
{
	songid=req.params.songid;
	require('../models/song');
	json=lang.load('geet/edit');
	breadcrumbs=[];
	breadcrumbs.push({'href':'/geet/list','text':'List'});
	Song.find({_id:songid},'_id mukhda ',function(err,record){
		
		 if(!err)
		 {
			 //console.log(record);
			 title=json.text_title.replace("%s",record[0].mukhda);
			json.title=title;
			json.songid=songid;
			json.record=record[0];
			json.edit=1;
			json.breadcrumbs=breadcrumbs;
			res.render('admin/geetadd',json);
			 
		 }
		
	});
	
	
}
exports.add=function(req,res)
{
	
json=lang.load('/geet/add');
json.title='Add Geet';
breadcrumbs=[];
	breadcrumbs.push({'href':'/geet/list','text':'List'});
//console.log(json.capt);
json.edit=0;
	json.breadcrumbs=breadcrumbs;
res.render('admin/geetadd',json);

};
exports.remove=function(req,res)
{
	require('../models/song');
	//console.log(req.params);
	console.log(" in request");
	 if(req.body.songs)
	 {
	//console.log(req.body.songs);
	
	arr=req.body.songs;
	console.log(arr.length);
	for(i=0;i<arr.length;i++)
	{//console.log(i);
		console.log(arr[i]);
		Song.findByIdAndRemove(arr[i],function(err ,todo){
			
			
		});
	}
	res.json({status:1});
	 }
	
	
}
exports.dlist=function()
{
	var mongoosePaginate = require('mongoose-paginate');
	require('../models/song');
var spage= require('spaginate');
	//var smodel=new Song();
	
		 page=req.get['page']||1;
		 limit=req.get['limit']||10;
		 pagewidth=10;
		 Song.paginate({},{page:page,limit:limit,sort:{_id:-1}},function(err,result){
			  if(!err)
				  {
				  result.pageobj=spage.page({totpages:result.pages,current_page:page,limit:pagewidth},req);
				  result.curl=req.url,
				 res.json(result);
				  return;
				  }
		 });
	
	
}
exports.test=function()
{
		require('../models/song');
		param='ha';
		var regex='^'+param+'*';
		Song.aggregate(
		[
		{$match:{moviename:{$regex:regex,$options:'i'}},
		
		      
		},
		{$group:{_id:"$moviename",   count: {$sum: 1},}
		
		},
		
		],function (err,result) {
			console.log(result);
			
		}
		
		);
	
	
}
exports.autocompletem=function(req,res)
{
	param=req.params.mname;
	
	require('../models/song');
var regex='^'+param+'*';
console.log(regex);
	//	Song.find({moviename:{$regex:regex,$options:'i'}},function (err,doc){
		Song.aggregate(
		[
		{$match:{moviename:{$regex:regex,$options:'i'}},
		
		      
		},
		{$group:{_id:"$moviename",   count: {$sum: 1},}
		
		},
		
		],function (err,doc){
		
		 if(!err)
		 {
			 console.log(doc);
			 res.json(doc);
			 
			 
		 }
		
		
		
	});
	
}
exports.retrieve=function(req,res)
{
	var spage= require('spaginate');
	console.log("in retrieve");
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
	require('../models/song');
	console.log(params);
	Song.paginate(params,{page:current_page,limit:10,sort:{_id:-1} ,select:'movieyear mukhda _id'}).then(function (cursor)
		{
			
			// if(!error)
			 {
				pageobj=spage.page({totpages:cursor.pages,current_page:current_page,limit:10},req); 
				 
			 }
			 cursor.pagination={};
			 cursor.pagination.pages=pageobj.pages;
			 cursor.pagination.next=pageobj.next,
			 cursor.pagination.prev=pageobj.prev,
			
			 res.json(cursor);
		},function (err){});
	
	
	
}

exports.home=function (req,res)
{
	
	
	var spage= require('spaginate');
	console.log("in retrieve");

	filter_movie=req.query.filter_movie|| null;
	filter_year=req.query.filter_year || null;
	current_page=req.query.page||1;
	var params={};
	
	 if(filter_movie)
		 params.moviename=filter_movie;
	 if(filter_year)
		 params.movieyear=filter_year;
	var mongoosePaginate = require('mongoose-paginate');
	require('../models/song');
	
	
	json=lang.load('/geet/list');
	json.csarr=['autocomplete/angular-material.min.css'];
	json.jsarr=['/angular/angular-route.min.js',
	'angular/angular-animate.js','angular/angular-aria.min.js','angular/angular-messages.min.js','autocomplete/angular-material.min.js'
	
	
	];
	res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
	
	Song.paginate(params,{page:current_page,limit:10,sort:{_id:-1} ,select:'movieyear mukhda _id'},function (error,cursor)
		{
			
			 if(!error)
			 {
				pageobj=spage.page({totpages:cursor.pages,current_page:current_page,limit:10},req); 
				 
			 }
			 cursor.pagination={};
			 cursor.pagination.pages=pageobj.pages;
			 cursor.pagination.next=pageobj.next,
			 cursor.pagination.prev=pageobj.prev,
			 //console.log(cursor);
			json.arr=cursor.docs;
			json.pagination=cursor.pagination;
			
		});
	
	
	
	res.render('admin/geetlist2',json);
	
}


exports.list = function(req, res){
 
	json=lang.load('/geet/list');
	json.csarr=['autocomplete/angular-material.min.css'];
	json.jsarr=['angular/angular-animate.js','angular/angular-aria.min.js','angular/angular-messages.min.js','autocomplete/angular-material.min.js'];
		res.render('admin/geetlist2',json);
			
	
	
		 
};

exports.hints=function(req,res)
{
	
	json=lang.load('/geet/hints');
	json.jsarr=['/angular/angular-route.min.js'];
	res.render('admin/hints',json);
};
exports.delete=function (req,res)
{
	//console.log(req);
	//console.log("-------");
	require('../models/song');
	console.log(req.params);
	 if(req.params.songid)
	 {
		 
		Song.findByIdAndRemove(req.params.songid, function (err, todo) {  
    // We'll create a simple object to send back with a message and the id of the document that was removed
    // You can really do this however you want, though.
    var response = {
        message: "Todo successfully deleted",
        id: req.params.songid
    };
    res.send(response);
		 
		 
	 });
	 }
	
}


exports.save=function(req,res)
{
	var form = new formidable.IncomingForm();
form.parse(req, function(err1, fields, files) {
	 if(!err1)
	 {
	req.body=fields;
	
	
	 
	 
	 


req.assert('moviename','Movie Name Required').notEmpty();
req.assert("mukhda","Mukhda required").notEmpty();

req.assert("movieyear","Movie Year required").notEmpty();
req.assert("translation","Translation required").notEmpty();



var errors = req.validationErrors();  
//post=req.
if(errors)
	{
	
	 res.status(200).json({errors:errors});
	
	}
else
	{
	require('../models/song');
	//save 
	var nact=new Song(req.body);
	var msg='';
	nact.save(function(err,result){
		if(err)
			{
			
			console.log(err);
			msg='error Occured';
			}
		 if(result)
			 {
			 console.log("added");
			 msg='Added Successfully';
			 res.status(200).json({sflag:1,msg:msg});
			 }
		 
	});
	
	}
}
	 else{
			res.status(200).json({errors:err});
		 
	 }
	

});

}