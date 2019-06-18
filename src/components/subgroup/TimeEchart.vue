<template>
	<scroller height="-140px" lock-x>
		<div>
			<group>
				<popup-picker :columns="1" :data="viewData.options" v-model="form.filterData" title="筛选条件" @on-change="filterChange" :show-name="status.showName" popup-title="筛选条件" ></popup-picker>
				<button-tab >
					<button-tab-item @on-item-click="clickBar" selected>柱状图</button-tab-item>
					<button-tab-item @on-item-click="clickLine">折线图</button-tab-item>
				</button-tab>
				<popup-header :title="title"></popup-header>
				<ve-histogram :data="chartData" :settings="chartSettings" v-if="status.histogramShow"></ve-histogram>
				<ve-line :data="chartData" :settings="chartSettings"  v-if="! status.histogramShow"></ve-line>
			</group>
		</div>
	</scroller>
</template>
<script>
import VeHistogram from 'v-charts/lib/histogram.common'
import VeLine from 'v-charts/lib/line.common'
import {ButtonTab, ButtonTabItem, PopupPicker, Group, Scroller, PopupHeader  } from 'vux'
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
		VeLine,
		PopupHeader 
	},
	data () {
		return {
	        chartData:{
	        	columns: ['时间', '全部需求', '重大需求'],
	        	rows:[]
	        },
	        chartSettings:{
	        	metrics: ['全部需求', '重大需求'],
	        	dimension: ['时间']
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
		this.form.filterData = store.state.echart.timeFilterData
		this.createViewOptions()
		this.getDataRows(this.form.filterData)
  	},
  	methods:{
  		filterChange(val){
  			if( this.form.filterData.join('*') == store.state.echart.timeFilterData.join('*') ){
  				return 
  			}
  			store.commit('setEchartTime',val)
  		},
  		createViewOptions(){
  			this.viewData.options = options.timeEchart
  		},
  		getDataRows( data ){
  			if(store.state.echart.timeChartRows.length != '0'){
  				this.chartData.rows = store.state.echart.timeChartRows
  				return 
	  		}
  			this.$api.echartRequest.cusEchartData( data ).then((res)=>{
  				if(res.data.code == 200){
  					this.chartData.rows = res.data.list
  					store.commit('setTimeRows',res.data.list)
  				}
  			})
  			this.title = store.state.echart.timeFilterData[0] + '年需求总览'
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
  			return store.state.echart.timeFilterData
  		}
  	},
	watch:{
  		'changeFilterData':{
  			handler:function(newV,oldV){
  				store.commit('setTimeRows',[])
  				this.getDataRows(newV)
  			},
  			deep: true
  		}
	}
}
</script>

