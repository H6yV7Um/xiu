<template>
	<div id="app">
		<mt-header title="个人中心">
			<mt-button icon="back" slot="left" @click="toBack"></mt-button>
		</mt-header>
		<div class="touxiang">
			<div>
				<img src="./assets/touxiang.png" alt="" style="height:70%;vertical-align:middle">
			</div>
			<div class="button">
				<div v-if="phone">
					{{ account }}<span @click="signOut" class="signout-btn">退出</span>
				</div>
				<div v-else>
					<!--<span @click="signUp">注册</span> | --><span @click="signIn">登录</span>
				</div>
			</div>
		</div>
		<div class="info">
			<div class="logo">
				<img src="./assets/logo.png" alt="">
			</div>
			<div class="code">
				<img src="./assets/ma.jpg" alt="">
				<p class="text">微信公众号</p>
				<p class="tel">客服热线 : 400-885-9999</p>
			</div>
		</div>
		<div class="bottom">
			&copy; 2017 上海东证期货有限公司 版权所有 沪ICP备08001760号
		</div>
	</div>
</template>

<script>
import Vue from 'vue'
import { Button, Header, MessageBox, Indicator } from 'mint-ui'
import $ from 'jquery'
import Common from '@/modules/common'

Vue.component(Header.name, Header)
Vue.component(Button.name, Button)
export default {
	name: 'login',
	data () {
		return {
			loginState: false,
			phone: ''
		}
	},
	computed: {
		account: {
			get () {
				return this.phone.substring(0, 3) + '****' + this.phone.substring(7, 11)
			},
			set () {}
		}
	},
	created () {
		let vm = this
		// loginController.do?logout
		const token = localStorage.getItem('$token')
		if (token) {
			this.loginCheck()
		}
		window.addEventListener('pageshow', (e) => {
			vm.loginCheck()
		})
	},
	methods: {
		toBack () {
			window.history.back()
		},
		loginCheck () {
			let vm = this
			let paras = ''
			paras = Common.setQueryString(paras)
			const url = process.env.API_URL18088 + '/loginController.do?login_check&' + paras + '&token=' + localStorage.getItem('$token')
			Indicator.open()
			$.ajax({
				url: url,
				type: 'get',
				dataType: 'jsonp',
				jsonp: 'jsoncallback',
				date: {},
				success: function (data) {
					// 1不需要登录
					if (data.login_flag === '1') {
						vm.phone = localStorage.getItem('$mobile_tel')
						vm.loginState = true
					}
					Indicator.close()
				}
			})
		},
		signOut () {
			let vm = this
			// loginController.do?logout
			let paras = ''
			paras = Common.setQueryString(paras)
			const url = process.env.API_URL18088 + '/loginController.do?logout&' + paras + '&token=' + localStorage.getItem('$token')
			Indicator.open()
			$.ajax({
				url: url,
				type: 'get',
				dataType: 'jsonp',
				jsonp: 'jsoncallback',
				date: {},
				success: function (data) {
					if (data.success_type === '1') {
						vm.phone = ''
						localStorage.setItem('$token', '')
						localStorage.setItem('$mobile_tel', '')
					} else {
						MessageBox('提示', data.msg)
					}
					Indicator.close()
				}
			})
		},
		signIn () {
			window.location.href = 'login.html?n_url=back'
		},
		signUp () {
			window.location.href = 'login.html?n_url=back'
		}
	}
}
</script>

<style>
#app .mint-header{
	height: 50px;
	font-size: 16px;
	font-weight: bolder;
	background-color: rgb(251, 92, 95);
	color: #fff;
}
.touxiang{
	text-align: center;
	padding-top: 10px;
	background-color: rgb(251, 92, 95);
}
.touxiang img{
	width: 75px;
}
.button{
	padding-top: 8px;
	text-align: center;
	color: #fff;
	padding-bottom: 17px;
}
.info{
	padding-top: 30px;
}
.info .logo,.info .code{
	text-align: center;
}
.info .logo img{
	width: 55%;
}
.info .code{
	padding-top: 10px;
}
.info .code img{
	width: 35%;
}
.info .code .text{
	font-weight: bolder;
	font-size: 15px;
	text-align: center;
}
.info .code .tel{
	margin-top: 20px;
	font-weight: bolder;
	font-size: 15px;
}
.bottom{
	font-size: 12px;
	text-align: center;
	margin-top: 60px;
	color: gray;
}
.signout-btn{
	margin-left: 20px;
}
</style>
