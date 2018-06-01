<template>
	<div id="app">
    <mt-header title="课 程">
			<mt-button icon="back" slot="left" @click="toBack"></mt-button>

		</mt-header>
    <div :class="[isfocus ? 'isfocus' : 'search']" style="width:100%;padding:10px;">
        <input type="search" v-model="searchName" v-on:focus ="inputfocus" v-on:blur ="inputblur" @keyup="show($event)" autofocus="autofocus" placeholder="请输入课程标题">
    </div>
		<div class="">
				<section class="list">
          <div style="height:10px;width:100%;background:#f3f3f3"></div>
          <div class="c-list">
              <div class="i-request-tip" v-if="result_list.length === 0 && issearch==true">
                未搜索到相关课程
              </div>
              <div class="box">
                <div class="item" v-for= '(item,index) in result_list' :key="index" @click="toDetail(item)">
                  <a :href="item.href">
                    <div class="image-box">
                      <img :src="item.coverUrl" alt="">
                    </div>
                    <p class="c-name">
                      {{ result_list[index].title}}
                    </p>
                   </a>
                </div>
              </div>
          </div>
				</section>
		</div>
	</div>
</template>

<script>
import Vue from 'vue'
import { Button, Header, MessageBox, Indicator ,Loadmore} from 'mint-ui'
import $ from 'jquery'
import Common from '@/modules/common'

Vue.component(Header.name, Header)
Vue.component(Button.name, Button)
Vue.component(Loadmore.name, Loadmore)

export default {
	name: 'searchList',
	data () {
		return {
	    page: 0,
      result_list: [],
      searchName:'',
      isfocus:false,
      issearch:false
		}
	},
	created () {
		// this.queryTopic()
    // this.queryUser()
    this.searchName=localStorage.getItem('HistorySearch');
    if(localStorage.getItem('HistorySearch')){
       this.queryTopic()
       this.issearch=true;
    }
	},
	mounted () {
		// this.$refs.loadmore.onTopLoaded()
	},
	methods: {
		toBack () {
      localStorage.removeItem('HistorySearch');
			window.history.back();
    },
    inputfocus(){
      this.isfocus=true;
    },
    inputblur(){
      if(this.searchName ==''){
        this.isfocus=false;
      }

    },
    show(ev){
      if(ev.keyCode==13){
        if(this.searchName===''){
          MessageBox('提示', '请输入有效搜索内容')
        }else{
          this.queryTopic()
          this.issearch=true;
          localStorage.setItem('HistorySearch',this.searchName)
        }
      }
    },
		getUserInfo () {
			window.location.href = 'user.html'
		},
		queryTopic () {
      var vm = this;
			let paras = 'current_page=1&num_per_page=30&keyword='+this.searchName
			paras = Common.setQueryString(paras)
      const url = process.env.API_URL18091 + '/topicController.do?topic_query&' + paras
			// Indicator.open()
			$.ajax({
				url: url,
				type: 'get',
				dataType: 'jsonp',
				jsonp: 'jsoncallback',
				date: {},
				success: function (data) {
					if (data.success_type === '1') {
						vm.result_list = data.result_map.result_map.recordList
            console.log(vm.result_list)
					} else {
						MessageBox('提示', data.msg)
					}
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

<style>
#app .mint-header{
	height: 50px;
	font-size: 16px;
	font-weight: bolder;
	background-color: rgb(251, 92, 95);
	color: #fff;
}
.search input{
  width: 100%;
  outline: none;
  background-color: #f3f3f3;
  border: none;
  border-radius: 5px;
  height: 27px;
  font-size: 12px;
  padding: 0 10px;
  color: #333333;
  background-image: url(./assets/search_icon.png);
  background-repeat: no-repeat;
  background-size: 13px 13px;
  background-position: 32% center;
}
.isfocus input{
  width: 100%;
  outline: none;
  background-color: #f3f3f3;
  border: none;
  border-radius: 5px;
  height: 27px;
  font-size: 12px;
  padding: 0 20px;
  color: #333333;
  background-image: url(./assets/search_icon.png) ;
  background-repeat: no-repeat;
  background-size: 13px 13px;
  background-position: 5px center;
}
.search input::-webkit-input-placeholder{ /*WebKit browsers*/
  text-align: center;
  transition: .2s ease-in;

}
.isfocus input::-webkit-input-placeholder{ /*WebKit browsers*/
  text-align: left;
  transition: .2s ease-in-out;
  padding-left: 0px;
}
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
