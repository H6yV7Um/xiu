<template>
	<mt-header fixed :title="titleText">
		<mt-button icon="back" slot="left" @click="goBackBtn" v-show="isShow===1"></mt-button>
		<mt-button icon="" slot="right" v-if="right.text || right.icon" @click="_rightClick">
      <i :class="right.icon" aria-hidden="true"></i>
    </mt-button>
	</mt-header>
</template>

<script>
import Vue from 'vue'
import { Header, Button } from 'mint-ui'

Vue.component(Header.name, Header)
Vue.component(Button.name, Button)

export default {
	name: 'i-header',
	props: {
		isShow: {
			default () {
				return 1
			}
		},
		titleText: {
			required: true
		},
		right: {
			default () {
				return {
					text: '',
					icon: ''
				}
			}
		}
	},
	methods: {
		goBackBtn () {
			window.history.back()
		},
		_rightClick () {
			this.$emit('rightClick')
		}
	}
}
</script>

<style scoped>
.mint-header {
	background-color: rgb(251,92,95);
	color: #fff;
	height: 50px;
	font-size: 16px;
}

.mint-header-title {
	font-size: 1.2em;
}
</style>
