<template>
	<div>
		<group>
			<cell title="待修改总记录数：">
				<countup :start-val="1" :end-val="totalRecord" :duration="2" class="count-num" slot="after-title"></countup>
			</cell>
		</group>
		<scroller lock-x scrollbar-y use-pulldown @on-pulldown-loading="pullDownRefresh()" ref="modScroller" height="-160">
			<div>
				<group v-for="(item,index) in modList" :key="index" gutter="0"  style="background-color:#999;border-style:solid;border-color:#999;">
					<cell is-link :border-intent = "false" @click.native="jumpUrl(item.id,index)" primary="content" >
                      	<icon type="circle" slot="icon" v-if="item.is_major_mod == 0"></icon>
						<icon type="warn" slot="icon" v-if="item.is_major_mod == 1"></icon>
                      	<span slot="title">
							<span style="vertical-align:middle;">{{ item.demand_id }}</span>
							<badge :text="item.propose_time"></badge>
							<badge text="待修改"></badge>
						</span>
						<span slot="inline-desc">
							<badge :text="item.propose_cus" v-if="item.propose_cus"></badge>
							<badge :text="statusDemandType(item.demand_type)"></badge>
							<badge :text="statusPriorityLevel(item.priority_level)" v-if="item.priority_level == 2"></badge>
          				</span>
              		</cell>
          			
          			<cell title="需求说明" :value="item.demand_instru" value-align="left" ></cell>
				</group>
				<divider>我也是有底线的...</divider>
				<divider></divider>
			</div>
		</scroller>
		<toast v-model="status.showToast" @on-hide="hideToast()" :time="2000" type="warn">服务器错误</toast>
		<loading :show="load.show" :text="load.text"></loading>
	</div>
</template>
<script>
	import {Divider, Group, Cell, Checker, CheckerItem, Countup, Toast, Scroller, Badge, Icon, Loading } from 'vux'

	import formatter from '@/util/formatter' 
	import store from '@/store/store'

	export default {
		components: {
			Divider,
			Group,
			Cell,
			Checker,
			CheckerItem,
			Countup,
			Toast,
			Scroller ,
			Badge,
			Icon,
			Loading
		},
		data(){
			return {
				totalRecord:0,
				modList:[],
				status:{
					showToast:false
				},
				load:{
					show:false,
					text:'加载中'
				}
			}
		},
		methods:{
			/**
			 * [根据状态码获取对应中文名称]
			 * @param  {[string]} val [状态码]
			 */
			statusDemandType(val){
				return formatter.statusDemandType(val)
			},
			/**
			 * [statusPriorityLevel 获取优先级状态码对应中文]
			 * @param  {[string]} val [优先级状态码]
			 * @return {[string]}     [对应中文]
			 */
			statusPriorityLevel(val){
				return formatter.statusPriorityLevel(val)
			},
			/**
			 * [statusIsMajorMod 获取重大状态码对应中文]
			 * @param  {[string]} val [重大状态码]
			 * @return {[string]}     [对应中文]
			 */
			statusIsMajorMod(val){
				return formatter.statusIsMajorMod(val)
			},
			/**
			 * [jumpUrl 跳转至具体页面]
			 * @param  {[number]} id    [点击对应需求的ID]
			 * @param  {[number]} index [点击对应需求在数组中的索引值]
			 */
			jumpUrl(id,index){
				store.commit('setMod',{id:id,deleteIndex:index})
				this.$router.push('/common/mdetail')
			},
			/**
			 * [getCreateData 获取待修改列表]
			 */
			getCreateData(){
				this.$api.modRequest.modList().then((res)=>{
					if( res.data.code == 200){
						this.modList = res.data.list.list
						this.totalRecord = parseInt(res.data.list.totalRecord)
						sessionStorage.setItem('modList',JSON.stringify( this.modList ))
					}else{
						this.status.showToast = true
					}
				})
				this.load.show = false
			},
			/**
			 * [hideToast 数据获取失败后跳转]
			 */
			hideToast(){
				this.$router.push('/common/operate')
			},
			/**
			 * [pullDownRefresh 下拉刷新数据]
			 */
			pullDownRefresh(){
				this.load.show = true
				setTimeout(()=>{
					this.getCreateData()
					this.$nextTick(() => {
						setTimeout(() => {
							this.$refs.modScroller.donePulldown()
						}, 10)
					})
				},1000)
			}
		},
		created(){
			this.load.show = true
			store.commit('setTitle','修改列表') //修改vuex中标题值
			this.getCreateData()
		},
		mounted(){
			this.$nextTick( () => {
				this.$refs.modScroller.reset({top: 0})
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