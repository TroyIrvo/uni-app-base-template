import Request from '../plugins/request/js/index';

export default {
	// 这是接口演示用例
	getMockDataMethod(code, requestParams) {
		let r = Request(); //初始化请求
		// 添加私有请求拦截器
		let reqId = r.interceptors.scoped.request.use(
			(config) => {
				console.log('is scoped request');

				return config;
			},
			(err) => {
				console.error('scoped request: ', err);

				return false;
			}
		);
		// 添加私有响应了拦截器
		let repId = r.interceptors.scoped.response.use(
			(res, config) => {
				console.log('is scoped response');

				return res;
			},
			(err) => {
				console.error('scoped response: ', err);

				return Promise.reject(err);
			}
		);

		// 卸载 私有 请求 拦截器
		// instance.interceptors.scoped.request.eject(reqId)
		// 卸载 私有 响应 拦截器
		// instance.interceptors.scoped.response.eject(reqId)

		// 获取Promise对象返回给调用者.
		let instance = r.request({
			servicecode: code,
			data: {
				requestParams
			},
			method: 'post',
		});

		// 超时 6s 就中断请求
		setTimeout(() => {
			r.abort(instance);
		}, 6000);

		return instance;
	},
	
	// 首页界面
	/* 
		获取首页list数据
	 */
	getIndexListData(code,requestParams){
		let r = Request(); //初始化请求
		// 获取Promise对象返回给调用者.
		let instance = r.request({
			servicecode: code,
			data: {
				requestParams
			},
			method: 'post',
		});
		
		// 超时 6s 就中断请求
		setTimeout(() => {
			r.abort(instance);
		}, 6000);
		
		return instance;
	}
}
