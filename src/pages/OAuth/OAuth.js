// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import $ from 'jquery'
import Common from '@/modules/common'
import utils from '@/modules/utils'

Vue.config.productionTip = false

const code = utils.getUrlParam('code')
if (code) {
	let paras = 'code=' + code
	paras = Common.setQueryString(paras)
	const url = process.env.API_URL18091 + '/weixinController.do?weixin_auth_account_detail&' + paras
	$.ajax({
		url: url,
		type: 'get',
		dataType: 'jsonp',
		jsonp: 'jsoncallback',
		date: {},
		success: function (data) {
			if (data.success_type === '1') {
				if (data.result_map.result_map.subscribe === '1') {
					const params = utils.getUrlParam('params')
					const url = `detail.html?user_id=${params.userId}&topic_id=${params.topicId}&chat_room_id=${params.chatRoomId}&cover_url=${decodeURIComponent(params.coverUrl)}&video_url=${decodeURIComponent(params.videoUrl)}&title=${params.title}&is_live${params.isLive}`
					window.location.replace(url)
				} else {
					window.location.replace('qrcode.html')
				}
			} else {
				alert(data.msg)
			}
		}
	})
} else {
	// const userId = utils.getUrlParam('user_id')
	// const topicId = utils.getUrlParam('topic_id')
	// const chatRoomId = utils.getUrlParam('chat_room_id')
	// const coverUrl = encodeURIComponent(utils.getUrlParam('cover_url'))
	// const videoUrl = encodeURIComponent(utils.getUrlParam('video_url'))
	// const title = utils.getUrlParam('title')
	// const isLive = utils.getUrlParam('is_live')

	// const params = {user_id: userId, topic_id: topicId, chat_room_id: chatRoomId, cover_url: coverUrl, video_url: videoUrl, title: title, is_live: isLive}
	const redirectUrl = window.location.href // `detail.html?params=${JSON.stringify(params)}`
	const REDIRECT_URI = encodeURI(redirectUrl)
	window.location.replace(`https://open.weixin.qq.com/connect/oauth2/authorize?appid=${process.env.WX_APP_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`)
}

/* eslint-disable no-new */
new Vue({
	el: '#app',
	template: '<div></div>'
})
