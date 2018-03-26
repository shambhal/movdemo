 var thumb = require('node-thumbnail').thumb;
   var settings;
var path=require('path');
var fs=require('fs');
function createFolder(fp)
{
	
	pa=fp.split("/");
	temp=settings.DIR_CACHE;
	for(i=0;i<pa.leng;i++)
	{
		temp=path.join(temp,pa[i]);
		 if(!fs.existsSync(temp))
		 {
			fs.mkdir(temp) 
		 }
		 
		
		
		
		
	}
	return 1;
	
	
	
}
module.exports=function(config)
{
	settings=config;
	
	
}
module.exports.create = function(file){
folderpath=	path.dirname(file);
ext=path.extname(file);
basename=path.basename(file,ext);
mb=basename+'_'+settings.thumbw+''+ext;

	p=path.join(settings.DIR_CACHE,folderpath,mb);
	  if(fs.existsSync(p))
	  {
		  
		  return path.join(folderpath,mb);
		  
		  
	  }
	  else{
		 ret= createFolder(folderpath);
		   if(ret==0)
		   {
			   
			   console.log("Error Occured");
			   return;
		   }
		   thumb({
	source:path.join(settings.DIR_IMAGE,file),
	width:settings.thumbw,
	destination:path.join(settings.DIR_CACHE,folderpath),
	suffix:'_'+settings.thumbw,
});
		return path.join(folderpath,mb);  
	  }
 
};
