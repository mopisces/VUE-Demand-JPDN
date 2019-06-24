<template>
	<scroller height="-140px" lock-x>
		<div>
			<group>
				<popup-picker ref="filterPick" :data="viewOptions" v-model="form.filterData" title="筛选条件" @on-change="filterChange" :show-name="status.showName" popup-title="筛选条件" ></popup-picker>
				<button-tab >
					<button-tab-item @on-item-click="clickBar" :selected="status.histogramShow">柱状图</button-tab-item>
					<button-tab-item @on-item-click="clickPie" :selected="! status.histogramShow">饼状图</button-tab-item>
				</button-tab>
			</group>
			<popup-header :title="title"></popup-header>
			<ve-histogram :data="chartData" :settings="setting.chartSettings" v-if="status.histogramShow" :events="chartEvents"></ve-histogram>
			<ve-pie :data="chartData" v-if="! status.histogramShow" :events="chartEvents"></ve-pie>
		</div>
	</scroller>
</template>
<script>
	import VeHistogram from 'v-charts/lib/histogram.common'
	import VePie from 'v-charts/lib/pie.common'
	import {ButtonTab, ButtonTabItem, PopupPicker, Group, Scroller, PopupHeader } from 'vux'
	import options from '@/util/Options' 
	import store from '@/store/store'

	export default 
	{
		components: {
			ButtonTab,
			ButtonTabItem ,
			PopupPicker,
			Group,
			Scroller,
			VeHistogram,
			VePie,
			PopupHeader
		},
		data () {
			let self = this
			/**
			 * [chartEvents 点击图表时触发/修改vuex中的状态]
			 */
			this.chartEvents = {
				click:function (e) {
					let data = {
						time:store.state.echart.cusFilterData[1],
						cusName:e.name
					}
					if(e.seriesType == 'pie'){
						store.commit('setCusStatus',false)
					}
					if( e.seriesType == 'bar' ){
						store.commit('setCusStatus',true)
					}
					store.commit('setDataViewStatus',0)
					store.commit('setEchartDetail',data)
					self.$router.push('/common/viewDetail')
				}
			}
			return {
				setting:{
					chartSettings:{metrics: ['全部需求', '重大需求'],dimension: ['客户名称']}
				},
		        chartData:{
		        	columns: ['客户名称', '全部需求', '重大需求'],
		        	rows:[]
				},
				form:{
					filterData:[]
				},
				viewData:{
					options:[]
				},
				status:{
					histogramShow:true,
					showName:true
				},
				title:''
			}
	  	},
	  	methods:{
	  		/**
	  		 * [filterChange popup-picker变化时触发/修改vuex中的状态值]
	  		 * @param  {[array]} val [过滤状态码]
	  		 */
	  		filterChange(val){
	  			if( this.form.filterData.join('*') == store.state.echart.cusFilterData.join('*') ){
	  				return 
	  			}
	  			store.commit('setEchartCus',val)
	  		},
	  		/**
	  		 * [getDataRows 获取图表数据/并设置标题]
	  		 * @param  {[array]} data [图表状态]
	  		 */
	  		getDataRows( data ){
	  			if( store.state.echart.cusChartRows.length != '0' ){
	  				this.chartData.rows = store.state.echart.cusChartRows
	  				return 
	  			}
	  			this.$api.echartRequest.echartData( data ).then((res)=>{
	  				if(res.data.code == 200){
	  					this.chartData.rows = res.data.list
	  					store.commit('setCusRows',res.data.list)
	  				}
	  			})
	  			let title = store.state.echart.cusFilterData[0] == 1 ? ('--TOP10'):('--LAST10')
	  			this.title = store.state.echart.cusFilterData[1] + '年客户需求总览' + title
	  		},
	  		/**
	  		 * [clickBar 显示柱状图]
	  		 */
	  		clickBar(){
	  			this.status.histogramShow = true
	  		},
	  		/**
	  		 * [clickPie 显示饼装图]
	  		 */
	  		clickPie(){
	  			this.status.histogramShow = false
	  		}
	  	},
		created(){
			this.form.filterData = store.state.echart.cusFilterData
			this.status.histogramShow = store.state.echart.cusStatus.histogramShow
			this.getDataRows(this.form.filterData)
	  	},
	  	computed:{
	  		/**
	  		 * [viewOptions 获取图表过滤Popup-Picker的值]
	  		 */
	  		viewOptions(){
	  			return options.customerEchart
	  		},
	  		/**
	  		 * [changeFilterData 暴露vuex中状态]
	  		 * @return {[type]} [vuex中cusFilterData状态]
	  		 */
	  		changeFilterData(){
	  			return store.state.echart.cusFilterData
	  		}
	  	},
	  	/**
	  	 * [watch 监听暴露的vuex中的状态值]
	  	 */
		watch:{
	  		'changeFilterData':{
	  			handler:function(newV,oldV){
	  				store.commit('setCusRows',[])
	  				this.getDataRows(newV)
	  			},
	  			deep: true
	  		}
		}
	}
</script>
