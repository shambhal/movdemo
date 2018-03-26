/**
 * http://usejsdoc.org/
 */
 exports.index=function(req,res)
 {
	  if(req.params.songId)
	  {
	songid= req.params.songId;
	//console.log(songid);
	var captions=lang.load('/geet/hintlang');
	captions.jsarr=['/angular/angular-route.min.js'];
		require("../models/song");
		breadcrumbs=[];
	breadcrumbs.push({'href':'/geet/list','text':'List'});
	  query=Song.find({"_id":songid});
	query.limit(1).
	select(' moviename movieyear');
	query.exec(function(err ,song) {
		
		 if(!err) {
		captions.listurl='/hints/list/'+songid;
	captions.addurl='/hints/add/'+songid;
	//console.log(captions);
	captions.title='Hints '+song[0].moviename;
	captions.song={'movieyear':song[0].movieyear,'songid':songid};
	res.render('hints/hints',captions);
		 }
		 });
		
		
	
	
	
	
	
	  }
	 
	 
 },

 exports.retrieve=function (req,res)
 {
	 require("../models/modelHint");
	songid=req.params.songid;
	//console.log(songid);
	var captions=lang.load('/geet/hintlang');
	 query= HintModel.find({"songid":songid});
	
	query.exec(function(err ,song) {
		
		 if(!err){
			// song.captions=captions;
			console.log(captions);
			// console.log(song);
		res.json({records:song,captions});
		return;
		 }
		 else{
			 
			 console.log(err);
		 }
		
	});
	 
 },
 exports.getData=function(req,res)
 {
	 require("../models/modelHint");
	 if(req.params.hintid)
	 {
		 console.log(req.params.hintid);
	  query= HintModel.find({"_id":req.params.hintid});
	  
	  query.exec(function(err,song)
	  {
		  
		  if(!err)
		  {
			  console.log(song);
			 res.json(song[0]) ;
			  
		  }
		  
		  
	  }
	  );
	  
	 }
	 
 }
 exports.delete=function (req,res)
{
	//console.log(req);
	//console.log("-------");
	require('../models/modelHint');
	//console.log(req.params);
	 if(req.params.hintid)
	 {
		 
		HintModel.findByIdAndRemove(req.params.hintid, function (err, todo) {  
    // We'll create a simple object to send back with a message and the id of the document that was removed
    // You can really do this however you want, though.
    var response = {
        message: "Todo successfully deleted",
        id: req.params.songid
    };
    res.send(response);
		 
		 
	 });
	 }
	//console.log("-----------");
	//console.log(req.body);
};
exports.hlist=function(req,res)
{
	//var mongoosePaginate = require('mongoose-paginate');
		 page=req.query['page']||1;
		 limit=req.get['limit']||10;
		 songid=req.params.songid;
//songid='5960bf890694db1690bb6598';
//console.log("page is "+page);
require("../models/modelHint");
//var paginate = require('express-paginate');
var spage= require('spaginate');
var captions=lang.load('/geet/hintlang');

captions.jsarr=['/angular/angular-route.min.js'];
HintModel.paginate({},{ page: page, limit: limit },function(err,cursor){
	 if (err) return next(err);
	//console.log(error);
	 if(!err)
	 {
		// console.log(cursor);
	//console.log(cursor.docs);
	console.log(cursor.pages);
	console.log(cursor.total);
	//return;
	//res.format('admin/hintlist',{records:cursor.docs});
	pageobj=spage.page({totpages:cursor.pages,current_page:page,limit:10},req);
	console.log(pageobj.pages);
	res.locals.spages=pageobj.pages;
	res.format({
      html: function() {
        res.render('admin/hintlistind', {
          arr: cursor.docs,
          pageCount: cursor.pages,
          itemCount: cursor.page,
		  title:captions.title,
		  currentPage:page,
		  captions:captions,
		  pages:pageobj.pages,
		/*  pageobj=spage.page({},req),
          pages: paginate.getArrayPages(req)(3, cursor.pages, page)*/
        });
      },
	
	
	 });
	 }	
});
}
exports.update=function(req,res)
{
	
	var form = new formidable.IncomingForm();
form.parse(req, function(err1, fields, files) {
	 if(!err1) {
		 req.body=fields;
	            req.assert('hint','Hint required').notEmpty();




                 var errors = req.validationErrors();  
//post=req.
                    if(errors)
	                              {
	
	                       res.status(200).json({errflag:1,errors:errors});
	
	                   }
   else
	{
	require("../models/modelHint");
	//save 
	//var nact=new Song(req.body);
	var msg='';
	condition={_id:req.query.id};
	HintModel.update(condition,req.body,function(err,result){
		if(err)
			{
			
			console.log(err);
			msg='error Occured';
			}
		 if(result)
			 {
			 console.log("upated");
			 msg='Updated Successfully';
			 res.status(200).json({sflag:1,msg:msg});
			 }
		 
	});
	
	}
	 }
	 else{
		  res.status(200).json({errors:err1});
		 
		 
	 }
});
}	
	
exports.save=function(req,res)
{
	require("../models/modelHint");
	var form = new formidable.IncomingForm();
form.parse(req, function(err1, fields, files) {
	
	 if(!err1 ){
		 req.body=fields;
	var hm=new HintModel(req.body);
	hm.save(function(err,result){
		if(err)
			{
				
				
			
			console.log(err);
			msg=err.message;
			res.status(200).json({errflag:1,errors:[msg]});
			}
		 if(result)
			 {
			 console.log("added");
			 msg='Added Successfully';
			 res.status(200).json({sflag:1,msg:msg});
			 }
		 
	});
	 }
	 else
	 {
		  res.status(200).json({errors:err1});
		 
	 }
});
	
}
/*
exports.add=function(req,res)
{
	
require("../models/modelHint");
	require("../models/song");
	var captions=lang.load('/geet/hintlang');
		captions.jsarr=['/angular/angular-route.min.js'];
	//console.log(req.params);
	//return;
	//Hintmodel.find({})
songid=req.params.songId;
	query=Song.find({"_id":songid});
	query.limit(1).
	select('mukhda moviename movieyear');
	query.exec(function(err ,song) {
		
		if(err)
			console.log(err);
		else
		{
			console.log(song[0]);
			captions.mukhda=song[0].mukhda;
			console.log(song[0].movieyear);
			//captions.movieyear=song.movieyear;
			captions.song={'mukhda':song[0].mukhda,'movieyear':song[0].movieyear,'songid':songid};
			console.log(captions);
			res.render('admin/hints',captions);
			
		}
		
	});
}
*/