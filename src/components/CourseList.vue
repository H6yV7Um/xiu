<template>
	<div class="c-list">
		<mt-loadmore :auto-fill="false" :bottom-method="loadBottom" :top-distance="2000" ref="loadmore" :bottom-all-loaded="allLoaded">
			<div class="i-request-tip" v-if="list.length === 0">
				暂时没有数据...
			</div>
			<div class="box">
				<div class="item" v-for="(item, index) in list" :key="index" @click="toDetail(item)">
					<a :href="item.href">
						<div class="image-box">
							<img :src="item.coverUrl" alt="">
						</div>
						<p class="c-name">
							{{ item.title }}
						</p>
					</a>
				</div>
			</div>
		</mt-loadmore>
	</div>
</template>

<script>
	import Vue from 'vue'
	import { MessageBox, Indicator, Loadmore } from 'mint-ui'
	import $ from 'jquery'
	import Common from '@/modules/common'
	import utils from '@/modules/utils'

	Vue.component(Loadmore.name, Loadmore)

	export default {
		name: 'list',
		data() {
			return {
				category_id: '',
				user_id: '',
				page: 0,
				list: [],
				allLoaded: true
			}
		},
		watch: {
			'$route': 'fetchDate'
		},
		created() {
			this.query()
		},
		methods: {
			fetchDate() {
				this.page = 0
				this.query()
			},
			loadBottom() {
				this.query()
			},
			query() {
				this.page++
					let paras = ''
				if(this.$route) {
					this.category_id = this.$route.params.id
					this.user_id = this.$route.hash.split('#')[1]
					if(this.category_id === '000') {
						if(this.user_id === '000') {
							paras = `current_page=${this.page}&num_per_page=30`
						} else {
							paras = `current_page=${this.page}&num_per_page=30&user_id=${this.user_id}`
						}
					} else {
						if(this.user_id === '000') {
							paras = `current_page=${this.page}&num_per_page=30&category_id=${this.category_id}`
						} else {
							paras = `current_page=${this.page}&num_per_page=30&category_id=${this.category_id}&user_id=${this.user_id}`
						}
					}
				} else {
					this.category_id = utils.getUrlParam('category_id')
					this.user_id = utils.getUrlParam('user_id')
					if(window.location.href.indexOf('detail.html') > -1) {
						paras = `current_page=${this.page}&num_per_page=30&user_id=${this.user_id}`
					}
				}
				paras = Common.setQueryString(paras)
				const url = process.env.API_URL18091 + '/topicController.do?topic_query&' + paras
				Indicator.open()
				let vm = this
				$.ajax({
					url: url,
					type: 'get',
					dataType: 'jsonp',
					jsonp: 'jsoncallback',
					date: {},
					success: function(data) {
						if(data.success_type === '1') {
							vm.list = data.result_map.result_map.recordList
							if(vm.list.length < 30) {
								vm.allLoaded = true // 若数据已全部获取完毕
								vm.$refs.loadmore.onBottomLoaded()
							} else {
								vm.$refs.loadmore.onBottomLoaded()
							}
						} else {
							MessageBox('提示', data.msg)
							vm.$refs.loadmore.onBottomLoaded()
						}
						Indicator.close()
					}
				})
			},
			toDetail(item) {
				const url = `detail.html?user_id=${item.userId}&topic_id=${item.id}&chat_room_id=${item.chatRoomId}&cover_url=${item.coverUrl}&video_url=${item.videoUrl}&title=${item.title}&is_live=${item.isLive}`
				window.location.href = url
			}
		}
	}
</script>

<style scoped>
	.box {
		overflow: hidden;
	}
	
	.c-list {
		overflow: hidden;
		padding: 10px;
	}
	
	.c-list .item {
		width: 50%;
		float: left;
		padding: 10 5px;
		margin-bottom: 20px;
	}
	
	.c-name {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		padding: 5px;
	}
	
	.c-list a {
		display: block;
	}
	
	.image-box {
		padding: 5px;
	}
	
	.image-box img {
		width: 100%;
		border-radius: 7px;
	}
</style>