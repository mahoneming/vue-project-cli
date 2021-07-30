import axios from '@/libs/api.request';

export function getToken( data ) {
	return axios.request( {
		url: '/tax-basic/user/getToken',
		method: 'post',
		data,
	} );
}

export function userinfo() {
	return axios.request( {
		url: '/tax-basic/user/base-info',
		method: 'get',
	} );
}
