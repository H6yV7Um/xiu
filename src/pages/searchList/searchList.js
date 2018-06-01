// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import '@/styles/main.css'
import searchList from './searchList.vue'

/* eslint-disable no-new */
new Vue({
	el: '#app',
	components: { searchList },
	template: '<searchList/>'
})
