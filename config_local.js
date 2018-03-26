
module.exports.set=function(ROOT){
	
	 return {
		 'lang':'en',
		 'root':ROOT,
		 'DIR_IMAGE':ROOT+'/public/images/',
		 'HTTP_IMAGE':process.env.APPLICATION_URL+'images/,
		 'DIR_CACHE':ROOT+'/public/icache/',
		 'HTTP_SERVER':process.env.APPLICATION_URL,
		 'HTTP_CACHE':process.env.APPLICATION_URL+'icache/',
		 'thumbw':200,
		 'dbhost':'mongodb://127.0.0.1/movied',
		 
	      };
	   }
	 
	 

