<template>
	<div>
		<group>
			<cell title="待分析总记录数：">
				<countup :start-val="0" :end-val="totalRecord" :duration="1" class="count-num" slot="after-title"></countup>
			</cell>
		</group>
		<scroller lock-x scrollbar-y use-pulldown @on-pulldown-loading="pullDownRefresh()" ref="AScroller" height="-160">
			<div>
				<group v-for="(item,index) in analystsList" :key="index"  gutter="0">
					<cell is-link :border-intent = "false" @click.native="jumpUrl(item.id,index)" primary="content">
						<span slot="title">
							<span style="vertical-align:middle;">{{ item.demand_id }}</span>
							<badge text="待分析"></badge>
						</span>
					</cell>
					<div>
						<span slot="inline-desc">
							<badge :text="item.propose_cus" v-if="item.propose_cus"></badge>
							<badge :text="item.contact_person" v-if="item.contact_person"></badge>
							<badge text="内部需求" v-if="!item.propose_cus"></badge>
							<badge :text="item.propose_time"></badge>
						</span slot="child">
						<cell title="需求说明" :value="item.demand_instru" value-align="left"></cell>
					</div>
				</group>
				<divider>我也是有底线的...</divider>
				<divider></divider>
			</div>
		</scroller>
		<toast v-model="status.showToast" @on-hide="hideToast()" :time="2000" type="warn">服务器错误</toast>
	</div>
</template>
<script>
	import { XHeader, Group, Cell, Divider, Checker, CheckerItem,Countup, Toast, Scroller, Badge} from 'vux'
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
			Badge
		},
		data(){
			return {
				analystsList: [],
				status:{
					showToast:false
				},
				totalRecord:0,
			}
		},
		methods:{
			/*跳转至具体页面*/
			jumpUrl (id , index) {
				store.commit('setAnalysts',{id:id,deleteIndex:index})
				this.$router.push('/common/adetail')
			},
			/*获取列表*/
			getCreateData(){
				this.$api.analystsRequest.analystsList().then((res)=>{
					if( res.data.code == 200){
						this.analystsList = res.data.list.list
						this.totalRecord = parseInt( res.data.list.totalRecord )
						sessionStorage.setItem('analystsList',JSON.stringify(this.analystsList))
					}else{
						this.status.showToast = true
					}
				})
			},
			/*数据获取失败后跳转*/
			hideToast(){
				this.$router.push('/common/operate')
			},
			/*下拉刷新数据*/
			pullDownRefresh(){
				this.getCreateData()
				this.$nextTick(() => {
					setTimeout(() => {
						this.$refs.AScroller.donePulldown()
					},1000)
				})
    		}
		},
		created(){
			//生产环境时开启
			store.commit('setTitle','分析列表')
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