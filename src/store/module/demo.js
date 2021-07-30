import { getNewsList } from '@/services/demo';

export default {
	state: {
		newsInfo: {
			rows: [ { titleImgUrl: '' } ],
			total: 0,
		},
	},
	mutations: {
		getNewsList( state, params ) {
			state.newsInfo = params;
		},
	},
	actions: {
		async getNewsList( { commit }, params ) {
			const res = await getNewsList( params );
			if ( res.data.rows.length ) {
				commit( 'getNewsList', res.data );
				// console.log(this.state.getters)
			}
		},
	},
};
