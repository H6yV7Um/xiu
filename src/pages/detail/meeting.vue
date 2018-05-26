<template>
	<div class="meeting">
		<div class="video-pane">
				<div class="video-pane-body">
						<div class="video-discuss">
								<ul class="video-sms-list" id="video_sms_list">
								</ul>
								<div class="video-discuss-pane">
									<div class="video-discuss-tool" id="video-discuss-tool" style="display: none">
										<!--<span class="like-icon zoomIn green"></span>-->
										<a href="javascript:void(0);" class="video-discuss-sms" onclick="smsPicClick()"></a>
										<!-- 点赞按钮 -->
										<!-- <a href="javascript:void(0);" class="video-discuss-like" onclick="sendGroupLoveMsg()"></a> -->
									</div>
									<div class="video-discuss-form" id="video-discuss-form" style="display: block">
										<input type="text" class="video-discuss-input" id="send_msg_text">
										<a href="javascript:void(0);" class="video-discuss-face" id="showEmotionDialog"></a>
										<button class="video-discuss-button" id="onSendMsg">发送</button>
									</div>
									<div class="video-discuss-emotion" id="video-discuss-emotion" style="display: none">
										<div class="video-emotion-pane">
											<ul id="emotionUL">
											</ul>
										</div>
									</div>
								</div>
						</div>
				</div>
		</div>
	</div>
</template>

<script>
/* eslint-disable */
export default {
	name: 'meeting',
	mounted () {
    let h = document.documentElement.scrollHeight || document.body.scrollHeight
    window.scrollTo(h,h)
		let timer = null
		let panel = document.getElementById('video-discuss-form')
		$('#send_msg_text').on('focus', function (event) {
			let target = this
			let c = 0
			timer = setInterval(function () {
				if (c < 3) {
					c++
				} else {
					clearInterval(timer)
					timer = null
					return
				}
				document.body.scrollTop = document.body.scrollHeight
				panel.scrollIntoView(true)
				target.scrollIntoViewIfNeeded()
			}, 100)
		})

		$('#send_msg_text').on('blur', function () {
			if (timer) {
				clearInterval(timer)
				timer = null
			}
		})
	}
}
</script>

<style>
html, body{
	/* height: 100%; */
	background-color: #fff;
}
.mint-navbar .mint-tab-item.is-selected{
	border-bottom: 2px solid red;
	color: gray;
	margin-bottom: -2px;
}
.mint-tab-item-label{
	font-size: 1.0em;
}
.mint-navbar .mint-tab-item{
	border-bottom: 2px solid #fff;
	margin-bottom: -2px;
}
</style>

<style scoped>
.meeting{
	padding-top: 15px;
	position: relative;
	background-color: #fff;
}
</style>
