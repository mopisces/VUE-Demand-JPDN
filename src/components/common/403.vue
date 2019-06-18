<template>
	<div class="error-page">
		<div class="error-code">4<span>0</span>3</div>
		<div class="error-desc">啊哦~ 你没有权限访问该页面哦</div>
		<div class="error-handle">
			<x-button class="error-btn" type="primary" size="large" @click.native="gaBack()">返回</x-button>
		</div>
	</div>
</template>

<script>
import { TransferDom, XButton  } from 'vux'
export default {
	directives: {
	    TransferDom
	},
	components: {
	    XButton
	},
	methods: {
        gaBack(){
            this.$router.back(-1)
        }
	}
}
</script>


<style scoped>
    .error-page{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 100%;
        height: 100%;
        background: #f3f3f3;
        box-sizing: border-box;
    }
    .error-code{
        line-height: 1;
        font-size: 250px;
        font-weight: bolder;
        color: #f02d2d;
    }
    .error-code span{
        color: #00a854;
    }
    .error-desc{
        font-size: 30px;
        color: #777;
    }
    .error-handle{
        margin-top: 30px;
        padding-bottom: 200px;
    }
    .error-btn{
        margin:0 auto;
    }
</style>
