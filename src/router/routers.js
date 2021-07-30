export default [
	{
		path: '/',
		name: 'demo',
		component: () => import( '../pages/Demo/index.vue' ),
	},
	// {path: '/help', name: 'help',component:Help,meta: { title: "帮助" }},
];
