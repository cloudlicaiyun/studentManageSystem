var http=require('http');
var route=require('./route.js');
var server=http.createServer(function(req,res){
	if(/favicon.ico/.test(req.url)) {
		res.end();return;
	}
	//可以跨域
	res.writeHeader(200,{
		'Access-Control-Allow-Origin':'*'
	});
	route(req,res);
});
server.listen(8080);
console.log('server is running at 8080 port...');