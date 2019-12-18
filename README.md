# Vue-multiModule多项目共用组件单独打包

## 多模块集成的vue项目，多项目共用一份配置，可以互相依赖，也可以独立打包部署。
## 对于一些小公司来说，一个岗位可能身兼数职，可以说是麻雀虽小五脏俱全。
## 小公司项目多，产品迭代快，所以搭建项目的时间就相对较少，重心在于业务。项目的一些依赖，工具，方法，库，组件能复用就复用，省时省力。
## 多项目分模块按需求打包，按项目，按需引入，分别打包，减少了开发人员每次重复搭建的时间，更专心于业务的具体实现。

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build // 打包模块到一个包复用重复的资源
npm run build moduleName1,moduleName2,... // 打包指定模块
npm run build-all // 打包所有模块

# 项目已配置proxy，支持本地跨域请求

## 目录结构
```
webpack
 |---build
 |---src
     |---assets    #资源
     |---css/common.css  #css
     |---fonts/    #字体图标
 |---components 组件
     |---tpl.vue  按钮组件
 |---config 插件
     |---js/common.js    #全局样式依赖与公共组建
     |---js/fleible.js    #手淘rem自适应
     |---js/lib.js    #微信,以及封装的方法
     |---js/mUtils.js    # 自定义方法
     |---js/vueFilter.js    #注册vue的全局过滤器
 |---server 接口
     |---domains.js    #域名地址及接口地址
     |---http.js    #axios配置，及异常处理
     |---index.js    #暴露接口名给组件调用
 |---page    #各个页面模块，模块名可以自定义哦！
     |---abc    #一级目录
        |---index.html
        |---index.js
        |---app.vue
     |---def
        |---index.html#二级目录
        |---index.js
        |---app.vue

