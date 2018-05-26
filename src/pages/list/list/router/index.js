import Vue from 'vue'
import Router from 'vue-router'
import List from '@/components/CourseList'
Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/list/:id',
			name: 'list',
			component: List
		}
	]
})
