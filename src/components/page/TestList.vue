<template>
	<div>
		<group>
			<button-tab>
				<button-tab-item selected @on-item-click="onItemClick">个人待测试</button-tab-item>
				<button-tab-item @on-item-click="onItemClick">其他待测试</button-tab-item>
			</button-tab>
			<cell title="待测试总记录数：">
				<countup :start-val="1" :end-val="totalRecord" :duration="2" class="count-num" slot="after-title"></countup>
			</cell>
		</group>
		<scroller lock-x use-pulldown @on-pulldown-loading="pullDownRefresh()" ref="testScroller" height="-200">
			<div>
				<group v-for="(item,index) in testList" :key="index" gutter="0"  style="background-color:#999;border-style:solid;border-color:#999;">
					<cell is-link :border-intent = "false" @click.native="jumpUrl(item.id,index)">
	                  	<icon type="circle" slot="icon" v-if="item.is_major_mod == 0"></icon>
						<icon type="warn" slot="icon" v-if="item.is_major_mod == 1"></icon>
	                  	<span slot="title">
							<span style="vertical-align:middle;">{{ item.demand_id }}</span>
							<badge :text="item.propose_time"></badge>
							<badge text="待测试"></badge>
							<badge :text="statusDemandType(item.demand_type)"></badge>
							<badge :text="statusPriorityLevel(item.priority_level)" v-if=" item.priority_level==1 "></badge>
						</span>
						<span slot="inline-desc">
                    		<badge :text="item.propose_cus " v-if="item.propose_cus"></badge>
                    		<badge text="内部提出" v-if="!item.propose_cus"></badge>
                    	</span>
	          		</cell>
                    <cell title="需求说明" :value="item.demand_instru" value-align="left" ></cell>
                	<cell title="修改说明" :value="item.mod_instru"  value-align="left" ></cell>
				</group>
				<divider>我也是有底线的...</divider>
				<divider></divider>
				<toast v-model="status.showToast" @on-hide="hideToast()" :time="2000" type="warn">服务器错误</toast>
				<loading :show="load.show" :text="load.text"></loading>
			</div>
		</scroller>
	</div>
</template>
<script>
	import { Divider, Group, Cell, Selector, Confirm, Toast, Countup, Scroller, Badge, Icon, ButtonTab, ButtonTabItem, Loading} from 'vux'
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
			Icon,
			ButtonTab,
			ButtonTabItem,
			Loading
		},
		data(){
			return {
				testList:[],
				totalRecord:0,
				status:{
					showToast:false
				},
				load:{
					show:false,
					text:'加载中'
				},
				demandBelong:'0'
			}
		},
		methods:{
			/**
			 * [onItemClick botton-tab点击后触发]
			 * @param  {[number]} index [button-tab-item的索引]
			 */
			onItemClick(index){
				this.demandBelong = index
				this.pullDownRefresh()
			},
			/**
			 * [获取状态对应中文]
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
		    /**
		     * [jumpUrl 跳转到详细页]
		     * @param  {[number]} id    [对应需求的ID]
		     * @param  {[number]} index [对应需求的索引]
		     */
		    jumpUrl(id,index){
		    	store.commit('setTest',{id:id,deleteIndex:index})
		    	this.$router.push('/common/tdetail')
		    },
		    /**
		     * [getCreateData 获取测试需求列表数据]
		     * @param  {String} type [测试需求对应自己or其他]
		     */
		    getCreateData(){
				this.$api.testRequest.testList( this.demandBelong ).then((res)=>{
					if( res.data.code == 200){
						this.testList = res.data.list.list
						this.totalRecord = parseInt( res.data.list.totalRecord )
						sessionStorage.setItem('testList',JSON.stringify(this.testList))
					}else{
						this.status.showToast = true
					}
				})
				this.load.show = false
		    },
		    /**
		     * [hideToast 弹窗提示关闭时跳转的路由]
		     */
		    hideToast(){
				this.$router.push('/common/operate')
			},
			/**
			 * [pullDownRefresh 下拉刷新是触发/重新获取数据]
			 */
			pullDownRefresh(){
				this.load.show = true
				setTimeout(()=>{
					this.getCreateData()
					this.$nextTick(() => {
						setTimeout(() => {
							this.$refs.testScroller.donePulldown()
						}, 10)
					})
				},2000)
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