<template>
	<div id="index">
      <mt-tab-container v-model="selected">
        <mt-tab-container-item id="one">
            <section class="header">
        <div class="logo1" style="padding-left:15px;">
          <img src="./assets/logo.png" style="vertical-align:middle">
        </div>
        <!-- <section class="search" @click="gosearch()">
          <div class="searchinput">
            <input name="searchname" v-model="searchname" placeholder="课程搜索">
            <img src="./assets/searchbtn_03.png"/>
          </div>
        </section> -->
        <!-- <mt-button slot="right" @click="getUserInfo">
          <img src="./assets/touxiang.png" alt="" style="height:70%;vertical-align:middle">
        </mt-button> -->
      </section>

      <div class="" style="margin-bottom: 68px;">
        <section class="swipe">
          <mt-swipe :auto="4000">
            <mt-swipe-item v-for="item in news_recordList" :key="item.id">
              <img :src="item.imgUrl" alt="" class="record-image" @click="toNews(item)">
            </mt-swipe-item>
          </mt-swipe>
        </section>
        <section class="nav">
          <div class="nav-inner" :style="navStyle">
            <a :href="`list.html#/list/${item.id}?lecturer=000`" class="item-wrap" v-for="item in recordList" :key="item.categoryId">
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
          <div class="c-title">
            <span>
                热门课程
            </span>
          </div>
          <div class="c-list-x">
            <div :style="navListStyle" class="c-list-x-wrap">
              <div class="image-box" @click="toDetail(item)" v-for="item in hotList" :key="item.id">
                <img :src="item.coverUrl">
              </div>
            </div>
          </div>
        </section>

        <section class="course">
          <div class="c-title">
            <!-- <div class="i-flex1"> -->
              <span>最新课程</span>
            <!-- </div> -->
            <!-- <div class="i-flex1 n-more" @click="toList">
              查看更多
            </div> -->
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
        </mt-tab-container-item>
        <mt-tab-container-item id="two">
          <iframe v-if="selected=='two'" src="https://guishu.dzqh.com.cn/futuresAccountController.do?goYidongAccountRegister&marketChannel=001&businessDepartment=xiu" frameborder="0" style="width:100%;min-height:120vh;"></iframe>
        </mt-tab-container-item>
        <mt-tab-container-item id="three">
          <iframe v-if="selected=='three'" src="https://chat8.live800.com/live800/chatClient/chatbox.jsp?
companyID=70649&configID=83625&jid=6826038593" frameborder="0" style="width:100%;min-height:92vh;"></iframe>
        </mt-tab-container-item>
            <mt-tab-container-item id="four">
                <mt-header title="个人中心">
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
          &copy; 2018 上海东证期货有限公司 版权所有 沪ICP备08001760号
        </div>
        <section>
        </section>
        </mt-tab-container-item>
	</mt-tab-container>
	<section>
			<mt-tabbar v-model="selected" fixed>
			  <mt-tab-item id="one">
			  <img v-if="selected=='one'" slot="icon" src="../../assets/home2_15.png">
				 <img v-else slot="icon" src="../../assets/home1_03.png">
			    首页
			  </mt-tab-item>
			  <mt-tab-item id="two">
			      <img v-if="selected=='two'" slot="icon" src="../../assets/kaihu2_09.png">
				    <img v-else slot="icon" src="../../assets/kaihu1_05.png">
			    开户
			  </mt-tab-item>
			  <mt-tab-item id="three">
             <img v-if="selected=='three'" slot="icon" src="../../assets/zixun2_12.png">
				    <img v-else slot="icon" src="../../assets/zixun1_07.png">
			    咨询
			  </mt-tab-item>
			  <mt-tab-item id="four">
			    <img v-if="selected=='four'" slot="icon" src="../../assets/me2_18.png">
				    <img v-else slot="icon" src="../../assets/me1_09.png">
			    我的
			  </mt-tab-item>
			</mt-tabbar>
		</section>
		<section>
			<div class="downloadApp" v-if="selected=='one' || selected=='four'">
				<div class="downloadlogo">
         <img src="../../assets/close.png" height="15px" style="" @click="closedownload">
					<img src="../../assets/icon58.png" height="28" style="border-radius:5px;margin-right:5px;margin-left:10px">
          <div style="width:120px">东证赢家</div>
				</div>
				<div class="downloadbtn">
					<a href="https://www.dzqh.com.cn/orient/html/app/soft.jsp">下载APP</a>
				</div>
			</div>
		</section>
	</div>

</template>

<script>
import Vue from 'vue'
import $ from 'jquery'
import Header from '@/components/Header'
import { Swipe, SwipeItem, MessageBox, Indicator, Loadmore, Field } from 'mint-ui'
import Common from '@/modules/common'
//底部菜单
import { Tabbar, TabItem,TabContainer, TabContainerItem } from 'mint-ui'

Vue.component(TabContainer.name, TabContainer);
Vue.component(TabContainerItem.name, TabContainerItem);
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
				width: '0px',
        minWidth: '100%'
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
			searchname: '',
      selected:'one',
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

		this.queryNews()
		this.queryTopic()
		this.queryHotList()
    this.loadMore()
    let vm = this
		// loginController.do?logout
		const token = localStorage.getItem('$token')
		if (token) {
			this.loginCheck()
		}
		window.addEventListener('pageshow', (e) => {
			vm.loginCheck()
    })
    if(window.location.href.indexOf("?") !=-1){
      var listid = window.location.href.split("?")[1];
      var listSelected =listid.split("=")[1];
      if(listSelected){
        this.selected = listSelected
      }
    }

	},
	mounted () {

	},
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
					this.navStyle.width = this.recordList.length * 90 + 10 + 'px'
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
					this.navListStyle.width = this.hotList.length * 182 + 'px'
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
			window.location.href = 'list.html#/list/000?lecturer=000'
		},
		closedownload () {
			$('.downloadApp').hide();
    },
    gosearch (){
        localStorage.removeItem('HistorySearch')
        window.location.href = 'searchList.html'
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
    },
    getindex () {
			window.location.href = 'index.html'
		}
	}
}
</script>

<style>
html{
	background-color: rgb(255,255,255);
}
.mint-tabbar > .mint-tab-item.is-selected {
    background-color: #fff;
    color: #d73435;
}
.mint-tab-item-icon {
    width: 22px;
    height: 22px;
    margin: 0 auto 5px;
}
.mint-tabbar {
  background-color: #ffffff;
  border-top:1px solid #e1e1e1;
}
.mint-tab-item-label{
  font-size: 10px !important;
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
.mint-swipe{
  height: 240px;
}
</style>

<style scoped>
.header{
	display:flex;
	align-items: center;
	justify-content: space-between;
	height:51px;
}
.logo1 img{
	height:30px;
}
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
  overflow-x: auto;
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
  font-size: 14px;
  color:#393939;
}
.nav .item-wrap img{
  width: 55px;
  border-radius:18px;
}
.course{
	margin-top: 30px;
}
.c-title{
	font-size: 15px;
	background-color: #fff;
  	background:url(./assets/images/title_bg.png) center 100%;
  	background-repeat: repeat-x;
  	box-sizing: content-box;
}
.c-title span{
  margin:0 auto;
  display: block;
  background-color: #fff;
  width:125px;
	font-size: 16px;
  text-align:center;
  position: relative;
  top: -9px;
}
.c-list-x,.c-list-y{
	margin-top: 1px;
	background-color: #fff;

}
.c-list-x{
	padding: 10px 0px;
	overflow-x:auto;
}
.c-list-x-wrap{
	display: flex;
	align-items: center;

}

.c-list-x .image-box{
	width: 50%;
	margin: 0 0 0 12px;
	overflow: hidden;
}

.c-list-x-wrap{
  padding-right:12px;
  box-sizing:content-box;
}

.c-list-x .image-box img{
	width: 100%;
	border-radius: 6px;
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
	color: rgb(144,144,144);
	height: 45px;
	line-height: 45px;
	background-color: #dfdfdf;
  font-size:16px;
}
.search{ font-size: 14px; overflow: hidden; color: #c5c5c5;width: 165px;border: 1px solid #d2d2d2;border-radius: 26px;margin-right:12px;}
.search .searchtitle{width: 20%; text-align: center;}
.search .searchinput{float: left;display: flex;align-items: center;}
input{-webkit-appearance:none;}/*去除input默认样式*/
.search .searchinput input{ width: 100%;outline:none;border:none;  font-size: 14px; padding: 5px;padding-left:10px;color: #818181;}
.search .searchbtn{float: left;background-color:#c7c7c7;border-right:#d2d2d2;height: 28px; text-align: center;border-radius: 0 25px 25px 0;padding-right:10px;}
.search .searchinput img{height:28px;vertical-align: middle;border-radius: 0 25px 25px 0;}

</style>
// 个人中心css
<style>
#index .mint-header{
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
