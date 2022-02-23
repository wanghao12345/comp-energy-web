import ajax from '@/utils/ajax'
export default {
	queryAllDept (data) {
		return ajax(data, {
			url: '/test/api',
			method: 'post'
		})
	}
}