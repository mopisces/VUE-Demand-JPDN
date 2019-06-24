<template>
	<div>
		<group>
			<cell title="待分析总记录数：">
				<countup :start-val="0" :end-val="totalRecord" :duration="1" class="count-num" slot="after-title"></countup>
			</cell>
		</group>
		<scroller lock-x scrollbar-y use-pulldown @on-pulldown-loading="pullDownRefresh()" ref="AScroller" height="-160">
			<div>
				<group v-for="(item,index) in analystsList" :key="index"  gutter="0"  style="background-color:#999;border-style:solid;border-color:#999;">
					<cell is-link :border-intent = "false" @click.native="jumpUrl(item.id,index)" primary="content">
						<span slot="title">
							<span style="vertical-align:middle;">{{ item.demand_id }}</span>
							<badge :text="item.propose_time"></badge>
							<badge text="待分析"></badge>
						</span>
						<span slot="inline-desc">
							<badge :text="item.propose_cus"></badge>
							<!-- <badge :text="item.propose_cus" v-if="item.propose_cus"></badge> -->
							<!-- <badge text="内部需求" v-if="!item.propose_cus"></badge> -->
						</span >
					</cell>
					<cell title="需求说明" :value="item.demand_instru" value-align="left"></cell>
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
	import { XHeader, Group, Cell, Divider, Checker, CheckerItem,Countup, Toast, Scroller, Badge, Loading} from 'vux'
  	import store from '@/store/store'

  	export default {
		components: {
			XHeader,
			Group,
			Cell,
			Divider,
			Checker,
			CheckerItem ,
			Countup,
			Toast,
			Scroller,
			Badge,
			Loading,
		},
		data(){
			return {
				analystsList: [],
				status:{
					showToast:false
				},
				totalRecord:0,
				load:{
					show:false,
					text:'加载中'
				}
			}
		},
		methods:{
			/**
			 * [jumpUrl 跳转至具体页面]
			 * @param  {[number]} id    [点击对应需求的ID]
			 * @param  {[number]} index [点击对应需求在数组中的索引值]
			 */
			jumpUrl (id , index) {
				store.commit('setAnalysts', {id:id,deleteIndex:index} )
				this.$router.push('/common/adetail')
			},
			/**
			 * [getCreateData 获取待分析列表]
			 */
			getCreateData(){
				this.$api.analystsRequest.analystsList().then((res)=>{
					if( res.data.code == 200){
						this.analystsList = res.data.list.list
						console.dir(res.data.list.list[0].propose_cus)
						this.totalRecord = parseInt( res.data.list.totalRecord )
						sessionStorage.setItem('analystsList',JSON.stringify(this.analystsList))
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
							this.$refs.AScroller.donePulldown()
						}, 10)
					})
				},1000)
    		}
		},
		created(){
			this.load.show = true
			store.commit('setTitle','分析列表') //修改vuex中标题值
			this.getCreateData()
		},
		mounted(){
			this.$nextTick( () => {
				this.$refs.AScroller.reset({top: 0})
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