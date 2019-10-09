# vue-cli3.0 拓展脚手架

## 使用前注意事项
1、直接使用 `cnpm`可能会导致依赖不正确。强烈建议给 `npm` 设置 taobao 的 registry。

`npm install --registry=https://registry.npm.taobao.org`

2、如果你遇到 `$t` 报错问题，先删除 `node_modules`文件夹后再重装依赖。

3、考虑到会开发PC端和移动端，这里未引入UI组件库。PC端可以引入iview，移动端可以引入vux。

### 前言
Vue CLI 是一个基于 Vue.js 进行快速开发的完整系统。
这里基于vue-cli 3.0 进行了一些常用插件的拓展，在开发新项目时，可以直接使用本脚手架进行快速搭建。

### 主要功能
1. 引入vue-router使用history模式，使用拦截器功能
2. 引入vuex，使用state管理状态，使用getters映射state，使用mutations修改state，使用actions提交异步事件，并使用module进行模块分割
[vuex](https://vuex.vuejs.org/zh/guide/)。
3. 使用axios作为跟后端交互工具，使用class进行封装axios，并利用interceptors使用拦截器功能
4. 支持`Sass`css预处理，引入公共函数、重置样式、工具函数、全局变量等几个文件坐分类处理
5. 引入vue.config配置系列功能：配置基本路径，输出文件目录，webpack配置，sourceMap，css，devServer等等
6. App.vue里跳转页面使用渐变动画（可仿微信制作左滑右滑翻页动画）
7. 封装util工具函数，有常用的一些公共方法。
8. 封装auth函数，使用localStorage存储用户相关数据
9. 将api请求基础路径，单独提取出来，分dev和pro两种环境
10. 待补充...

### Build Setup
clone到本地仓之后，自行`npm **`，都是老司机了，这里也不重复了。

## 目录结构
``` 
 |---public
 |---src
     |---api             #定义后端api函数
     |---assets          #资源
     |---components      #组件
     |---config          #api请求基础路径
     |---libs            
          |---api.request    #实例化axios
          |---auth           #封装的获取/设置用户信息相关
          |---axios          #封装的axios
          |---util           #封装的常用工具函数
     |---router
          |---index          #router配置相关
          |---routers        #router定义
     |---store    #项目的配置
          |---index          #vuex入口
          |---module         #vuex分模块定义
     |---style           #封装的各类style
     |---views           #各页面
     |---App             #根组件 
     |---main            #入口文件 
......
```