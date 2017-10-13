var edit=Vue.extend({
	template:'#edit',
	components:{popwindow:popwindow},
	props:['gridName'],
	computed:{//计算属性
		state:function(){return this.$store.state.grid[this.gridName];},
		title:function(){
			return this.state.editItem[this.state.key]==""
					?"新增"
					:"修改-"+this.state.editItem[this.state.key];
		}
	},
	methods:{
		deepCopy:function(obj1,obj2){
			for(var p in obj1){
				if(Array.isArray(obj1[p]))
					obj2[p]=obj1[p].slice(0);
				else if(obj1[p]!=null&&(typeof obj1[p]=='object')){
					obj2[p]={};
					arguments.callee(obj1[p],obj2[p]);
				}else
					obj2[p]=obj1[p];
			}
		},
		editComplete:function(){
			this.$emit('edit-complete');
		}
	}
});