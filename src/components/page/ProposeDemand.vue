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
							<x-input  placeholder="请输入客户名称" v-model="cusName" :show-clear="false" @on-enter="Onenter"></x-input>
						</div>
						<p slot="right" @click="status.showPopup = !status.showPopup">确认</p>
					</x-header>
				</div>
				<picker :data="customerList" v-model="form.customer_id"  ref="cusNamePicker"></picker>
			</popup>
			<template v-if="!status.staffShow">
				<cell title="客户名称" :value="tableInfo.customerName"></cell>
				<cell title="联系人" :value="tableInfo.customerContact" v-if="tableInfo.customerContact"></cell>
				<cell title="联系电话" :value="tableInfo.contactPhone"  v-if="tableInfo.contactPhone"></cell>
			</template>
			<x-textarea title="需求描述" :max="5000" v-model.trim ="form.demand_instru" required :rows="1" autosize ></x-textarea>
			<cell title="需求提出时间" :value="form.propose_time"></cell>
			<datetime v-model="form.expect_com_time" format="YYYY-MM-DD" title="期望完成时间" required></datetime>
			<x-button type="primary" @click.native="showConfirm()">提交</x-button>
		</group>
		<confirm v-model="status.confirm" title="提示" @on-confirm="onConfirm()">
			<p style="text-align:center;">确认提交？</p>
		</confirm>
		<toast v-model="returnMsg.show" :type="returnMsg.type">{{ returnMsg.text }}</toast>
	</div>
</template>
<script>
	import {XTextarea, Group, Datetime, Cell, Confirm, XButton, Toast, PopupPicker, Popup, PopupHeader, Picker,  XHeader, XInput  } from 'vux'
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
	    },
	    data(){
			return {
				form:{
					demand_id :'',
					demand_instru:'',
					expect_com_time:'',
					propose_time:'',
					customer_id:['1']
				},
				cusName:'shang',
				time:{
					start:'',
					end:''
				},
				status:{
					confirm:false,
					showName:true,
					staffShow:false,
					showPopup:false
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
				customerList:[[]],
			}
	    },
	    created(){
	    	store.commit('setTitle','提出需求')
			this.getCreateData()
	    },
	    methods:{
	    	onChange(value){
	    		this.form.customer_id = value
	    		this.cusName = this.$refs.cusNamePicker.getNameValues()
	    	},
	    	Onenter(value){
	    		for (var i = this.customerList[0].length - 1; i >= 0; i--) {
	    			if( this.customerList[0][i].name == value ){
	    				this.$nextTick(() => {
	    					this.form.customer_id = [this.customerList[0][i].value]
	    				})
	    				return
	    			}
	    		}

	    	},
	    	/*获取表格内容*/
			getCreateData(){
				this.$api.demandRequest.getDemandID().then((res)=>{
					if( res.data.code == 200 ){
						this.form.demand_id = res.data.list.info
					}else{
						this.setToast('系统错误')
					}
				})
				this.form.propose_time = startDate.setToday()
				this.time.start = startDate.setStart()
				if( store.state.userInfo.client.brand == 'customer' ){
					this.tableInfo.customerName = store.state.userInfo.client.name
					this.tableInfo.customerContact = store.state.userInfo.client.contact_person
					this.tableInfo.contactPhone = store.state.userInfo.client.contact_tel_no
				}else{
					this.status.staffShow = true
					if( store.state.customerList.length != 0 ){
						this.customerList = store.state.customerList
						this.cusName = this.customerList[0][0].name
						return 
					}else{
						this.$api.demandRequest.getCustomerList().then((res)=>{
							if(res.data.code == 200){
								this.customerList = res.data.list
								this.cusName = this.customerList[0][0].name
								store.commit('setCustomerList',res.data.list)
							}
						})
					}
				}

			},
			/*提交数据*/
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
			/*确认提交提示框之前检查数据完整性*/
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
			setToast( text, type='warn' ){
				this.returnMsg.type = type
				this.returnMsg.text = text
				this.returnMsg.show = true
			}
		},
		watch:{
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