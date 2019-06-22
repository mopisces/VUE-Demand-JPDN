<template>
	<div>
		<div style="height:44px;">
			<sticky scroll-box="vux_view_box_body" :offset="46" :check-sticky-support="false" >
				<tab>
					<tab-item :selected="item.selected" @click.native="onItemClick(index)"  v-for="(item, index) in tabList" :key="index">{{ item.title }}</tab-item>
				</tab>
			</sticky>
		</div>
		<div id="vux_view_box_body">
			<component v-bind:is="tabView"></component>
		</div>
	</div>

</template>
<script>
	import { Tab, TabItem, Sticky  } from 'vux'
	import CustomerEchart from '@/components/subgroup/CustomerEchart'
	import TimeEchart from '@/components/subgroup/TimeEchart'
	import store from '@/store/store'
	export default {
		components: {
			Tab,
			TabItem,
			Sticky ,
			CustomerEchart,
			TimeEchart,
		},
		data () {
			return {
				tabList:[],
				tabView: '',
			}
		},
		methods:{
			onItemClick(index){
				switch(index){
					case 0:
					this.tabView = 'CustomerEchart'
					break
					case 1:
					this.tabView = 'TimeEchart'
					break
				}
			},
			getCreateData(){
				if(store.state.echart.dataViewStatus.tabViewIndex == '0'){
					this.tabList = [{title:'按客户汇总数据',selected:true},{title:'按时间汇总数据',selected:false}]
					this.tabView = 'CustomerEchart'
				}
				if(store.state.echart.dataViewStatus.tabViewIndex == '1'){
					this.tabList = [{title:'按客户汇总数据',selected:false},{title:'按时间汇总数据',selected:true}]
					this.tabView = 'TimeEchart'
				}
			}
		},
		created(){
			this.getCreateData()
			store.commit('setTitle','需求数据汇总')
		}
	}
</script>