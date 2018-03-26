/**
 * http://usejsdoc.org/
 */
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var mongoosePaginate = require('mongoose-paginate');
var Schema = mongoose.Schema;
//Schema.plugin(mongoosePaginate);
// create a schema
var usergSchema = new Schema({
 name: {type:String},

 arights:[],
mrights:[],
  /*
  created:{type:Date,default:Date.now},*/

  
});
usergSchema.plugin(mongoosePaginate);
// the schema is useless so far
// we need to create a model using it
 usergModel = mongoose.model('Userg', usergSchema);

// make this available to our users in our Node applications
module.exports = usergModel;