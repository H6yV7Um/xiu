import $ from 'jquery'
import Common from '@/modules/common'
const wx = require('weixin-js-sdk')
export default class Utils {
	static getUrlParam (name) {
		let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
		let r = window.location.search.substr(1).match(reg)
		if (r != null) {
			return decodeURIComponent(r[2])
		}
		return null
	}

	static getCode () {
		const code = this.getUrlParam('code')
		if (code) {
			let paras = 'code=' + code
			paras = Common.setQueryString(paras)
			const url = process.env.API_URL18091 + '/weixinController.do?weixin_account_detail&' + paras
			$.ajax({
				url: url,
				type: 'get',
				dataType: 'jsonp',
				jsonp: 'jsoncallback',
				date: {},
				success: function (data) {
					if (data.success_type === '1') {
						// a
					} else {
						alert(data.msg)
					}
				}
			})
		} else {
			const REDIRECT_URI = encodeURI(window.location.href)
			window.location.replace(`https://open.weixin.qq.com/connect/oauth2/authorize?appid=${process.env.WX_APP_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`)
		}
	}
	static checkPermission (options, success, err) {
		wx.config({
			debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
			appId: process.env.WX_APP_ID,
			timestamp: '', // 必填，生成签名的时间戳
			nonceStr: '', // 必填，生成签名的随机串
			signature: '', // 必填，签名，见附录1
			jsApiList: ['onMenuShareAppMessage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
		})
		wx.ready(function () {
			success()
			// config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
		})
		wx.error(function (res) {
			err(res)
			// config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
		})
	}
}
