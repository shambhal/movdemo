/**
 * http://usejsdoc.org/
 */
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var mongoosePaginate = require('mongoose-paginate');
var Schema = mongoose.Schema;
//Schema.plugin(mongoosePaginate);
// create a schema
var userSchema = new Schema({

 movieyear:{type:Number,required:true},
  moviename: {type:String, required:true},
  translation:{type:String, required:true},
  level:{type:Number},
  /*
  created:{type:Date,default:Date.now},*/

  
});
userSchema.plugin(mongoosePaginate);
// the schema is useless so far
// we need to create a model using it
 Song = mongoose.model('Movie', userSchema);

// make this available to our users in our Node applications
module.exports = Song;