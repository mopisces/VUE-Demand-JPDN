<template>
    <div>
        <x-header :left-options="{showBack: false}" title="后台管理系统"></x-header>
        <group title="客户入口">
            <x-input title="用户名" v-model.trim="form.customerName" required></x-input>
            <x-input title="密码" v-model.trim="form.phoneNum" required></x-input>
        </group>
        <x-button type="primary" action-type="button" @click.native="showToast()" :gradients="['#1D62F0', '#19D5FD']" text="登录" :disabled="disabledButton"></x-button>
        <toast v-model="showStatus" type="warn">{{ toastText }}</toast>
    </div>
</template>
<script>
	import { XHeader, TransferDom, XButton,XInput, Group, Toast  } from 'vux'
    import store from '@/store/store'
    export default {
        directives: {
            TransferDom
        },
        components: {
            XHeader,
            XInput,
            Group,
            Toast,
            XButton
        },
        data(){
            return {
               form:{
                    customerName:'JYYS',
                    phoneNum:'13958422276'
               },
               showStatus:false,
               toastText:'',
               disabledButton:false
            }
        },
        methods: {
            showToast(){
                if( this.form.customerName === '' ){
                    this.toastText = '用户名不能为空'
                    this.showStatus = true
                    return false
                }
                else if( this.form.phoneNum === '' ){
                    this.toastText = '密码不能为空'
                    this.showStatus = true
                    return false
                }else{
                    let self = this
                    this.$api.homeRequest.customerToken(this.form).then((res)=>{
                        if( res.data.code == 200 ){
                            store.commit('userLogin',res.data.list)
                            store.commit('setLoginStatus',1)
                            if ( store.state.navList == '' && store.state.userInfo.client.role !== '' ){
                                store.dispatch('permission', store.state.userInfo.client.role)
                                this.$router.addRoutes(store.state.navList)
                            }
                            self.$router.push('/common/operate')
                        }
                    })
                }
            }
        },
        created(){
        }
    }
</script>
