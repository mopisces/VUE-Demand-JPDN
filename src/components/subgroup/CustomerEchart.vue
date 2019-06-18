<template>
	<scroller height="-100px" lock-x>
		<div>
			<group>
				<popup-picker ref="filterPick" :data="viewData.options" v-model="form.filterData" title="筛选条件" @on-change="filterChange" :show-name="status.showName" popup-title="筛选条件" ></popup-picker>
				<button-tab >
					<button-tab-item @on-item-click="clickBar" selected>柱状图</button-tab-item>
					<button-tab-item @on-item-click="clickLine">饼状图</button-tab-item>
				</button-tab>
			</group>
			<ve-histogram :data="chartData" :settings="histogramChartSettings" v-if="status.histogramShow"></ve-histogram>
			<ve-pie :data="chartData" v-if="! status.histogramShow"></ve-pie>
		</div>
	</scroller>
</template>
<script>
	import VeHistogram from 'v-charts/lib/histogram.common'
	import VePie from 'v-charts/lib/pie.common'
	import {ButtonTab, ButtonTabItem, PopupPicker, Group, Scroller } from 'vux'
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
			VePie
		},
		data () {
			this.histogramChartSettings = {stack: { '需求': ['全部需求', '重大需求'] }}
			this.lineChartSettings = { axisSite: { right: ['重大率'] },yAxisType: ['KMB', 'percent'],yAxisName: ['数值', '比率']}
			return {
		        chartData:{
		        	columns: ['客户名称', '全部需求', '重大需求', '重大率'],
		        	rows:[
			            { '客户名称': '1/1', '全部需求': 15, '重大需求': 2, '重大率': 0.133 },
			            { '客户名称': '1/2', '全部需求': 10, '重大需求': 2, '重大率': 0.20 },
			            { '客户名称': '1/3', '全部需求': 16, '重大需求': 1, '重大率': 0.167 },
			            { '客户名称': '1/4', '全部需求': 14, '重大需求': 3, '重大率': 0.214 },
			            { '客户名称': '1/5', '全部需求': 8, '重大需求': 2, '重大率': 0.25 },
			            { '客户名称': '1/6', '全部需求': 6, '重大需求': 1, '重大率': 0.167 },
			            { '客户名称': '1/7', '全部需求': 8, '重大需求': 2, '重大率': 0.25 },
			            { '客户名称': '1/8', '全部需求': 8, '重大需求': 2, '重大率': 0.25 },
			            { '客户名称': '1/9', '全部需求': 8, '重大需求': 2, '重大率': 0.25 },
			            { '客户名称': '1/10', '全部需求': 8, '重大需求': 2, '重大率': 0.25 },
					]
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
				}
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
	  			/*this.$api.echartRequest.cusEchartDat().then((res)=>{
	  				if( res.data.code == 200 ){
	  					this.chartData.rows = res.data.list
	  				}
	  			})*/
	  			this.$api.echartRequest.cusEchartData( data ).then((res)=>{
	  				//console.dir(res.data)
	  			})
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
	  				this.getDataRows(newV)
	  			},
	  			deep: true
	  		}
		}
	}
</script>
	