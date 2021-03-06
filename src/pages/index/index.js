// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import '@/styles/main.css'
import Index from './Index.vue'
import jsonp from 'jsonp'

Vue.prototype.$jsonp = jsonp
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
	el: '#app',
	components: { Index },
	template: '<index/>'
})
