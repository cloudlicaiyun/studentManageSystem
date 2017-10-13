var querystring=require('querystring');
var dormitorieswomens=[
	{id:'01',name:'赵丽颖',stay:'yes',time:'两个月'},
	{id:'02',name:'林依晨',stay:'no',time:'两个月'},
	{id:'03',name:'张韶涵',stay:'yes',time:'三个月'},
	{id:'04',name:'朱碧石',stay:'no',time:'两个月'},
	{id:'05',name:'谢娜',stay:'no',time:'五个月'},
	{id:'06',name:'张碧晨',stay:'no',time:'两个月'},
	{id:'07',name:'林倩',stay:'yes',time:'一个月'}
];
var Dormitorieswomen={
	del:function(req,res){
		var key=req.url.match(/[^\/]+$/)[0];
		for(var i=0;i<dormitorieswomens.length;i++){
			if(dormitorieswomens[i].id==key){
				dormitorieswomens.splice(i,1);
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
			dormitorieswomens.push(temp);
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
			for(var i=0;i<dormitorieswomens.length;i++){
				if(dormitorieswomens[i].id==temp.id){
					Object.keys(temp).forEach(function(v){
						if(v!='id')
							dormitorieswomens[i][v]=temp[v];
					});
					break;
				}
			}
			res.write("1");
			res.end();
		});
	},
	getAll:function(req,res){
		res.write(JSON.stringify(dormitorieswomens));
		res.end();
		
	}
};
module.exports=Dormitorieswomen;