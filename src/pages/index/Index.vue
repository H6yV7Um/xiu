<template>
	<div id="app">
		<mt-header title="">
			<mt-button slot="left">
				<img src="./assets/logo.png" alt="" style="height:70%;vertical-align:middle">
			</mt-button>
			<!-- <mt-button slot="right" @click="getUserInfo">
				<img src="./assets/touxiang.png" alt="" style="height:70%;vertical-align:middle">
			</mt-button> -->
      <!-- <section class="search">
				<div class="searchtitle">课程搜索</div>
				<div class="searchinput"><input name="searchname" placeholder="请输入课程标题">
				</div>
				<div class="searchbtn"><img src="./assets/search.png" alt="" @click="goSearch"></div>
			</section> -->
		</mt-header>
		<div class="">
			<section class="swipe">
				<mt-swipe :auto="4000">
					<mt-swipe-item v-for="item in news_recordList" :key="item.id">
						<img :src="item.imgUrl" alt="" class="record-image" @click="toNews(item)">
					</mt-swipe-item>
				</mt-swipe>
			</section>
			<section class="nav">
				<div class="nav-inner" :style="navStyle">
					<a :href="`list.html#/list/${item.id}#000`" class="item-wrap" v-for="item in recordList" :key="item.categoryId">
						<div class="item">
							<img :src="item.imgURL" alt="">
							<p>
								{{ item.categoryName }}
							</p>
						</div>
					</a>
				</div>
			</section>
			<!-- <section class="search">
				<div class="searchtitle">课程搜索</div>
				<div class="searchinput"><input name="searchname" placeholder="请输入课程标题">
				</div>
				<div class="searchbtn"><img src="./assets/search.png" alt="" @click="goSearch"></div>
			</section> -->
			<section class="course">
				<div class="c-title">热门课程</div>
				<div class="c-list-x">
					<div :style="navListStyle" class="c-list-x-wrap">
						<div class="image-box" @click="toDetail(item)" v-for="item in hotList" :key="item.id">
							<img :src="item.coverUrl">
						</div>
					</div>
				</div>
			</section>

			<section class="course">
				<div class="c-title i-flex">
					<div class="i-flex1">
						最新课程
					</div>
					<div class="i-flex1 n-more" @click="toList">
						查看更多
					</div>
				</div>
				<div class="c-list-y">
					<div class="c-l-item" @click="toDetail(item)" v-for="item in newList" :key="item.id">
						<div class="">
							<img :src="item.coverUrl" alt="">
						</div>
						<p class="c-l-item-name">
							{{ item.title }}
						</p>
					</div>
				</div>
				<div class="all" @click="toList">查看全部课程</div>
			</section>
		</div>

	</div>

</template>

<script>
import Vue from 'vue'
import $ from 'jquery'
import Header from '@/components/Header'
import { Swipe, SwipeItem, MessageBox, Indicator, Loadmore, Field } from 'mint-ui'
import Common from '@/modules/common'
//底部菜单
import { Tabbar, TabItem } from 'mint-ui'

Vue.component(Swipe.name, Swipe)
Vue.component(Loadmore.name, Loadmore)
Vue.component(SwipeItem.name, SwipeItem)
Vue.component(Header.name, Header)
Vue.component(Field.name, Field)

//底部菜单
Vue.component(Tabbar.name, Tabbar)
Vue.component(TabItem.name, TabItem)

export default {
	name: 'index',
	data () {
		return {
			navStyle: {
				width: '0px'
			},
			navListStyle: {
				minWidth: '100%',
				width: '580px'
			},
			recordList: [],
			news_recordList: [],
			hotList: [],
			page: 0,
			newList: [],
			searchname: ''
		}
	},
	created () {
		this.queryNews()
		this.queryTopic()
		this.queryHotList()
		this.loadMore()
	},
	mounted () {},
	methods: {
		_queryData (url, success) {
			Indicator.open()
			$.ajax({
				url: url,
				type: 'get',
				dataType: 'jsonp',
				jsonp: 'jsoncallback',
				date: {},
				success: function (data) {
					if (data.success_type === '1') {
						success(data)
					} else {
						MessageBox('提示', data.msg)
					}
					Indicator.close()
				}
			})
		},
		queryNews () {
			let paras = 'current_page=1&num_per_page=10&category_code=0101'
      paras = Common.setQueryString(paras)
			const url = process.env.API_URL18090 + '/newsController.do?news_query&' + paras
			this._queryData(url, data => {
				if (data.success_type === '1') {
          this.news_recordList = data.result_map.result_map.recordList
          console.log(this.news_recordList)
				} else {
					MessageBox('提示', data.msg)
				}
			})
		},
		queryTopic () {
			let paras = 'current_page=1&num_per_page=10'
      paras = Common.setQueryString(paras)
      const url = process.env.API_URL18091 + '/topicCatagoryController.do?topic_catagory_query&' + paras

			this._queryData(url, data => {
				if (data.success_type === '1') {
          this.recordList = data.result_map.result_list

					// alert(this.recordList.length)
					this.navStyle.width = this.recordList.length * 90 + 60 + 'px'
				} else {
					MessageBox('提示', data.msg)
				}
			})
		},
		queryHotList () {
			let paras = 'current_page=1&num_per_page=10&is_hot=1'
			paras = Common.setQueryString(paras)
			const url = process.env.API_URL18091 + '/topicController.do?topic_query&' + paras
			this._queryData(url, data => {
				if (data.success_type === '1') {
					this.hotList = data.result_map.result_map.recordList
					this.navListStyle.width = this.hotList.length * 190 + 'px'
				} else {
					MessageBox('提示', data.msg)
				}
			})
		},
		queryNewList (page) {
			let paras = `current_page=${page}&num_per_page=10&is_new=1`
			paras = Common.setQueryString(paras)
			const url = process.env.API_URL18091 + '/topicController.do?topic_query&' + paras
			this._queryData(url, data => {
				if (data.success_type === '1') {
					this.newList = data.result_map.result_map.recordList
				} else {
					MessageBox('提示', data.msg)
				}
			})
		},
		loadMore () {
			this.queryNewList(++this.page)
		},
		toNews (item) {
			if (item.hyperLink !== '') {
				window.location.href = item.hyperLink
			}
		},
		toDetail (item) {
			const url = `detail.html?user_id=${item.userId}&topic_id=${item.id}&chat_room_id=${item.chatRoomId}&cover_url=${item.coverUrl}&video_url=${item.videoUrl}&title=${item.title}&is_live=${item.isLive}`
			window.location.href = url
		},
		toList (item) {
			window.location.href = 'list.html#/list/000#000'
		},
		getUserInfo () {
			window.location.href = 'user.html'
		}
	}
}
</script>

<style>
html{
	background-color: rgb(255,255,255);
}
#app .mint-header{
	height: 50px;
	background-color: #fff;
	font-size: 16px;
	font-weight: bolder;
}
#app .mint-swipe-items-wrap:after{
	content: '';
	display: block;
	padding-top: 56.2%;
}
#app .mint-swipe-indicator{
	width: 12px;
	height: 3px;
	display: inline-block;
	background: #000;
	margin: 0 3px;
	opacity: 1;
}
</style>

<style scoped>
.swipe{
	height: auto;
}
.record-image{
	width: 100%;
}
.nav{
	margin-top: 15px;
	width:100%;
	overflow-x: auto;
	-webkit-overflow-scrolling: touch;
	background-color: #fff;
}
.nav .nav-inner{
	padding: 10px;
	overflow: hidden;
	word-wrap: none;
  display: flex;
  flex-wrap:wrap;
  justify-content:space-between;
  box-sizing:border-box;
}
.nav .item-wrap{
	padding: 5px;

	word-wrap: none;
}
.nav .item-wrap .item{
	text-align: center;
}
.nav .item-wrap .item p{
	font-size: 15px;
}
.nav .item-wrap img{
	width: 50px;
}
.course{
	margin-top: 15px;
}
.c-title{
	padding: 10px;
	font-size: 15px;
	background-color: #fff;
}
.c-list-x,.c-list-y{
	margin-top: 1px;
	background-color: #fff;
}
.c-list-x{
	padding: 10px 0;
	overflow-x: auto;
}
.c-list-x-wrap{
	overflow: hidden;
}
.c-list-x .image-box{
	width: 180px;
	margin-left: 10px;
	overflow: hidden;
	float: left;
}
.c-list-x .image-box img{
	width: 100%;
	border-radius: 5px;
}
.i-image-box:after{
	padding-top: 50%;
}
.course .n-more{
	display: flex;
	justify-content: flex-end;
	color: #727272;
	font-size: 16px;
}
.c-list-y{
	overflow: hidden;
	padding: 5px;
}
.c-list-y .c-l-item{
	width: 50%;
	float: left;
	padding: 5px;
}
.c-list-y .c-l-item img{
	width: 100%;
	border-radius: 5px;
}
.c-l-item-name{
	overflow: hidden;
	text-overflow:ellipsis;
	white-space: nowrap;
}
.all{
	text-align: center;
	color: rgb(183,183,183);
	padding: 20px;
}
.search{ font-size: 14px; padding: 10px 10px 0 0px; overflow: hidden; color: #818181;}
.search .searchtitle{float:left; width: 20%; text-align: center;}
.search .searchinput{float:left;width: 65%;}
.search .searchinput input{ width: 100%; border: none; font-size: 14px; padding: 5px; color: #818181;}
.search .searchbtn{float: left; width: 15%; text-align: center;}
.search .searchbtn img{ width: 33px;}
</style>
