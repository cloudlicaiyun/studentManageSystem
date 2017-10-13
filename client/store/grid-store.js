var studentConfig={
	namespace:true,
	title:'学生信息',
	headers:["学号","姓名","性别","家庭住址","民族"],
	isEdit:true,
	editShow:false,
	editItem:{id:"",name:"",sex:"",address:"",nation:""},
	key:'id',
	addOrUpdate:'add',	
	fields:[
		{name:'id',isKey:true},
		{name:'name'},
		{
			name:'sex',
			type:'radio',
			options:[
				{name:'男',value:'male'},
				{name:'女',value:'female'}
			]
		},
		{name:'address'},
		{
			name:'nation',
			type:'select',
			options:[
				{name:'汉族',value:"汉族"},
				{name:'壮族',value:"壮族"},
				{name:'布衣族',value:'布衣族'}
			]
		}
	]
};
var domitoryConfig={
	namespaced:true,
	title:'寝室信息',
	headers:["寝室号","类别","可入住人数","空铺数量"],
	isEdit:true,
	editShow:false,
	editItem:{name:"",type:"male",capacity:8,vacancy:8},
	addOrUpdate:'add',		//表示是新增
	key:'name',
	fields:[
		{name:'name',isKey:true},
		{
			name:'type',
			type:'select',
			options:[
				{name:'男生寝室',value:'male'},
				{name:'女生寝室',value:'female'}
			]
		},
		{name:'capacity'},
		{name:'vacancy'}
	]
};
var dormitoryWomen={
		namespaced:true,
		title:'班级女生寝室信息',
		headers:["寝室号","姓名","是否入住","居住时间"],
		isEdit:true,
		editShow:false,
		editItem:{id:"",name:"",stay:'',time:''},
		addOrUpdate:'add',		//表示是新增
		key:'id',
		fields:[
			{name:'id',isKey:true},
			{name:'name'},
			{
				name:'stay',
				type:'radio',
				options:[
					{name:'是',value:'yes'},
					{name:'外校居住',value:'no'}
				]
			},
			
			{name:'time'}
		]

};
var gridModule={
	namespaced:true,
	state:{
		url:"http://localhost:8080/",
		grids:[]
	},
	getters:{
		// addUrl:function(state,path){
		// 	return state.url+path+'/add';
		// },
		// delUrl:function(state,path){
		// 	return state.url+path+'/del';
		// },
		// updateUrl:function(state,path){
		// 	return state.url+path+'/update';
		// },
		// getUrl:function(state,paty){
		// 	console.log(state);
		// 	return state.url+path+'/getAll';
		// }
	},
	mutations:{
		addGrid:function(state,name){
			var i=state.grids.indexOf(name);
			if(i==-1) state.grids.push(name);
		},
		delGrid:function(state,i){
			console.log(i);
			// state.grids.splice(state.grids.indexOf(name),1);
			state.grids.splice(i,1);
			console.log(state.grids)
		},
		//options要有4个键
		//gridName表示store的名字
		//deepCopy深复制函数
		//isAdd是否是新增
		//item子store中editItem的初始化状态
		beginEdit:function(state,options){
			var targetStore=state[options.gridName];
			options.deepCopy(options.item,targetStore.editItem);
			targetStore.editShow=true;
			targetStore.addOrUpdate=options.isAdd?'add':'update';
		},
		endEdit:function(state,gridName){
			console.log(gridName);
			state[gridName].editShow=false;
		}
	},
	actions:{},
	modules:{
		student:{state:studentConfig},
		dormitory:{state:domitoryConfig},
		dormitorieswomen:{state:dormitoryWomen}
	}
};