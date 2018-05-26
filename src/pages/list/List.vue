<template>
	<div id="app">
		<mt-header title="课 程">
			<mt-button icon="back" slot="left" @click="toBack"></mt-button>
			<mt-button slot="right" @click="getUserInfo">
				<img src="./assets/touxiang.png" alt="" style="height:70%;vertical-align:middle">
			</mt-button>
		</mt-header>
		<div class="">
				<section class="nav">
					<div class="nav-col">
						<ul class="nav-wrap" :style="topicUl" id="topicUl">
							<li class="item-name item">分类</li>
							<li class="item">
								<router-link :to="`/list/000${getRouterHash()}`" replace>
									<div>不限</div>
									<p class="points"></p>
								</router-link>
							</li>
							<li class="item" v-for="item in result_list" :key="item.id">
								<router-link :to="`/list/${item.id}${getRouterHash()}`" replace>
									<div>{{ item.categoryName }}</div>
									<p class="points"></p>
								</router-link>
							</li>
						</ul>
					</div>
					<div class="nav-col">
						<ul class="nav-wrap" :style="userUl" id="userUl">
							<li class="item item-name">讲师</li>
							<li class="item">
								<router-link :to="`${getRouterPath()}#000`" replace>
									<div>不限</div>
									<p class="points"></p>
								</router-link>
							</li>
							<li class="item" v-for="item in user_list" :key="item.id">
								<router-link :to="`${getRouterPath()}#${item.id}`" exact replace>
									<div>{{ item.lecturerName }}</div>
									<p class="points"></p>
								</router-link>
							</li>
						</ul>
					</div>
				</section>
				<section class="list">
					<router-view v-if="refresh"></router-view>
				</section>

		</div>
	</div>
</template>

<script>
import Vue from 'vue'
import List from '@/components/CourseList'
import { Header, Indicator, Loadmore, MessageBox, Button } from 'mint-ui'
import Common from '@/modules/common'
import $ from 'jquery'

Vue.component(Header.name, Header)
Vue.component(Button.name, Button)
Vue.component(Loadmore.name, Loadmore)
Vue.component(List.name, List)

export default {
	name: 'list',
	data () {
		return {
			topicUl: {
				minWidth: '100%',
				width: '100%'
			},
			result_list: [],
			userUl: {
				minWidth: '100%',
				width: '100%'
			},
			user_list: [],
			list: [],
			refresh: true,
			allLoaded: true
		}
	},
	created () {
		this.queryTopic()
		this.queryUser()
	},
	mounted () {
		// this.$refs.loadmore.onTopLoaded()
	},
	methods: {
		toBack () {
			window.history.back()
		},
		getUserInfo () {
			window.location.href = 'user.html'
		},
		queryTopic () {
			let paras = ''
			paras = Common.setQueryString(paras)
			const url = process.env.API_URL18091 + '/topicCatagoryController.do?topic_catagory_query&' + paras
			// Indicator.open()
			let vm = this
			$.ajax({
				url: url,
				type: 'get',
				dataType: 'jsonp',
				jsonp: 'jsoncallback',
				date: {},
				success: function (data) {
					if (data.success_type === '1') {
						let width = 0
						vm.result_list = data.result_map.result_list
						setTimeout(function () {
							let li = document.getElementById('topicUl').getElementsByTagName('li')
							for (let i = 0; i < li.length; i++) {
								width += (li[i].offsetWidth + 20)
								vm.topicUl.width = width + 30 + 'px'
							}
						}, 0)
					} else {
						MessageBox('提示', data.msg)
					}
					Indicator.close()
				}
			})
		},
		queryUser () {
			let paras = 'is_lecturer=1'
			paras = Common.setQueryString(paras)
			const url = process.env.API_URL18091 + '/topicUserController.do?topic_user_query&' + paras
			// Indicator.open()
			let vm = this
			$.ajax({
				url: url,
				type: 'get',
				dataType: 'jsonp',
				jsonp: 'jsoncallback',
				date: {},
				success: function (data) {
					if (data.success_type === '1') {
						vm.user_list = data.result_map.result_list
						let width = 0
						setTimeout(function () {
							let li = document.getElementById('userUl').getElementsByTagName('li')
							for (let i = 0; i < li.length; i++) {
								width += (li[i].offsetWidth) + 20
							}
							vm.userUl.width = width + 20 + 'px'
						}, 0)
					} else {
						MessageBox('提示', data.msg)
					}
					Indicator.close()
				}
			})
		},
		loadTop () {
			this.refresh = false
			setTimeout(() => {
				this.refresh = true
				this.$refs.loadmore.onTopLoaded()
			}, 2000)
		},
		getRouterHash () {
			return this.$route.hash
		},
		getRouterPath () {
			return this.$route.path
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
.nav{
	width: 100%;
	border-bottom: 1px solid #e5e5e5;
}
.nav .nav-col{
	overflow-x: scroll;
	-webkit-overflow-scrolling: touch;
	width: 100%;
	padding: 0 10px;
}
#topicUl{
	height: 50px;
	padding-top: 20px;
	width: 100%;
	overflow: hidden;
}
#userUl{
	height: 50px;
	padding-top: 10px;
	width: 100%;
	overflow: hidden;
	padding-bottom: 10px;
}
.nav .nav-col li{
	float: left;
}
.nav .nav-col .item-name.item{
	color: rgb(193,193,193);
}
.nav .nav-col .item{
	margin-right: 20px;
	font-size: 14px;
	color: #727272;
}
.router-link-active{
	font-size: 16px;
	font-weight: bolder;
	color: #000;
}
.router-link-active .points{
	width: 6px;
	height: 6px;
	background-color: skyblue;
	margin-left: 50%;
	border-radius: 100%;
	transform: translate(-3px)
}
</style>
