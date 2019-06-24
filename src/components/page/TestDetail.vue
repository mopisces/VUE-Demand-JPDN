<template>
	<div>
		<group>
			<cell title="需求提出日期" :value="testDetail.propose_time"></cell>
			<cell title="期望完成日期" :value="testDetail.expect_com_time"></cell>
			<cell title="需求分析人员" :value="testDetail.analysts"></cell>
			<cell title="需求确认日期" :value="testDetail.confirm_time"></cell>
			<cell title="计划完成日期" :value="testDetail.plan_com_time"></cell>
			<cell title="完成日期" :value="testDetail.complete_time"></cell>
			<cell title="修改人员" :value="testDetail.modipersons"></cell>
			<datetime :start-date="form.pass_test_time" v-model="form.pass_test_time" format="YYYY-MM-DD" title="完成时间(默认今天)"></datetime>
			<selector direction="rtl" title="测试状态" :options="testStateList" v-model="form.test_remark"  ></selector>
			<cell title="测试人员" :value="name"></cell>
			<x-button type="primary" @click.native="showConfirm()">提交</x-button>
		</group>
		<confirm v-model="status.showConfirm" :title="confirm.title" @on-confirm="onConfirm">
			<p style="text-align:center;">{{ confirm.text }}</p>
		</confirm>
		<toast v-model="returnMsg.show" :type="returnMsg.type" :time="2000">{{ returnMsg.text }}</toast>
	</div>
</template>
<script>
	import { TransferDom, Group, Cell, XButton, Selector, Datetime, Confirm, Toast } from 'vux'


	import startDate from '@/util/StartDate'
	import options from '@/util/Options'
	import store from '@/store/store'
	export default {
		directives: {
			TransferDom
		},
		components: {
			Group,
			Cell,
			XButton,
			Selector,
			Datetime,
			Confirm,
			Toast 
		},
		data(){
			return {
				testDetail:{},
				form:{
					pass_test_time:startDate.setToday(),
					test_remark:'1'
				},
				status:{
					showConfirm:false
				},
				returnMsg:{
					text:'',
					type:'',
					show:false
				},
				confirm:{
					title:'确认提交',
					text:'确认提交?'
				}
			}
		},
		methods:{
			/**
			 * [setCreateData 创建页面需要的数据填充]
			 */
			setCreateData(){
				if( typeof(store.state.testDetail.jumpDetail.id) != 'string' ){
					this.setToast('非法路由访问')
					this.$router.push('/common/tlist')
					return
				}
				let list = JSON.parse( sessionStorage.getItem( 'testList' ) ) 
				let index = store.state.testDetail.jumpDetail.deleteIndex
				Object.assign(this.testDetail,list[index])
			},
			/**
			 * [onConfirm 弹窗点击确认后触发/提交数据]
			 */
		    onConfirm(){
		    	this.$api.testRequest.saveTest( this.form ).then((res)=>{
		    		if( res.data.code == 200){
		    			let array = JSON.parse( sessionStorage.getItem( 'testList' ) )
		    			array.splice(store.state.testDetail.jumpDetail.deleteIndex,1)
		    			sessionStorage.setItem('testList',JSON.stringify(array))
		    			this.setToast('数据提交成功','success')
		    			store.commit('setTest',{})
		    			setTimeout(()=>{
			              this.$router.push('/common/operate')
			            },2000)
		    		}else{
						this.setToast('数据提交失败')
		    		}
		    	})
		    },
		    /**
		     * [showConfirm 点击提交时触发/提示信息及确认框弹出]
		     * @return {[type]} [description]
		     */
		    showConfirm(){
		    	if(this.testDetail.analysts != store.state.userInfo.client.name){
		    		this.setToast('测试人员和需求分析人员不同')
		    		setTimeout(()=>{
		    			this.status.showConfirm = true
		    			this.confirm.text = '测试人员和需求分析人员不同,确认提交？'
		    		},2500)
		    	}else{
		    		this.status.showConfirm = true
		    	}
		    	
		    	
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
			store.commit('setTitle','测试需求') //修改vuex中标题值
			this.setCreateData()
		},
	  	computed:{
	  		testStateList(){
	  			return options.testStateList
	  		},
	  		name(){
	  			return store.state.userInfo.client.name
	  		}
	  	}
	}
</script>