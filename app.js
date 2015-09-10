var express = require('express')
  , nunjucks = require('nunjucks')
  , http = require('http')
  , path = require('path');

var app = express();

var env = new nunjucks.Environment(new nunjucks.FileSystemLoader(__dirname + '/views'), { 
    dev: true, 
    autoescape: true 
});

// ------------- nunjucks filters

env.addFilter('shorten', function(str, count) {
  if(str.length > count) {
    return str.slice(0, count)+'...';
  } else {
    return str;
  }
});

// ------------------------------

app.configure(function(){
  app.set('views', __dirname + '/views');

  env.express(app);

  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('lz cookie'));
  app.use(express.session());
  app.use(require('less-middleware')({ src: __dirname + '/public' }));

  // register static routes before the app router
  app.use('/css', express.static(path.join(__dirname, 'public/css')));
  app.use('/js', express.static(path.join(__dirname, 'public/js')));
  app.use('/images', express.static(path.join(__dirname, 'public/images')));
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

// ----------------------- routes

// index
app.get('/', function(req, res) {
  return res.render('index.html');
});

// anything else
app.get('/*', function(req, res) {
  var file = req.url;
  if(file.indexOf('.html') < 0) {
    file += '.html'
  }
  return res.render(file, { url: req.url });
});

// ------------------------------

http.createServer(app).listen(3001, function(){
  console.log("The server is running at http://localhost:3000");
});
