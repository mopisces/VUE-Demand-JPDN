<template>
	<div style="height:100%">
		<!--滑动层-->
		<view-box>
			<div slot="header">
				<x-header :title="title"  :left-options="{backText:'操作页',preventGoBack:true}" @on-click-back="jumpOperate()">
					<x-icon type="navicon" style="fill: #fff"  @click.native="status.showPopup = true" slot="right"></x-icon>
				</x-header>
				<search v-model="filterData.keyWorld" :auto-fixed="false" style="line-height:12px" @on-submit="search()">
					<popup-picker slot="left" :data="optionsData.keyType" v-model="filterData.keyType" :show-name="showName=true"></popup-picker>
				</search>
			</div>
			<scroller lock-x use-pulldown use-pullup @on-pulldown-loading="pullDownRefresh()" @on-pullup-loading="pullUpLoad()" ref="homeScroller" height="-100" >
				<div>
					<group v-for="(item,index) in homeList" :key="index" style="background-color:#999;border-style:solid;border-color:#999;" gutter="0">
						<cell is-link :border-intent = "false" :arrow-direction="item.show ?'up':'down'" @click.native="item.show = !item.show"  primary="content">
							<icon type="circle" slot="icon" v-if="item.is_major_mod == 0"></icon>
							<icon type="warn" slot="icon" v-if="item.is_major_mod == 1"></icon>
							<span slot="title">
								<span>需求编号：{{item.demand_id}}</span>
								<badge text="待分析" v-if="item.demand_status == 0"></badge>
								<badge text="待修改" v-if="item.demand_status == 1"></badge>
								<badge text="待测试" v-if="item.demand_status == 2"></badge>
								<badge text="已完成" v-if="item.demand_status == 3"></badge>
							</span>
							<span slot="inline-desc">
								<badge :text="item.propose_cus" v-if="item.propose_cus"></badge>
								<badge text="内部提出" v-if="!item.propose_cus"></badge>
								<badge :text="item.contact_person" v-if="item.contact_person"></badge>
								<badge :text="item.propose_time"></badge>
								<badge :text="statusDemandType(item.demand_type)" v-if="item.demand_type"></badge>
								<badge :text="statusPriorityLevel(item.priority_level)" v-if="item.priority_level"></badge>
							</span>
							
						</cell>
						<cell title="需求说明" :value="item.demand_instru" value-align="left" ></cell>
						<cell title="修改说明" :value="item.mod_instru" value-align="left" v-if="(item.demand_status >=2 )? true:false"></cell>
						<template v-if="! item.show " >
							<cell title="联系方式" :value="item.contact_tel_no_1" v-if="!item.contact_tel_no_1 == '' ">
							</cell>
							<cell title="期望完成日期" :value="item.expect_com_time">
							</cell>
							<template v-if="item.demand_status >= 1 ">
							    <cell title="需求分析人员" :value="item.analysts"></cell>
							    <cell title="需求确认日期" :value="item.confirm_time"></cell>
							    <cell title="计划完成日期" :value="item.plan_com_time"></cell>
						  	</template>
						  	<template v-if=" item.demand_status >=2 ">
					      		<cell title="完成状态" :value="statusComplete(item.complete_state)"></cell>
					     		<cell title="完成日期" :value="item.complete_time"></cell>
					      		<cell title="修改人员" :value="item.modipersons"></cell>
						    </template>
						  	<template v-if=" item.demand_status >=3 " >
				        		<cell title="测试人员" :value="item.testers"></cell>
				        		<cell title="通过测试日期" :value="item.pass_test_time"></cell>
				        		<cell title="测试状态" :value="statusPassTest(item.test_remark)"></cell>
				      		</template>
						</template>
			        </group>
			        <divider v-if="status.onBottom">我也是有底线的...</divider>
		      	</div>
			</scroller>
		</view-box>
		<!--弹出层-->
		<popup v-model="status.showPopup" position="right" @on-hide="onHide()" style="height:100%">
			<div :style="popupData.popupWidth">
				<x-header title="筛选条件" :left-options="{showBack:false}" ></x-header>
				<group>
					<search v-model="filterData.cusName" position="absolute"  ref="searchPopup" @on-change="getCusName" :results="popupData.results" @on-result-click="clickCusName" placeholder="客户名称">
					</search>
					<checklist title="需求状态" label-position="left" :options="optionsData.demandStatus" v-model="filterData.demandStatus" gutter="0"></checklist>
					<checklist title="需求类型" label-position="left" :options="optionsData.demandType" v-model="filterData.demandType" gutter="0"></checklist>
				</group>
				<group title="是否重大" gutter="0">
					<radio :options="optionsData.isMajor" v-model="filterData.isMajor" ></radio>
				</group>
				<group title="优先级" gutter="0">
					<radio :options="optionsData.priorityLevel" v-model="filterData.priorityLevel" ></radio>
				</group>
			</div>
		</popup>
		<!--提示信息-->
		<toast v-model="toastConfig.show" :type="toastConfig.type">{{ toastConfig.text }}</toast>
	</div>
</template>
<script>
	import {ViewBox, XHeader, Scroller, Group, Cell, Icon, Badge, Popup, Search, Checklist, Radio, Toast, PopupPicker, Divider  } from 'vux'
	import store from '@/store/store'
	import formatter from '@/util/formatter' 
	import options from '@/util/Options' 

	export default {
		components:{
			ViewBox,
			XHeader,
			Scroller ,
			Group,
			Cell,
			Icon,
			Badge,
			Popup,
			Search,
			Checklist,
			Radio,
			Toast,
			PopupPicker ,
			Divider
		},
		data () {
			return {
				title:'',
				homeList:[],
				status:{
					onBottom:false,
					showPopup:false,
				},
				popupData:{
					popupWidth:'',
					results:[],
				},
				filterData:{},
				optionsData:{
					demandStatus:[],
					demandType:[],
					isMajor:[],
					priorityLevel:[],
					keyType:[]
				},
				toastConfig:{
					show:false,
					type:'',
					text:''
				}
			}
		},
		methods:{
			/*搜索类型*/
			search(){
				if( this.filterData.keyWorld == '' ){
					this.filterData = {
						cusName:'',
						demandStatus:['0','1','2','3'],
						isMajor:'2',
						demandType:['0','1','2','3'],
						priorityLevel:'2',
						curPage:1,
						keyWorld:'',
						keyType:['1']
					}
				}
				store.commit('setFilterData',this.filterData)
				this.getCreateData()
			},
			/*跳转到操作页*/
			jumpOperate(){
				this.$router.push('/common/operate')
			},
			/*下拉刷新*/
			pullDownRefresh(){
				this.filterData.curPage = 1
				store.commit('setFilterData',this.filterData)
				setTimeout(()=>{
					this.getCreateData()
					this.$nextTick(() => {
						setTimeout(() => {
							this.$refs.homeScroller.donePulldown()
						}, 10)
					})
				},3000)
				this.status.onBottom = false
			},
			/*上拉加载*/
			pullUpLoad(){
				this.filterData.curPage = ++this.filterData.curPage
				store.commit('setFilterData',this.filterData)
				setTimeout(() => {
					this.getCreateData('pullUp')
					setTimeout(() => {
						 this.$refs.homeScroller.donePullup()
					},10)
				},3000)
			},
			/*获取数据*/
			getCreateData( type='' ){
				this.filterData = Object.assign({},this.filterData,store.state.filterData)
				this.$api.homeRequest.getFilterData( this.filterData ).then((res)=>{
					if( res.data.code == 200 ){
						this.title = '当前条件记录数：' + res.data.list.totalRecord
						if( type == 'pullUp' ){
							for(let j = 0 ; j < res.data.list.list.length ; j++){
								this.homeList.push(res.data.list.list[j])
							}
						}else{
							this.homeList = res.data.list.list
						}
						if(res.data.list.list.length < 10){
							this.status.onBottom = true
							this.$nextTick(()=>{
								this.$refs.homeScroller.disablePullup()
								console.dir('No more data, Pullup disabled!')
							})
						}else{
							this.status.onBottom = false
							this.$nextTick(()=>{
								this.$refs.homeScroller.enablePullup()
								console.dir('have more data!')
							})
						}
					}else{
						this.setToastWarn("系统错误")
					}
				})
			},
			/*获取客户名称*/
			getCusName(){
				this.$api.homeRequest.getCusName( this.filterData.cusName ).then((res)=>{
					if( res.data.code == 200){
						this.popupData.results = res.data.list
						return
					}
					this.setToastWarn("系统错误")
				})
			},
			/*点击用户名称时绑定数据*/
			clickCusName(){
				this.filterData.cusName = item.title
			},
			/*获取options*/
			getOptions(){
				this.optionsData.demandStatus = options.demandStatusList
				this.optionsData.demandType = options.demandTypeList
				this.optionsData.isMajor = options.isMajorList
				this.optionsData.priorityLevel = options.priorityLevelList
				this.optionsData.keyType =  options.keyTypeList
			},
			/*弹出层隐藏触发时间*/
			onHide(){
				this.pullDownRefresh()
				store.commit('setFilterData',this.filterData)
			},
			/*根据状态码获取状态中文*/
			statusDemandType(val){
				return formatter.statusDemandType(val)
			},
			statusPriorityLevel(val){
				return formatter.statusPriorityLevel(val)
			},
			statusIsMajorMod(val){
				return formatter.statusIsMajorMod(val)
			},
			statusComplete(val){
				return formatter.statusComplete(val)
			},
			statusPassTest(val){
				return formatter.statusPassTest(val)
			},
			/*错误时设置提示信息*/
			setToastWarn(tipText){
				this.toastConfig.type = "warn"
				this.toastConfig.text = tipText
				this.toastConfig.show = true
			}
		},
		mounted(){
			this.$nextTick(() => {
				this.$refs.homeScroller.reset()
			})
			let width = window.innerWidth * 0.75
			this.popupWidth = "width : " + width + 'px'
		},
		created(){
			this.getCusName()
			this.getOptions()
			this.getCreateData()
		}
	}
</script>


