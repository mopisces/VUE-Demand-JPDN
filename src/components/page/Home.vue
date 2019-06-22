<template>
	<div style="height:100%">
		<!--滑动层-->
		<view-box>
			<div slot="header">
				<x-header :title="title"  :left-options="{backText:'操作页',preventGoBack:true}" @on-click-back="jumpOperate()">
					<x-icon type="navicon" style="fill: #fff"  @click.native="status.showPopup = true" slot="right"></x-icon>
				</x-header>
				<search v-model="filterData.keyWorld" :auto-fixed="false" style="line-height:12px" @on-submit="search()">
					<popup-picker slot="left" :data="keyType" v-model="filterData.keyType" :show-name="showName=true"></popup-picker>
				</search>
			</div>
			<scroller lock-x use-pulldown use-pullup @on-pulldown-loading="pullDownRefresh()" @on-pullup-loading="pullUpLoad()" ref="homeScroller" height="-150" >
				<div>
					<group v-for="(item,index) in homeList" :key="index" style="background-color:#999;border-style:solid;border-color:#999;" gutter="0">
						<cell is-link :border-intent = "false" :arrow-direction="item.show ?'up':'down'" @click.native="item.show = !item.show"  primary="content">
							<icon type="circle" slot="icon" v-if="item.is_major_mod == 0"></icon>
							<icon type="warn" slot="icon" v-if="item.is_major_mod == 1"></icon>
							<span slot="title" :class="item.demand_status==3?'container':''">
								<span>{{item.demand_id}}</span>
								<badge :text="item.propose_time" ></badge>
								<badge :text="statusDemand(item.demand_status)"></badge>
							</span>
							<span slot="inline-desc" :class="item.demand_status==3?'container':''">
								<badge :text="item.propose_cus"></badge>
								<badge :text="statusDemandType(item.demand_type)" v-if="item.demand_type"></badge>
								<badge :text="statusPriorityLevel(item.priority_level)" v-if="item.priority_level == 2"></badge>
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
			<tabbar slot="bottom" style="position:absolute;">
				<tabbar-item  selected @on-item-click="pushUrl( '/home' )">
					<img slot="icon" src="@/assets/images/home.png">
					<span slot="label">主页</span>
				</tabbar-item>
				<tabbar-item @on-item-click="pushUrl('/common/operate')">
					<img slot="icon" src="@/assets/images/operate.png">
					<span slot="label">操作主页</span>
				</tabbar-item>
				<tabbar-item  @on-item-click="logout()">
					<img slot="icon" src="@/assets/images/user.png">
					<span slot="label">退出</span>
				</tabbar-item>
			</tabbar>
		</view-box>
		<!--弹出层-->
		<popup v-model="status.showPopup" position="right" @on-hide="onHide()" style="height:100%">
			<div :style="popupData.popupWidth">
				<x-header title="筛选条件" :left-options="{showBack:false}" ></x-header>
				<group>
					<search v-model="filterData.cusName" position="absolute"  ref="searchPopup" @on-change="timeOut" :results="popupData.results" @on-result-click="clickCusName" placeholder="客户名称">
					</search>
					<checklist title="需求状态" label-position="left" :options="demandStatus" v-model="filterData.demandStatus" gutter="0"></checklist>
					<checklist title="需求类型" label-position="left" :options="demandType" v-model="filterData.demandType" gutter="0"></checklist>
					<checklist title="优先级" label-position="left" :options="priorityLevelList" v-model="filterData.priorityLevel" gutter="0"></checklist>
				</group>
				<group title="是否重大" gutter="0">
					<radio :options="isMajor" v-model="filterData.isMajor" ></radio>
				</group>
			</div>
		</popup>
		<!--提示信息-->
		<toast v-model="toastConfig.show" :type="toastConfig.type">{{ toastConfig.text }}</toast>
		<loading :show="load.show" text="加载中"></loading>
	</div>
</template>
<script>
	import {ViewBox, XHeader, Scroller, Group, Cell, Icon, Badge, Popup, Search, Checklist, Radio, Toast, PopupPicker, Divider, Loading, Tabbar, TabbarItem } from 'vux'
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
			Divider,
			Loading,
			Tabbar, 
			TabbarItem
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
				toastConfig:{
					show:false,
					type:'',
					text:''
				},
				load:{
					show:false
				}
			}
		},
		methods:{
			/**
			 * [search 设置搜索类型并获取数据]
			 */
			search(){
				this.load.show = true
				if( this.filterData.keyWorld == '' ){
					this.filterData = {
						cusName:'',
						demandStatus:['0','1','2','3'],
						isMajor:'2',
						demandType:['0','1','2','3'],
						priorityLevel:['0','1','2','3'],
						keyWorld:''
					}
				}
				store.commit('setFilterData',this.filterData)
				store.commit('setCurPage',1)
				setTimeout(()=>{
					this.getCreateData()
					this.$nextTick(() => {
						setTimeout(() => {
							this.$refs.homeScroller.donePulldown()
							this.$refs.homeScroller.reset({top:0})
						}, 10)
					})
				})
				
			},
			/**
			 * [jumpOperate 点击返回操作页时触发]
			 */
			jumpOperate(){
				this.$router.push('/common/operate')
			},
			/**
			 * [pullDownRefresh 下拉刷新时触发/修改vuex状态/获取数据]
			 */
			pullDownRefresh(){
				this.load.show = true
				this.filterData.curPage = 1
				store.commit('setFilterData',this.filterData)
				setTimeout(()=>{
					this.getCreateData()
					this.$nextTick(() => {
						setTimeout(() => {
							this.$refs.homeScroller.donePulldown()
							this.$refs.homeScroller.reset({top:0})
						}, 10)
					})
				},3000)
				this.status.onBottom = false
			},
			/**
			 * [pullUpLoad 上拉加载时触发/修改vuex状态/获取数据]
			 */
			pullUpLoad(){
				this.load.show = true
				this.filterData.curPage = ++this.filterData.curPage
				store.commit('setFilterData',this.filterData)
				setTimeout(() => {
					this.getCreateData('pullUp')
					setTimeout(() => {
						 this.$refs.homeScroller.donePullup()
					},10)
				},3000)
			},
			/**
			 * [getCreateData 根据vuex状态中的参数获取对应的数据]
			 * @param  {String} type [刷新/加载]
			 */
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
				this.load.show = false
			},
			/**
			 * [getCusName 动态获取客户名称]
			 */
			timeOut(value){
				if(this.timer){
					clearTimeout(this.timer)
				}
				if(this.filterData.cusName){
					this.timer = setTimeout(()=>{
						this.getCusName()
					},3000)
				}else{
					this.getCusName()
				}
			},
			getCusName(){
				if( !this.filterData.cusName && sessionStorage.getItem('cusNameSearchList') ){
					this.popupData.results = JSON.parse(sessionStorage.getItem('cusNameSearchList'))
					return
				}
				this.$api.homeRequest.getCusName( this.filterData.cusName ).then((res)=>{
					if( res.data.code == 200){
						this.popupData.results = res.data.list
						if(this.filterData.cusName == ''){
							sessionStorage.setItem('cusNameSearchList',JSON.stringify(res.data.list))
						}
						return 
					}
					this.setToastWarn("系统错误")
				})
			},
			/**
			 * [clickCusName 点击搜索框结果时触发]
			 * @param  {[type]} item [点击的item对象]
			 */
			clickCusName(item){
				this.filterData.cusName = item.title
			},
			/**
			 * [onHide 弹出层隐藏时触发/修改vuex中的参数/获取数据]
			 * @return {[type]} [description]
			 */
			onHide(){
				this.load.show = true
				this.pullDownRefresh()
				store.commit('setFilterData',this.filterData)
			},
			/**
			 * [根据状态码获取对应中文名称]
			 * @param  {[string]} val [状态码]
			 */
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
			statusDemand(val){
				return formatter.statusDemand(val)
			},
			/**
			 * [setToastWarn 设置Toast]
			 * @param {[type]} tipText [Toast中的提示信息]
			 */
			setToastWarn(tipText){
				this.toastConfig.type = "warn"
				this.toastConfig.text = tipText
				this.toastConfig.show = true
			},
			pushUrl(url){
				this.$router.push(url)
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
			this.load.show = true
			this.getCusName()
			this.getCreateData()
		},
		computed:{
	  		demandStatus(){
	  			return options.demandStatusList
	  		},
	  		demandType(){
	  			return options.demandTypeList
	  		},
	  		isMajor(){
	  			return options.isMajorList
	  		},
	  		priorityLevelList(){
	  			return options.analystsPriorityLevelList
	  		},
	  		keyType(){
	  			return options.keyTypeList
	  		},
	  	}

	}
</script>
<style scoped>
	.container /deep/ .vux-badge{
		background-color: #08B3CE;
	}
</style>

