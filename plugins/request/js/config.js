import Interceptor from './core/interceptor';
import Request from './index';
import TokenApi from '../.././../api/token';
import $ from './tools'
import GzConfig from '../../../common/globalConfig.js'
export const globalInterceptor = {
	request: new Interceptor(),
	response: new Interceptor()
};

/**
 * 全局配置
 * 只能配置 静态数据
 * `content-type` 默认为 application/json
 * `header` 中`content-type`设置特殊参数 或 配置其他会导致触发 跨域 问题，出现跨域会直接进入响应拦截器的catch函数中
 */
export const config = {
	baseURL: GzConfig.WG_URL,
	header: {
		contentType: 'application/x-www-form-urlencoded',
		"Source-Type": "76d5f6283a57b2db",
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Headers": "X-Requested-With"
	}
};

/**
 * 全局 请求拦截器, 支持添加多个拦截器
 * 例如: 配置token、添加一些默认的参数
 *
 * `return config` 继续发送请求
 * `return false` 会停止发送请求，不会进入错误数据拦截，也不会进入请求对象中的catch函数中
 * `return Promise.reject('xxxxx')` 停止发送请求, 会错误数据拦截，也会进入catch函数中
 *
 * @param {Object} config 发送请求的配置数据
 */
globalInterceptor.request.use(
	(config) => {
		console.log('is global request interceptor');
		getToken() && (config.header.token = getToken());
		let publicrequest = $.extend({
			sysid: GzConfig.SYS_SYSTEMID,
			reqid: $.newGuid(),
			protover: "1.0",
			servicever: "1.0",
			requesttime: $.dateFormat(new Date(), "yyyyMMddHHmmssfff"),
			signdata: "",
			reserve: ""
		}, {
			servicecode: config.servicecode
		});
		let data = {
			publicrequest: publicrequest,
			body: config.data.requestParams
		};
		config.data = {
			"": JSON.stringify(data)
		};
		return config;
	},
	(err) => {
		console.error('is global fail request interceptor: ', err);
		return false;
	}
);

/**
 * 全局 响应拦截器, 支持添加多个拦截器
 * 例如: 根据状态码选择性拦截、过滤转换数据
 *
 * `return res` 继续返回数据
 * `return false` 停止返回数据，不会进入错误数据拦截，也不会进入catch函数中
 * `return Promise.reject('xxxxx')` 返回错误信息, 会错误数据拦截，也会进入catch函数中
 *
 * @param {Object} res 请求返回的数据
 * @param {Object} config 发送请求的配置数据
 * @return {Object|Boolean|Promise<reject>}
 */
globalInterceptor.response.use(
	async (res, config) => {
			////////////////////////////////////////
			//  demo使用的是 用code模拟http状态码   //
			////////////////////////////////////////

			console.log('is global response interceptor');

			// 跳过 `request().download()` 这个拦截
			if (typeof res.tempFilePath !== 'undefined') {
				return res;
			}
			console.log(res);
			const data = JSON.parse(res.data);
			const code = data.publicresponse.statuscode;
			const message = data.publicresponse.message;
			try {
				return await handleCode({
					data,
					code,
					message,
					config
				});
			} catch (err) {
				return Promise.reject(err);
			}
		},
		(err, config) => {
			console.error('is global response fail interceptor');
			console.error('err: ', err);
			console.error('config: ', config);

			showToast(err);

			return Promise.reject(err);
			// return false;
		}
);

/**
 * 重新请求更新获取 `token`
 * @param {number} uid
 * @return {Promise}
 */
function getApiToken(uid) {
	return TokenApi.getMockToken(uid).then((res) => {
		return res.token;
	});
}

/**
 * 获取 `localStorage` 中的 `token`
 * @return {string} token字符串
 */
function getToken() {
	return uni.getStorageSync('token');
}

/**
 * 保存 `token` 到  `localStorage`
 * @param {string} token token字符串
 * @return {void}
 */
function saveToken(token) {
	uni.setStorageSync('token', token);
}

/**
 * 处理 http状态码
 * @param {object} o
 * @param {object} o.data 请求返回的数据
 * @param {object} o.config 本次请求的config数据
 * @param {string|number} o.code http状态码
 * @return {object|Promise<reject>}
 */
function handleCode({
	data,
	code,
	message,
	config
}) {
	const STATUS = {
		'0'() {
			return data;
		},
		'2'() {
			return Promise.reject({
				code,
				msg: message
			});
		},
		'1000'() {
			return Promise.reject({
				code,
				msg: message
			});
		},
		'1001'() {
			// 只让这个实例发送一次请求，如果code还是401则抛出错误
			if (config.count === 1) {
				return Promise.reject({
					code,
					msg: message
				});
			}

			config.count++; // count字段自增，可以用来判断请求次数，避免多次发送重复的请求
			config.url = config.instanceURL; // 重置 config的相对地址，避免 `params` 多次添加

			return getApiToken(2460392754)
				.then(saveToken)
				.then(() => Request().request(config));
		},
		'1002'() {
			// 只让这个实例发送一次请求，如果code还是401则抛出错误
			if (config.count === 1) {
				return Promise.reject({
					code,
					msg: message
				});
			}
			config.count++; // count字段自增，可以用来判断请求次数，避免多次发送重复的请求
			config.url = config.instanceURL; // 重置 config的相对地址，避免 `params` 多次添加
			
			return getApiToken(2460392754)
				.then(saveToken)
				.then(() => Request().request(config));
		},
		'1003'() {
			return Promise.reject({
				code,
				msg: message
			});
		},
		'1004'() {
			return Promise.reject({
				code,
				msg: message
			});
		},
		'1005'() {
			return Promise.reject({
				code,
				msg: message
			});
		},
		'1006'() {
			return Promise.reject({
				code,
				msg: message
			});
		},
		'1008'() {
			return Promise.reject({
				code,
				msg: message
			});
		},
		'1009'() {
			return Promise.reject({
				code,
				msg: message
			});
		},
		'1010'() {
			return Promise.reject({
				code,
				msg: message
			});
		},
		'1011'() {
			return Promise.reject({
				code,
				msg: message
			});
		},
		'1012'() {
			return Promise.reject({
				code,
				msg: message
			});
		},
		'1013'() {
			return Promise.reject({
				code,
				msg: message
			});
		},
		'1014'() {
			return Promise.reject({
				code,
				msg: message
			});
		},
		'1015'() {
			return Promise.reject({
				code,
				msg: message
			});
		},
		'1016'() {
			return Promise.reject({
				code,
				msg: message
			});
		},
		'1017'() {
			return Promise.reject({
				code,
				msg: message
			});
		},
		'1018'() {
			return Promise.reject({
				code,
				msg: message
			});
		},
		'1019'() {
			return Promise.reject({
				code,
				msg: message
			});
		}
	};

	return STATUS[code] ? STATUS[code]() : Promise.reject(data, config); // 有状态码但不在这个封装的配置里，就直接进入 `fail`
}

// 显示消息提示框
function showToast(data) {
	uni.showToast({
		title: JSON.stringify(data),
		icon: 'none',
		duration: 5000
	});
}
