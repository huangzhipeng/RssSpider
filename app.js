/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var fs = require('fs');
var accessLogfile = fs.createWriteStream('logs/access.log', {flags: 'a'});
var errorLogfile = fs.createWriteStream('logs/error.log', {flags: 'a'});

var DB = require('./DB');
//核心业务方法
var spider = require('./service/spiderFromRss');
var rssSite = require('./config/rssSite.json');

//间隔时间
var interval = rssSite.ttl * 60 * 1000;

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

//页面的开始
app.get('/', routes.index);
app.get('/users', user.list);
app.get('/news_list', routes.news_list)
app.get('/getNewsPage', routes.getNewsPage);
//得到这条新闻的内容  如果需要转为json 添加参数 json=true
app.get('/newsRecord',routes.newsRecord);


//数据库的初始化
DB.init();

//(function schedule() {
//    setTimeout(function () {
//spider.rssSpider(function () {
//            schedule();
//});
//    }, interval);
//})();


http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
