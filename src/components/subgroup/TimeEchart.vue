<template>
	<scroller height="-140px" lock-x>
		<div>
			<group>
				<popup-picker :columns="1" :data="viewOptions" v-model="form.filterData" title="筛选条件" @on-change="filterChange" :show-name="status.showName" popup-title="筛选条件" ></popup-picker>
				<button-tab >
					<button-tab-item @on-item-click="clickBar" :selected="status.histogramShow">柱状图</button-tab-item>
					<button-tab-item @on-item-click="clickLine" :selected="! status.histogramShow">折线图</button-tab-item>
				</button-tab>
				<popup-header :title="title"></popup-header>
				<ve-histogram :data="chartData" :settings="chartSettings" v-if="status.histogramShow" :events="chartEvents"></ve-histogram>
				<ve-line :data="chartData" :settings="chartSettings"  v-if="! status.histogramShow" :events="chartEvents"></ve-line>
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
			let self = this
			/**
			 * [chartEvents 点击图表时触发/修改vuex中的状态]
			 */
			this.chartEvents={
				click:function(e){
					let time = parseInt(e.name).toString()
					if( time.length == 1 ){
						time = '0' + time
					}
					let data = {
						time:store.state.echart.timeFilterData[0] + '-' + time,
						cusName:''
					}
					if(e.seriesType == 'bar'){
						store.commit('setTimeStatus',true)
					}
					if(e.seriesType == 'line'){
						store.commit('setTimeStatus',false)
					}
					store.commit('setDataViewStatus',1)
					store.commit('setEchartDetail',data)
					self.$router.push('/common/viewDetail')
				}
			}
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
	  	methods:{
	  		/**
	  		 * [filterChange popup-picker变化时触发/修改vuex中的状态值]
	  		 * @param  {[array]} val [过滤状态码]
	  		 */
	  		filterChange(val){
	  			if( this.form.filterData.join('*') == store.state.echart.timeFilterData.join('*') ){
	  				return 
	  			}
	  			store.commit('setEchartTime',val)
	  		},
	  		/**
	  		 * [getDataRows 获取图表数据/并设置标题]
	  		 * @param  {[array]} data [图表状态]
	  		 */
	  		getDataRows( data ){
	  			if(store.state.echart.timeChartRows.length != '0'){
	  				this.chartData.rows = store.state.echart.timeChartRows
	  				return 
		  		}
	  			this.$api.echartRequest.echartData( data ).then((res)=>{
	  				if(res.data.code == 200){
	  					this.chartData.rows = res.data.list
	  					store.commit('setTimeRows',res.data.list)
	  				}
	  			})
	  			this.title = store.state.echart.timeFilterData[0] + '年需求总览'
	  		},
	  		/**
	  		 * [clickBar 显示柱状图]
	  		 */
	  		clickBar(){
	  			this.status.histogramShow = true
	  		},
	  		/**
	  		 * [clickLine 显示饼状图]
	  		 */
	  		clickLine(){
	  			this.status.histogramShow = false
	  		}
	  	},
	  	created(){
			this.form.filterData = store.state.echart.timeFilterData
			this.status.histogramShow = store.state.echart.timeStatus.histogramShow
			this.getDataRows(this.form.filterData)
	  	},
	  	computed:{
	  		/**
			* [changeFilterData 暴露vuex中状态]
			* @return {[type]} [vuex中timeFilterData状态]
			*/
	  		changeFilterData(){
	  			return store.state.echart.timeFilterData
	  		},
	  		/**
	  		 * [viewOptions 获取图表过滤Popup-Picker的值]
	  		 * @return {[type]} [description]
	  		 */
	  		viewOptions(){
	  			return options.timeEchart
	  		}
	  	},
	  	/**
	  	 * [watch 监听暴露的vuex中的状态值]
	  	 */
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

