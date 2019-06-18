<template>
	<div class="error-page">
		<div class="error-code">4<span>0</span>4</div>
		<div class="error-desc">啊哦~ 你所访问的页面不存在</div>
		<div class="error-handle">
			<x-button class="error-btn" type="primary" size="large" @click.native="goBack()">去登陆</x-button>
		</div>
		<p>hello world</p>
	</div>
</template>

<script>
import { XButton  } from 'vux'

export default {
	components: {
		XButton
	},
	methods: {
		goBack(){
			this.$router.push('/login')
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
        margin:0 auto;
    }
    .error-code{
        line-height: 1;
        font-size: 250px;
        font-weight: bolder;
        color: #2d8cf0;
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
        margin: 0 auto ;
    }
</style>
