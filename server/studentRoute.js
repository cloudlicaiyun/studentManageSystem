var querystring=require('querystring');
var students=[
	{id:'001',name:'张三',sex:'male',address:'北京',nation:'汉族'},
	{id:'002',name:'李四',sex:'female',address:'上海',nation:'汉族'},
	{id:'003',name:'王五',sex:'female',address:'南昌',nation:'壮族'},
	{id:'004',name:'马六',sex:'male',address:'青岛',nation:'布衣族'},
	{id:'005',name:'杜七',sex:'female',address:'深圳',nation:'汉族'},
];
var Student={
	del:function(req,res){
		var key=req.url.match(/[^\/]+$/)[0];
		for(var i=0;i<students.length;i++){
			if(students[i].id==key){
				students.splice(i,1);
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
			students.push(temp);
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
			for(var i=0;i<students.length;i++){
				if(students[i].id==temp.id){
					Object.keys(temp).forEach(function(v){
						if(v!='id')
							students[i][v]=temp[v];
					});
					break;
				}
			}
			res.write("1");
			res.end();
		});
	},
	getAll:function(req,res){
		res.write(JSON.stringify(students));
		res.end();
	}
};
module.exports=Student;