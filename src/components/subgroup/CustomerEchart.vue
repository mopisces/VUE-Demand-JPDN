<template>
	<scroller height="-140px" lock-x>
		<div>
			<group>
				<popup-picker ref="filterPick" :data="viewData.options" v-model="form.filterData" title="筛选条件" @on-change="filterChange" :show-name="status.showName" popup-title="筛选条件" ></popup-picker>
				<button-tab >
					<button-tab-item @on-item-click="clickBar" selected>柱状图</button-tab-item>
					<button-tab-item @on-item-click="clickLine">饼状图</button-tab-item>
				</button-tab>
			</group>
			<popup-header :title="title"></popup-header>
			<ve-histogram :data="chartData" :settings="chartSettings" v-if="status.histogramShow"></ve-histogram>
			<ve-pie :data="chartData" v-if="! status.histogramShow"></ve-pie>
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
			this.histogramChartSettings = {stack: { '需求': ['全部需求', '重大需求'] }}
			this.chartSettings = {metrics: ['全部需求', '重大需求'],dimension: ['客户名称']}
			return {
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
		created(){
			this.form.filterData = store.state.echart.cusFilterData
			this.createViewOptions()
			this.getDataRows(this.form.filterData)
	  	},
	  	methods:{
	  		filterChange(val){
	  			if( this.form.filterData.join('*') == store.state.echart.cusFilterData.join('*') ){
	  				return 
	  			}
	  			store.commit('setEchartCus',val)
	  		},
	  		createViewOptions(){
	  			this.viewData.options = options.customerEchart
	  		},
	  		getDataRows( data ){
	  			if( store.state.echart.cusChartRows.length != '0' ){
	  				this.chartData.rows = store.state.echart.cusChartRows
	  				return 
	  			}
	  			this.$api.echartRequest.cusEchartData( data ).then((res)=>{
	  				if(res.data.code == 200){
	  					this.chartData.rows = res.data.list
	  					store.commit('setCusRows',res.data.list)
	  				}
	  			})
	  			let title = store.state.echart.cusFilterData[0] == 1 ? ('--TOP10'):('--LAST10')
	  			this.title = store.state.echart.cusFilterData[1] + '年客户需求总览' + title
	  		},
	  		clickBar(){
	  			this.status.histogramShow = true
	  		},
	  		clickLine(){
	  			this.status.histogramShow = false
	  		}
	  	},
	  	computed:{
	  		changeFilterData(){
	  			return store.state.echart.cusFilterData
	  		}
	  	},
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
