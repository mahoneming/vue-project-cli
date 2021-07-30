const path = require( 'path' );

const resolve = dir => path.join( __dirname, dir );
// 项目部署基础
// 默认情况下，我们假设你的应用将被部署在域的根目录下,
// 例如：https://www.my-app.com/
// 默认：'/'
// 如果您的应用程序部署在子路径中，则需要在这指定子路径
// 例如：https://www.foobar.com/my-app/
// 需要将它改为'/my-app/'

module.exports = {
	// 基本路径
	publicPath: process.env.VUE_APP_BASE_URL,
	// 输出文件目录
	outputDir: 'dist',
	assetsDir: 'static',
	// eslint-loader 是否在保存的时候检查
	lintOnSave: false,
	// 是否使用包含运行时编译器的Vue核心的构建
	runtimeCompiler: false,
	// webpack配置
	// see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
	chainWebpack: ( config ) => {
		config.resolve.alias
			.set( '@', resolve( 'src' ) ) // key,value自行定义，比如.set('@@', resolve('src/components'))
			.set( '_node', resolve( 'node_modules' ) );
		// 因为是多页面，所以取消 chunks，每个页面只对应一个单独的 JS / CSS
		config.optimization.splitChunks( {
			cacheGroups: {},
		} );
	},
	configureWebpack: ( config ) => {
		if ( process.env.NODE_ENV === 'production' ) {
			config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true;
			config.optimization.minimizer[0].options.terserOptions.compress.warnings = false;
		}
	},
	// vue-loader 配置项
	// https://vue-loader.vuejs.org/en/options.html
	// vueLoader: {},
	// 生产环境是否生成 sourceMap 文件
	productionSourceMap: false,
	// 默认情况下 babel-loader 忽略其中的所有文件 node_modules
	transpileDependencies: [],
	// css相关配置
	css: {
		// 是否使用css分离插件 ExtractTextPlugin
		extract: false,
		// 开启 CSS source maps?
		sourceMap: false,
		// css预设器配置项
		loaderOptions: {
			css: {
				// options here will be passed to css-loader
			},
			postcss: {
				// options here will be passed to postcss-loader
			},
		},
		// 启用 CSS modules for all css / pre-processor files.
		// modules: true,
	},
	filenameHashing: true,
	// 是否启用dll
	// See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#dll-mode
	// dll: false,
	// PWA 插件相关配置
	// see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
	pwa: {},
	// webpack-dev-server 相关配置
	devServer: {
		overlay: {
			warnings: false,
			error: false,
		},
		// open: process.platform === 'darwin',
		// compress: true,
		// host: '0.0.0.0',
		// port: 8080,
		// https: false,
		// hotOnly: false,
		disableHostCheck: true, // 禁用webpack热重载检查 解决热更新失效问题
		// proxy: {
		//   '/api': {
		//     // 目标 API 地址
		//     target: 'http://192.168.6.163:8080/',
		//     // 如果要代理 websockets
		//     ws: true,
		//     // 将主机标头的原点更改为目标URL
		//     changeOrigin: false,
		//   },
		// },
		proxy: {
			'/api': {
				// target: 'http://10.172.64.204:11999', //
				target: 'http://10.172.64.202:8880/', // 本地联调
				pathRewrite: {
					'^/api': '/',
				},
			},
		},
		// before: (app) => { },
	},
	// cors 相关 https://jakearchibald.com/2017/es-modules-in-browsers/#always-cors
	// corsUseCredentials: false,
	// 构建时开启多进程处理 babel 编译
	parallel: require( 'os' ).cpus().length > 1,
	// 第三方插件配置
	pluginOptions: {},
};
