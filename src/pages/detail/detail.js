// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import '@/styles/main.css'
import './assets/css/mobile.css'
import Detail from './detail.vue'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
	el: '#app',
	components: { Detail },
	template: '<detail/>'
})
