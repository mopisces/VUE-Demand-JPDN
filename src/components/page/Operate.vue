<template>
	<grid :cols="2" style="margin">
		<grid-item  v-if="gridItem.demandShow.status == 1" link="/common/demand">
			<img slot="icon" src="@/assets/grid/demand.png">
			<span slot="label">
				提出需求
			</span>
		</grid-item>
		<grid-item  v-if="gridItem.analystsShow.status == 1" link="/common/analist">
			<img slot="icon" src="@/assets/grid/analysts.png">
			<span slot="label">
				需求分析
				<badge :text="gridItem.analystsShow.badge"></badge>
			</span>
		</grid-item>
		<grid-item  v-if="gridItem.modShow.status == 1"  link="/common/modlist">
			<img slot="icon" src="@/assets/grid/mod.png">
			<span slot="label">
				需求修改
				<badge :text="gridItem.modShow.badge"></badge>
			</span>
		</grid-item>
		<grid-item  v-if="gridItem.testShow.status == 1"  link="/common/tlist">
			<img slot="icon" src="@/assets/grid/test.png">
			<span slot="label">
				需求测试
				<badge :text="gridItem.testShow.badge"></badge>
			</span>
		</grid-item>
		<grid-item link="/common/echart">
			<img slot="icon" src="@/assets/grid/echart.png">
			<span slot="label">数据分析</span>
		</grid-item>
	</grid>
</template>


<script>
	import { Grid, GridItem,  XHeader, Badge  } from 'vux'
	import store from '@/store/store'

	export default {
		components: {
	    	Grid,
	    	GridItem,
	    	XHeader ,
	    	Badge 
	  	},
	  	data () {
	  		return {
	  			gridItem:{
	  				demandShow:{status:'0'},
	  				analystsShow:{status:'0'},
	  				modShow:{status:'0'},
	  				testShow:{status:'0'},
	  			}
	  		}
	  	},
	  	methods:{
	  		/**
	  		 * [pushUrl 跳转页面]
	  		 * @param  {[string]} url [目标URL]
	  		 */
	  		pushUrl(url){
	  			this.$router.push(url)
	  		},
	  		/**
	  		 * [getAuthUrl 获取对应的权限路由及Badge]
	  		 */
	  		getAuthUrl(){
	  			this.$api.homeRequest.getAuthUrl().then((res)=>{
		  			if(res.data.code == 200 ){
		  				this.gridItem = res.data.list
						store.commit('setAuthUrl',res.data.list)
		  			}
	  			})
	  		}
	  	},
	  	created () {
	  		store.commit('setTitle','操作首页') //修改vuex中标题值
	  		this.getAuthUrl()
	  	}
	}
</script>