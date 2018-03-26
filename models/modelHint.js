/**
 * http://usejsdoc.org/
 */
var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
mongoose.Promise = require('bluebird');
var Schema = mongoose.Schema;
//Schema.plugin(mongoosePaginate);
// create a schema
var userSchema = new Schema({
 songid: {type:String},
 hint:{type:String,required:true},
  sort_order: {type:Number, },

  /*
  created:{type:Date,default:Date.now},*/

  
});
userSchema.plugin(mongoosePaginate);
// the schema is useless so far
// we need to create a model using it
 HintModel = mongoose.model('Clue', userSchema);

// make this available to our users in our Node applications
module.exports = HintModel;