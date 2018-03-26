/*
 * GET users listing.
 */
function start_install_1()
{
	
	require('../rts');
	require('../models/modelUserg');
	 usergModel.count({},function(err,record){
		
		 if(!err)
		 {
			
			if(record==0)
			{
				
				var arr={'name':'Administrator',
				'mrights':rts.getModify(),
				'arights':rts.get(),
				}
				userg=new usergModel(arr);
	userg.save(function(err1,result1){
		start_install_2();
		
	}
			}
			else
			{
				
				
				start_install_2();
				
			}
			
			
			 
		 }
		
	});
	
	
}
function start_install_2()
{
	
	//get administrator group
	
	
}
exports.index=function(req,res)
{
	require('../models/modelUser');
userModel.count({},function(err,record){
		
		 if(!err)
		 {
			if(record==0)
			{
				start_install_1();
				
				
			}
			 
		 }
		
	});

};
