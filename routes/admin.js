
/*
 * GET users listing.
 */

exports.list = function(req, res){
  res.send("respond with a resource");
};

exports.index=function(req,res)
{
	var sess=req.session;
	 if(! sess.token)
		 {
		 res.redirect('admin/login');
		 
		 }
	 else
		 {
		 
		 
		 res.render('admin/index');
		 }


};
exports.loginv=function(req,res)
{
	var form = new formidable.IncomingForm();
	var flds;;
	
form.parse(req, function(err, fields, files) {
	 if(!err)
	 {
	validateUser(fields,req,res);
	
	 }
	 else{
			res.status(200).json({errors:err});
		 
	 }
	
});
	

};
function getugarr(ugid)
//exports.ugid=function(req,res)
{
	//console.log(req.params);
	require('../models/modelUserg');
	if(ugid) {
		
	usergModel.find({_id:ugid},function(err,result){
		 if(!err)
		 {
			 console.log(" in getugarr");
			 console.log(result[0]);
			  if(result[0]){
record=result[0];
//console.log(record);
      return record;
			  }
			  
			 
		 }
		
		
	});
	}
}
function validateUser(params,req,res)
{acl=require('acl');
	username=params.username;
	var _ = require('underscore');
	require('../models/modelUser');

var req1=req;

	userModel.find({name:username}).exec().then(function( result){ 
	
	   if(result[0])
	   {
		    record=result[0];
		   
		   return record;
		   
	   }
	   else{
		   throw new Error(1);
		

	
	   }
	   
	
	}).then(function (record) {
		//matchint username and  password
		pwd= userModel.decrypt(record.password,record.pkey);
		
		if(pwd==params.password)
			{
				return record;
			}
			else
			{
				
				throw new Error(2);
				
			}
		
		
	}).then(function (record){
		//ugid
		req.session.token=record._id;
		ugid=usergid=	record['userg_id'];
			require('../models/modelUserg');
			
		usergModel.find({_id:ugid},function (err,result2){
			/*
			 if(req.session.lasturl)
			 {
				 t=req.session.lasturl;
				 req.session.lasturl=null;
				 res.redirect(t);
				 
			 }
			 else{
				//res.redirect("/geet/");
			 }*/
			 
			 
		 if(result2[0]){
				  rightsarr=result2[0];
req.session.mrights=rightsarr.mrights;
				req.session.arights=rightsarr.arights;
				console.log("in rifgts arr");
				console.log(" in ");
				
			//	acl.assignrights();
				console.log(req.session.arights);
		 }
			   if(req.session.lasturl)
			 {
				 t=req.session.lasturl;
				 req.session.lasturl=null;
				 res.redirect(t);
				 
			 }
			 else{
				res.redirect("/geet/list/");
			 }
			 
			 
			return result2;
			
		});
		
	}).catch(function (ecode){
		
		 if(ecode==1)
		 {
			 
			 res.render('admin/login',{errormsg:'Invalid Username /Password'}); 
			 
		 }
		  if(ecode==2)
		  {
			  
			  res.render('admin/login',{errormsg:'Invalid Username /Password'}); 
			  
			  
		  }
		
		
	});
		
	

}
function validateUsero(params,req,res)
{acl=require('acl');
	username=params.username;
	var _ = require('underscore');
	require('../models/modelUser');

var req1=req;

	userModel.find({name:username},function(err,result){
		 if(err)
		 {
			 console.log(err);
			
			 
		 }
		 if(result)
		 {
			 console.log(result);
			 record=result[0];
			  if(!record)
			  {
				  
				 res.render('admin/login',{errormsg:'Invalid Username /Password'});
			return 0;  
				  
			  }
			
			pwd= userModel.decrypt(record.password,record.pkey);
		
			if(pwd==params.password)
			{
			ugid=usergid=	record['userg_id'];
			require('../models/modelUserg');
	if(ugid) {
		
	usergModel.find({_id:ugid},function(err,result2){
		 if(!err)
		 {
			 console.log(" in getugarr");
			 console.log(result2[0]);
			  if(result2[0]){
				  rightsarr=result2[0];
req.session.mrights=rightsarr.mrights;
				req1.session.arights=rightsarr.arights;
				console.log("in rifgts arr");
				console.log(" in ");
				req1.session.timpu='pyaara';
			//	acl.assignrights();
				console.log(req.session.arights);
			  }
	}
	else
	{
		console.log("error occured" +err);
		
		
	}
	
	});
	}
			  
			    req.session.timpult="bahnja";
				req.session.token="gibber";
				 if(req.session.lasturl)
			 {
				 t=req.session.lasturl;
				 req.session.lasturl=null;
				 res.redirect(t);
				 
			 }
			 else{
				res.redirect("/geet/");
			 }
				 
			}
			else{
				
				
				 res.render('admin/login',{errormsg:'Invalid Username /Password'});
				 return 0;
			}
		 }
		 else{
			  res.render('admin/login',{errormsg:'Invalid Username /Password'});
			return 0;
			 
		 }
		
		
		
	});
	
}
exports.login=function(req,res)
{
	
var sess=req.session;


 if(!sess.token)
	 {
	
	
	  res.render('admin/login');
	 }
 else
	 {
	 console.log("do nothing");
	res.redirect('admin/index');
	
	 }

};