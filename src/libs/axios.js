import axios from 'axios';
import { Message, MessageBox } from 'element-ui';
import { saveAs } from 'file-saver';
// import { ACCESS_TOKEN, getToken } from '@/services/login';
// import router from '@/router/index';
// import PATHAPI from '@/pathApi';

class HttpRequest {
	constructor( baseUrl ) {
		this.baseUrl = baseUrl;
		this.queue = {};
	}

	getInsideConfig() {
		// const token = getToken( ACCESS_TOKEN );
		const config = {
			baseURL: this.baseUrl,
			headers: {
				'Cache-Control': 'no-cache',
				// Authorization: `Bearer ${token}`,
				TENANT_ID: 1,
				Pragma: 'no-cache',
				//
			},
		};
		return config;
	}

	destroy( url ) {
		delete this.queue[url];
		if ( !Object.keys( this.queue ).length ) {
			// Spin.hide()
		}
	}

	interceptors( instance, url ) {
		// 请求拦截
		instance.interceptors.request.use(
			( config ) => {
				// 添加全局的loading...
				if ( !Object.keys( this.queue ).length ) {
					// Spin.show() // 不建议开启，因为界面不友好
				}
				this.queue[url] = true;
				return config;
			},
			error => Promise.reject( error ),
		);
		// 响应拦截
		instance.interceptors.response.use(
			( res ) => {
				this.destroy( url );
				// console.log( res );
				const { data, status } = res;
				if ( status === 200 && data.code === 2 && !data.data ) {
					Message.error( data.message || '服务器错误' );
					return Promise.reject();
				}
				if ( res.headers && res.headers['content-type'].indexOf( 'application/octet-stream' ) !== -1 ) {
					const blob = new Blob( [ res.data ] );
					const fileName = res.headers['content-disposition'].split( '=' ).slice( -1 ).pop();
					saveAs( blob, fileName );
				}
				return data;
			},
			( error ) => {
				this.destroy( url );
				console.log( error.response );
				if ( error.response.status !== 200 ) {
					Message.error( error.response.data.message || '服务器错误' );
				}
				if ( error.response.status === 400 && error.response.data.code === 40025003 ) {
					MessageBox.confirm( '登录失效, 是否重新登陆?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning',
					} )
						.then( () => {
							const current = location.href;
							const redirect = `${PATHAPI.LoginUrl}?redirect=${current}`;
							window.location.href = redirect;
						} )
						.catch( () => {} );
				}
				return Promise.reject( error );
			},
		);
	}

	request( options ) {
		const instance = axios.create();
		// eslint-disable-next-line no-param-reassign
		options = Object.assign( this.getInsideConfig(), options );
		this.interceptors( instance, options.url );
		return instance( options );
	}
}
export default HttpRequest;
