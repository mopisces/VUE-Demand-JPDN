<template>
	<div>
		<group>
			<cell title="需求编号" :value="form.demand_id"></cell>
			<cell title="客户名称" is-link @click.native="status.showPopup = !status.showPopup" v-model="cusName">
			</cell>
			<popup v-model="status.showPopup">
				<div class="container">
					<x-header :left-options="{preventGoBack:true,showBack:false}">
						<p slot="overwrite-left" @click="status.showPopup = !status.showPopup">取消</p>
						<div slot="overwrite-title">
							<!-- <x-input  placeholder="请输入客户名称" v-model="cusName" :show-clear="false" @on-enter="Onenter"></x-input> -->
							<search :auto-fixed="status.autoFixed" @on-cancel="searchCancel"  v-model="searchName" @on-change="searchChange"></search>
						</div>
						<p slot="right" @click="status.showPopup = !status.showPopup">确认</p>
					</x-header>
				</div>
				<picker :data="results.customerList" v-model="form.customer_id"  ref="cusNamePicker"></picker>
			</popup>
			<!-- <template v-if="!status.staffShow">
				<cell title="客户名称" :value="tableInfo.customerName"></cell>
				<cell title="联系人" :value="tableInfo.customerContact" v-if="tableInfo.customerContact"></cell>
				<cell title="联系电话" :value="tableInfo.contactPhone"  v-if="tableInfo.contactPhone"></cell>
			</template> -->
			<x-textarea title="需求描述" :max="5000" v-model.trim ="form.demand_instru" required :rows="1" autosize ></x-textarea>
			<cell title="需求提出时间" :value="form.propose_time"></cell>
			<datetime v-model="form.expect_com_time" format="YYYY-MM-DD" title="期望完成时间" required :start-date="time.start"></datetime>
			<cell title="分析人员" v-model="setName"></cell>
			<x-button type="primary" @click.native="showConfirm()">提交</x-button>
		</group>
		<confirm v-model="status.confirm" title="提示" @on-confirm="onConfirm()">
			<p style="text-align:center;">确认提交？</p>
		</confirm>
		<toast v-model="returnMsg.show" :type="returnMsg.type">{{ returnMsg.text }}</toast>
	</div>
</template>
<script>
	import {XTextarea, Group, Datetime, Cell, Confirm, XButton, Toast, PopupPicker, Popup, PopupHeader, Picker,  XHeader, XInput, Search   } from 'vux'
  	import store from '@/store/store'
	import startDate from '@/util/StartDate'

  	export default {
	    components: {
			Group,
			XTextarea,
			Datetime,
			Cell,
			Confirm,
			XButton,
			Toast ,
			PopupPicker,
			Popup ,
			PopupHeader ,
			Picker,
			XHeader,
			XInput ,
			Search 
	    },
	    data(){
			return {
				form:{
					demand_id :'',
					demand_instru:'',
					expect_com_time: startDate.setStart(),
					propose_time:startDate.setToday(),
					customer_id:['1']
				},
				cusName:'',
				searchName:'',
				time:{
					start:''
				},
				status:{
					confirm:false,
					showName:true,
					staffShow:false,
					showPopup:false,
					autoFixed:false
				},
				tableInfo:{
					customerName:'',
					customerContact:'',
					contactPhone:''
				},
				returnMsg:{
					text:'',
					show:false,
					type:''
				},
				results:{
					customerList:[[]],
					searchList:[]
				}
			}
	    },
	   
	    methods:{
	    	/**
	    	 * [searchChange 对输入值模糊查询]
	    	 */
	    	searchChange(){
	    		if(this.timer){
					clearTimeout(this.timer)
				}
				if(this.searchName){
					this.timer = setTimeout(()=>{
						this.getCusName()
					},1000)
				}else{
					this.getCusName()
				}
	    	},
	    	/**
	    	 * [searchCancel 搜索框点击取消触发]
	    	 */
	    	searchCancel(){
	    		console.dir('cancel')
	    	},
	    	/**
	    	 * [getCreateData 获取提出需求初始内容]
	    	 */
			getCreateData(){
				this.$api.demandRequest.getDemandID().then((res)=>{
					if( res.data.code == 200 ){
						this.form.demand_id = res.data.list.info
					}else{
						this.setToast('系统错误')
					}
				})
				this.time.start = startDate.setToday()
				if( store.state.userInfo.client.brand == 'customer' ){
					this.tableInfo.customerName = store.state.userInfo.client.name
					this.tableInfo.customerContact = store.state.userInfo.client.contact_person
					this.tableInfo.contactPhone = store.state.userInfo.client.contact_tel_no
				}else{
					this.status.staffShow = true
					this.getCusName()
				}

			},
			/**
			 * [getCusName 获取客户名称并组成Picker所需数据格式]
			 * @return {[array]} [Picker所需数据格式]
			 */
			getCusName(){
				let data = []
				if( this.searchName == ''  &&  sessionStorage.getItem('cusNameSearchList') ){
					data = JSON.parse(sessionStorage.getItem('cusNameSearchList'))
					let pickerList = []
					for (var i = data.length - 1; i >= 0; i--) {
						if( i == 0){
							this.cusName = data[i].title
							this.form.customer_id = [data[i].value]
						}
						pickerList.unshift({value:data[i].value,name:data[i].title})
					}
					this.results.customerList = [ pickerList ]
				}
				if( this.searchName != '' ){
					this.$api.homeRequest.getCusName( this.searchName ).then((res)=>{
						if(res.data.code == 200){
							let pickerList = []
							for (var i = res.data.list.length - 1; i >= 0; i--) {
								if( i == 0){
									this.cusName = res.data.list[i].title
									this.form.customer_id = [res.data.list[i].value]
								}
								pickerList.unshift({value:res.data.list[i].value,name:res.data.list[i].title})
							}
							this.results.customerList = [ pickerList ]
						}
					})
				}
				
			},
			/**
			 * [onConfirm 提交数据]
			 */
			onConfirm () {
				this.confirm = false
				let self = this
				this.$api.demandRequest.saveDemand(this.form).then((res)=>{
					if(res.data.code === 200){
						this.setToast('提交成功','success')
						setTimeout(()=>{
							self.$router.push('/common/operate')
						},2000)
					}else{
						this.setToast('提交失败')
					}
				})
			},
			/**
			 * [showConfirm 确认提交提示框之前检查数据完整性]
			 */
			showConfirm () {
				if(this.form.demand_instru.trim() == ''){
					this.setToast('请输入需求内容')
					return
				}
				if(this.form.expect_com_time == ''){
					this.setToast('请选择期望日期')
					return
				}
				this.status.confirm = true
			},
			/**
		     * [setToast 设置弹出的Toast]
		     * @param {[string]} text [Toast提示信息]
		     * @param {String} type [Toast类型]
		     */
			setToast( text, type='warn' ){
				this.returnMsg.type = type
				this.returnMsg.text = text
				this.returnMsg.show = true
			}
		},
		created(){
	    	store.commit('setTitle','提出需求') //修改vuex中标题值
			this.getCreateData()
	    },
		/**
		 * [computed 获取vuex中用户的姓名]
		 */
		computed:{
			setName(){
				return store.state.userInfo.client.name
			}
		},
		watch:{
			/**
			 * 监听form中customer_id值变化
			 */
			'form.customer_id':{
				handler:function(newV,oldV){
					setTimeout(() => {
						this.cusName = this.$refs.cusNamePicker.getNameValues()
					},10)
				},
				deep:true
			}
		}
		
	}
</script>

<style scoped>
	.container /deep/ .vux-header{
		background-color: #fff;
	}
	.container /deep/ .vux-header-left{
		color:#000;
	}
	.container /deep/ .vux-header-right{
		color:#000;
	}
</style>