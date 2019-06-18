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
	  	created () {
	  		store.commit('setTitle','操作首页')
	  		this.getAuthUrl()
	  	},
	  	methods:{
	  		pushUrl(url){
	  			this.$router.push(url)
	  		},
	  		getAuthUrl(){
	  			let self = this
	  			/*if( JSON.stringify(store.state.authUrl) != "{}"){
	  				self.gridItem = store.state.authUrl
	  				return 
	  			}*/
	  			this.$api.homeRequest.getAuthUrl().then((res)=>{
		  			if(res.data.code == 200 ){
		  				self.gridItem = res.data.list
						store.commit('setAuthUrl',res.data.list)
		  			}
	  			})
	  		},
	  		setTittle(){
	  			this.$emit('setTittle','操作首页')
	  		}
	  	}
	}
</script>