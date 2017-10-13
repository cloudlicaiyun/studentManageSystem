var querystring=require('querystring');
var dormitories=[
	{name:'502',type:'male',capacity:8,vacancy:8},
	{name:'505',type:'male',capacity:12,vacancy:12},
	{name:'506',type:'male',capacity:12,vacancy:12},
	{name:'602',type:'female',capacity:12,vacancy:12},
	{name:'603',type:'female',capacity:8,vacancy:8}
];
var Dormitory={
	del:function(req,res){
		var key=req.url.match(/[^\/]+$/)[0];
		for(var i=0;i<dormitories.length;i++){
			if(dormitories[i].name==key){
				dormitories.splice(i,1);
				res.write("1");
				res.end();
				return;
			}
		}
	},
	add:function(req,res){
		var qStr='';
		//从请求体中获取请求数据会不断触发data事件
		req.addListener('data',function(dataPart){
			qStr+=dataPart;
		});
		//从请求体中获取完请求数据会触发end事件
		req.addListener('end',function(){
			var temp=querystring.parse(qStr);
			dormitories.push(temp);
			res.write("1");
			res.end();
		});
	},
	update:function(req,res){
		var qStr='';
		//从请求体中获取请求数据会不断触发data事件
		req.addListener('data',function(dataPart){
			qStr+=dataPart;
		});
		//从请求体中获取完请求数据会触发end事件
		req.addListener('end',function(){
			var temp=querystring.parse(qStr);
			for(var i=0;i<dormitories.length;i++){
				if(dormitories[i].name==temp.name){
					Object.keys(temp).forEach(function(v){
						if(v!='id')
							dormitories[i][v]=temp[v];
					});
					break;
				}
			}
			res.write("1");
			res.end();
		});
	},
	getAll:function(req,res){
		res.write(JSON.stringify(dormitories));
		res.end();
	}
};
module.exports=Dormitory;