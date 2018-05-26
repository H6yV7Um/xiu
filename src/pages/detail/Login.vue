<template>
	<div id="login">
		<mt-header title="">
			<mt-button icon="back" slot="left" @click="toBack"></mt-button>
		</mt-header>
		<div>
			<div class="logo">
				<img src="./assets/touxiang.png" alt="">
				<!--<p>用户登录</p>-->
			</div>
			<div class="form">
				<div class="row form-border">
					<div class="icon">
						<img src="./assets/icon_phone.png" alt="">
					</div>
					<div class="input">
						<mt-field label="" placeholder="手机号" type="tel" v-model="phone"></mt-field>
					</div>
				</div>
				<div class="row form-border">
					<div class="icon">
						<img src="./assets/icon_pwd2.png" alt="">
					</div>
					<div class="input">
						<mt-field label="" placeholder="验证码" v-model="verificationCode">
							<mt-button type="default" size="small" :disabled="disabled" @click="sendCode">{{ text }}</mt-button>
						</mt-field>
					</div>
				</div>
				<div class="btn">
					<mt-button type="danger" size="large" @click="doLogin">登 录</mt-button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Vue from 'vue'
import { Toast, Indicator, MessageBox, Field, Button, Header } from 'mint-ui'
import $ from 'jquery'
import Common from '@/modules/common'

Vue.component(Header.name, Header)
Vue.component(Button.name, Button)
Vue.component(Field.name, Field)
export default {
	name: 'login',
	data () {
		return {
			phone: '',
			verificationCode: '',
			num: 60,
			text: '发送验证码',
			disabled: false
		}
	},
	methods: {
		toBack () {
			this.$emit('close')
		},
		sendCode () {
			const reg = /^(0|86|17951)?(13[0-9]|15[0-9]|17[0-9]|18[0-9]|14[0-9])[0-9]{8}$/
			if (!reg.test(this.phone)) {
				MessageBox('提示', '手机号格式不正确')
				return
			}
			// 发送验证码
			let paras = `mobile_tel=${this.phone}`
			paras = Common.setQueryString(paras)
			const url = process.env.API_URL18088 + '/smsController.do?single_sms_send_uncheck_mobile&' + paras
			Indicator.open()
			let vm = this
			$.ajax({
				url: url,
				type: 'get',
				dataType: 'jsonp',
				jsonp: 'jsoncallback',
				date: {},
				success: function (data) {
					if (data.success_type !== '1') {
						MessageBox('提示', data.msg)
					} else {
						Toast('验证码发送成功')
						vm.disabled = true
						const t = setInterval(() => {
							if (vm.num === 0) {
								vm.disabled = false
								vm.text = '发送验证码'
								clearInterval(t)
							} else {
								vm.text = `(${vm.num--}) s 后发送`
							}
						}, 1000)
					}
				},
				error: function () {
					MessageBox('提示', '请求出错')
				},
				complete: function () {
					Indicator.close()
				}
			})
		},
		doLogin () {
			let vm = this
			if (!this.verificationCode) {
				MessageBox('提示', '请填写验证码')
			} else {
				// window.location.href = 'index.html'
				let paras = `mobile_tel=${this.phone}&verificationCode=${this.verificationCode}`
				paras = Common.setQueryString(paras)
				const url = process.env.API_URL18088 + '/loginController.do?verification_code_login_check&' + paras
				Indicator.open()
				let mobileTel = this.phone
				$.ajax({
					url: url,
					type: 'get',
					dataType: 'jsonp',
					jsonp: 'jsoncallback',
					date: {},
					success: function (data) {
						if (data.success_type === '1') {
							localStorage.setItem('$token', data.token)
							localStorage.setItem('$mobile_tel', mobileTel)
							vm.$emit('close')
						} else {
							MessageBox('提示', data.msg)
						}
						Indicator.close()
					}
				})
			}
		}
	}
}
</script>

<style>
.mint-indicator-wrapper{
	z-index: 999999999 !important;
}
.mint-toast{
	z-index: 999999999 !important;
}
#login {
	width: 100%;
	height: 100%;
}
#app .mint-popup-right{
	width: 100%;
	height: 100%;
}
#login .mint-cell:last-child,#login .mint-cell-wrapper{
	background-image: none;
	padding-left: 10px;
	padding-right: 1px;
}

#login .mint-cell-wrapper{
	font-size: 15px;
}
#login .mint-header{
	background-color: #fff;
	color: #000;
}
#login .logo{
	/*padding: 30px 0 15px 0;*/
	text-align: center;
	border-bottom: 1px solid #ddd;
	/*margin-bottom: 10px;*/
	font-size: 15px;
}
#login .logo img{
	width: 90px;
	margin-bottom: 30px;
}
#login .btn{
	padding: 10px;
}
#login .form .row{
	overflow: hidden;
	margin-left: 10px;
	margin-right: 10px;
}
#login .form .row .icon{
	float: left;
	height: 48px;
	line-height: 48px;
}
#login .form .row .icon img{
	width: 20px;
	vertical-align: middle;
}
#login .form-border{
	border-bottom: 1px solid #e5e5e5;
}
</style>
