<template>
	<div style="height:100%;width:100%;">
		<view-box :body-padding-top="bodyPaddingTop" :body-padding-bottom="bodyPaddingBottom">
			<x-header :title="title" slot="header" style="width:100%;position:absolute;" ref="header"></x-header>
			<router-view></router-view>
			<tabbar slot="bottom" style="position:absolute;" ref="bar">
				<tabbar-item  @on-item-click="pushUrl( '/home' )">
					<img slot="icon" src="@/assets/images/home.png">
					<span slot="label">主页</span>
				</tabbar-item>
				<tabbar-item selected @on-item-click="pushUrl('/common/operate')">
					<img slot="icon" src="@/assets/images/operate.png">
					<span slot="label">操作主页</span>
				</tabbar-item>
				<tabbar-item  @on-item-click="logout()">
					<img slot="icon" src="@/assets/images/user.png">
					<span slot="label">退出</span>
				</tabbar-item>
			</tabbar>
		</view-box>
	</div>
</template>
<script>
	import { ViewBox, XHeader, Tabbar, TabbarItem} from 'vux'
	import store from '@/store/store'
	export default {
		components: {
			ViewBox,
			XHeader,
			Tabbar,
			TabbarItem
		},
		data(){
			return {
				bodyPaddingTop:'',
				bodyPaddingBottom:'',
				title:''
			}
		},
		methods:{
			pushUrl( url ){
				this.$router.push( url )
			},
			logout(){
				if( store.state.userInfo.client.brand == 'customer' ){
					this.$router.push( '/customer' )
				}else{
					this.$router.push( '/login' )
				}
				store.commit('userLogin',[])
				store.commit('setLoginStatus',null)
			}
		},
		mounted(){
			this.bodyPaddingTop = this.$refs.header.$el.clientHeight  + 'px'  
			this.bodyPaddingBottom = this.$refs.bar.$el.clientHeight  + 'px' 
		},
		created(){
			this.title = store.state.title
		},
		computed:{
			setTitle() {
				return store.state.title
			}
		},
		watch:{
			setTitle(newVal){
				this.title = newVal
			}
		}
	}
</script>