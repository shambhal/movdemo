/**
 * http://usejsdoc.org/
 */
 var crypto=  require("crypto"),
	 algorithm = 'aes-256-ctr';
	  
 

 function encrypt(text,pwkey){
	var  algorithm = 'aes-256-ctr';
  var cipher = crypto.createCipher(algorithm,pwkey);
  var crypted = cipher.update(text,'utf8','hex');
  crypted += cipher.final('hex');
  return crypted;
}

function randomkey()
{
	
	var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
console.log(text);
  return text;
	
	
}
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var mongoosePaginate = require('mongoose-paginate');
var Schema = mongoose.Schema;
//Schema.plugin(mongoosePaginate);
// create a schema
//mongoose.Promise = require('bluebird');
var userSchema = new Schema({
 name: {type:String},
 password:{type:String,required:true},
  pkey: {type:String, },
  userg_id:{type:String},
  ugname:{type:String},
  /*
  created:{type:Date,default:Date.now},*/

  
});
userSchema.pre("save",function(next,done){
	this.pkey=randomkey(),
	
	this.password=encrypt(this.password,this.pkey),
	next();
});

userSchema.plugin(mongoosePaginate);
// the schema is useless so far
// we need to create a model using it
 userModel = mongoose.model('User', userSchema);
 
// make this available to our users in our Node applications
module.exports = userModel;
module.exports.decrypt=function (text,pwkey){
	 algorithm = 'aes-256-ctr';
  var decipher = crypto.createDecipher(algorithm,pwkey);
  var dec = decipher.update(text,'hex','utf8');
  dec += decipher.final('utf8');
  return dec;
}
module.exports.encrypt=encrypt;
module.exports.randomkey=randomkey;