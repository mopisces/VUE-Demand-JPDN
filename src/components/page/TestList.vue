<template>
	<div>
		<group>
			<cell title="待测试总记录数：">
				<countup :start-val="1" :end-val="totalRecord" :duration="2" class="count-num" slot="after-title"></countup>
			</cell>
		</group>
		<scroller lock-x use-pulldown @on-pulldown-loading="pullDownRefresh()" ref="testScroller" height="-160">
			<div>
				<group v-for="(item,index) in testList" :key="index" gutter="0">
					<cell is-link :border-intent = "false" @click.native="jumpUrl(item.id,index)">
	                  	<icon type="circle" slot="icon" v-if="item.is_major_mod == 0"></icon>
						<icon type="warn" slot="icon" v-if="item.is_major_mod == 1"></icon>
	                  	<span slot="title">
							<span style="vertical-align:middle;">{{ item.demand_id }}</span>
							<badge text="待测试"></badge>
							<badge :text="statusDemandType(item.demand_type)"></badge>
							<badge :text="statusPriorityLevel(item.priority_level)"></badge>
							<badge :text="statusComplete(item.complete_state)"></badge>
						</span>
	          		</cell>
	          		<div>
	                    <span slot="inline-desc">
	                    	<badge :text="item.propose_cus " v-if="item.propose_cus"></badge>
	                    	<badge text="内部提出" v-if="!item.propose_cus"></badge>
	              			<badge :text="item.propose_time"></badge>
	              			<badge :text="item.contact_person" v-if="item.contact_person"></badge>
	              			<badge :text="item.contact_tel_no_1" v-if="item.contact_tel_no_1"></badge>
	                    </span>
	                    <cell title="需求说明" :value="item.demand_instru" slot="child" value-align="left" ></cell>
	                    <cell title="修改说明" :value="item.mod_instru" slot="child" value-align="left" ></cell>
	          		</div>
				</group>
				<divider>我也是有底线的...</divider>
				<divider></divider>
				<toast v-model="status.showToast" @on-hide="hideToast()" :time="2000" type="warn">服务器错误</toast>
			</div>
		</scroller>
	</div>
</template>
<script>
	import { Divider, Group, Cell, Selector, Confirm, Toast, Countup, Scroller, Badge, Icon} from 'vux'
	import formatter from '@/util/formatter'
	import store from '@/store/store'

	export default {
		components: {
			Divider,
			Group,
			Cell,
			Selector,
			Confirm,
			Toast ,
			Countup,
			Scroller,
			Badge,
			Icon
		},
		data(){
			return {
				testList:[],
				totalRecord:0,
				status:{
					showToast:false
				}
			}
		},
		methods:{
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
		    jumpUrl(id,index){
		    	store.commit('setTest',{id:id,deleteIndex:index})
		    	this.$router.push('/common/tdetail')
		    },
		    getCreateData(){
				this.$api.testRequest.testList().then((res)=>{
					if( res.data.code == 200){
						this.testList = res.data.list.list
						this.totalRecord = parseInt( res.data.list.totalRecord )
						sessionStorage.setItem('testList',JSON.stringify(this.testList))
					}else{
						this.status.showToast = true
					}
				})
		    },
		    hideToast(){
				this.$router.push('/common/operate')
			},
			pullDownRefresh(){
    			this.getCreateData(true)
    			this.$nextTick(() => {
    				setTimeout(() => {
    					this.$refs.testScroller.donePulldown()
    				},1000)
    			})
			}
		},
		created(){
			store.commit('setTitle','测试列表')
			this.getCreateData()
		},
		mounted(){
			this.$nextTick(()=>{
				this.$refs.testScroller.reset({top:0})
			})
		}
	}
</script>
<style scoped>
	.count-num {
		font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif;
		font-size: 1 em;
		color: #e60909;
	}
</style>