import md5 from 'md5'

export default class Common {
	static getSign (paras) {
		let arr = paras.split('&')
		// 过滤中文
		arr.forEach((obj, idx) => {
			if (obj.indexOf('%25') > 0) {
				arr[idx] = decodeURIComponent(obj)
			}
		})
		paras = this.gerSortedParas(arr)

		// para1=value1&para2=value2
		let paraStr = paras.join('&')

		// 生产
		return md5(process.env.APP_SECRET + paraStr).toUpperCase()
		// 测试
		// return md5('9e787f77f3774fa7ac053321ed556bb4' + paraStr).toUpperCase()
	}

	// 取得全参数
	// 参数方式 para1=value1&para2=value2....
	static setQueryString (paras) {
		if (paras.indexOf('timestamp') < 0) {
			const timestamp = new Date().format('yyyyMMddHHmmss')
			if (paras === '') {
				paras = `timestamp=${timestamp}`
			} else {
				paras = `${paras}&timestamp=${timestamp}`
			}
		}
		const sign = this.getSign(paras)
		// 生产
		const appKey = process.env.APP_KEY
		// 测试
		// const appKey = 'orient_show_key_20180326'
		paras = paras + '&sign=' + sign + '&app_key=' + appKey
		return paras
	}
	// 参数排序 升序
	// 参数方式 para1=value1,para2=value2.... 数组
	static gerSortedParas (paras) {
		return paras.sort()
	}
}
