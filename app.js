
/**
 * Module dependencies.
 */

var express = require('express')
, session=require('express-session')
  , routes = require('./routes')
  
, paginate = require('express-paginate')
   , admin = require('./routes/admin')
  
    ,userg=require('./routes/userg')
	
	/*,formidable=require('formidable')*/
     , geet = require('./routes/geet'),
	 //passport =require("passport-http"),
	// bstrategy= require('passport-http').BasicStrategy,
	 acl=require('shambacl'),
	/* cors = require('cors'),*/
	
     hint=require('./routes/hints')
  , user = require('./routes/user')
 
  , http = require('http')
   , expressValidator = require('express-validator')
  ,mongoose=require('mongoose')
  , path = require('path');

var app = express();
var cnf=require('./config');
//var settings=require('./settings');
//sc=settings.set();
fs=require('fs');

rts=require('./rts');

app.set('language','english');
lang=require('./lang');
lang.set('english');

app.set('lang',lang);
var env=process.env.NODE_ENV;
console.log(process.env.APPLICATION_URL);
 if(env=='production')
 {
	 var temp=require('./config.js');
	 
	 
 }
else{
	
	var temp=require('./config_local.js');
}
settings=temp.set(__dirname);

console.log(process.env.NODE_ENV);

app.set('rts',rts);

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0',
    mongoURL = process.env.OPENSHIFT_MODIR_DB_URL || process.env.MONGO_URL,
    mongoURLLabel = "";
console.log(process.env);
if (mongoURL == null && process.env.DATABASE_SERVICE_NAME) {
  /*
  var mongoServiceName = process.env.DATABASE_SERVICE_NAME.toUpperCase(),
      mongoHost = process.env[mongoServiceName + '_SERVICE_HOST'],
      mongoPort = process.env[mongoServiceName + '_SERVICE_PORT'],
      mongoDatabase = process.env[mongoServiceName + '_DATABASE'],
      mongoPassword = process.env[mongoServiceName + '_PASSWORD']
      mongoUser = process.env[mongoServiceName + '_USER'];

  if (mongoHost && mongoPort && mongoDatabase) {
    mongoURLLabel = mongoURL = 'mongodb://';
    if (mongoUser && mongoPassword) {
      mongoURL += mongoUser + ':' + mongoPassword + '@';
    }*/
	
	var mongoUser =  process.env.MONGODB_USER,
    mongoDatabase = process.env.MONGODB_DATABASE,
    mongoPassword = process.env.MONGODB_PASSWORD,
    mongoHost = process.env.MODIRDB_SERVICE_HOST,
    mongoPort = process.env.MODIRDB_SERVICE_PORT,
    mongoURL = 'mongodb://';

mongoURL += mongoUser + ':' + mongoPassword + '@';
mongoURL += mongoHost + ':' + mongoPort + '/' + mongoDatabase;
	
	
    // Provide UI label that excludes user id and pw
    mongoURLLabel += mongoHost + ':' + mongoPort + '/' + mongoDatabase;
    mongoURL += mongoHost + ':' +  mongoPort + '/' + mongoDatabase;

  }
}




var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
ip = process.env.IP || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';


// all environments
app.set('port', port);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());

 formidable = require('formidable');
//app.use(fileupload());

//app.use(formidable());

app.use(express.logger('dev'));

app.use(expressValidator());

app.use(express.methodOverride());

app.use(express.static(path.join(__dirname, 'public')));


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

var mongoDB = mongoURL;
//var mongoDB = settings.dbhost;
mongoose.connect(mongoDB);

//Get the default connection
var db = mongoose.connection
app.set('db',db);
function logger(req,res,next)
{
	

	 
	  if(req.session.username)
	  {
		 
		  
		  
	  }
}


var MongoStore = require('connect-mongo')(session);

app.use(session({secret:'moherangdola',resave:false,saveUninitialized:false,
  store: new MongoStore({
 
	mongooseConnection: db
  }),
}));
app.use(paginate.middleware(10, 50));
app.use(app.router);

var whitelist = ['http://localhost:8100', 'http://example2.com']
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  }else{
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}


//app.all('/geet/*',acl.middleware);

app.set(paginate,paginate);
app.get('/', routes.index);
//app.get('/install/',install.index);

app.get('/geet/',geet.home);
app.get('/geet/list',geet.list);
app.get('/geet/autocompletem/:mname',geet.autocompletem);
app.delete('/geet/delete/:songid',geet.delete);
app.get('/geet/get/:songid',geet.getSong);
app.post('/geet/remove/',geet.remove);

app.get('/geet/retrieve',geet.retrieve);
app.put('/geet/save',geet.save);

app.get('/geet/add/',geet.add);
app.put('/geet/update',geet.update);
app.get('/geet/edit/:songid',geet.edit);
app.put('/hints/save',hint.save);
app.put('/hints/update',hint.update);

app.get('/hints/:songId',hint.index);
app.get('/hint/getData/:hintid',hint.getData);
app.delete('/hint/delete/:hintid',hint.delete);
/*app.get('/hint/list/:songid',hint.hlist);*/
app.get('/hints/retrieve/:songid',hint.retrieve);

app.get('/admin/login', admin.login);
app.post('/admin/loginv',admin.loginv);

app.get("/userg/list",userg.list);
app.get("/user/list",user.list);
app.post("/userg/remove",userg.remove);
app.post("/user/remove",user.remove);
app.get("/userg/get/:groupid",userg.edit);

app.get("/permissiond/",routes.permissiond);

app.get("/user/get/:userid",user.edit);
app.get("/userg/retrieve",userg.retrieve);
app.get("/user/retrieve",user.retrieve);
app.get("/user/getUGs/",user.getugs);
app.put('/userg/save',userg.save);
app.put('/user/save',user.save);


app.get("/logout",routes.logout);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
