var menu=Vue.extend({
	template:'#menu',
	data:function(){
		return {
			menus:[]
		};
	},
	created:function(){
		this.menus=[
				{
					name:'信息管理',
					isShow:false,
					subMenus:[
						{name:'学生信息管理',gridName:'student'},
						{name:'寝室信息管理',gridName:'dormitory'},
						{name:'班级女生寝室信息',gridName:'dormitorieswomen'}
				]},
				{	
					name:'待定',
					isShow:false,
					subMenus:[
						{name:'待定...',gridName:'...'}
				]}
			];
	},
	methods:{
		toggle:function(i){
			this.menus[i].isShow=!this.menus[i].isShow;
		},
		addTab:function(sub){
			this.$store.commit("tabs/addTab",sub.name);
			this.$store.commit('grid/addGrid',sub.gridName)
		},
		delTab:function(){

		}
	}
});

Vue.component('mymenu',menu);