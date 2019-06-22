<template>
	<div>
		<scroller lock-x ref="viewScroller" height="-100">
			<div>
				<group  v-for="(item,index) in viewList" :key="index" style="border-style:solid;border-color:#999;" gutter="0">
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
								<badge :text="statusPriorityLevel(item.priority_level)" v-if="item.priority_level == 1"></badge>
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
				</group>
			</div>
		</scroller>
		<loading :show="load.show" :text="load.text"></loading>
	</div>
</template>
<script>
	import {Scroller, Loading, Group, Cell, Badge, Divider, Icon} from 'vux'
	import store from '@/store/store'
	import formatter from '@/util/formatter'
	export default {
		components:{
			Scroller,
			Loading,
			Group,
			Cell,
			Badge,
			Divider,
			Icon
		},
		data(){
			return {
				load:{
					show:false,
					text:'加载中'
				},
				viewList:[],
				status:{
					onBottom: false
				}
			}
		},
		methods:{
			getCreateData(){
				this.$api.echartRequest.echartDetail().then((res)=>{
					if( res.data.code == 200 ){
						this.viewList = res.data.list
					}
				})
				this.load.show = false
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
			}
		},
		created(){
			this.load.show = true
			store.commit('setTitle','详细信息')
			this.getCreateData()
		},
		mounted(){

		}
	}
</script>