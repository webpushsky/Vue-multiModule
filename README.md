# Vue-multiModule多项目共用组件单独打包

``` bash
## 多模块集成的vue项目，多项目共用一份配置，可以互相依赖，也可以独立打包部署。
## 对于一些小公司来说，一个岗位可能身兼数职，可以说是麻雀虽小五脏俱全。
## 小公司项目多，产品迭代快，所以搭建项目的时间就相对较少，重心在于业务。项目的一些依赖，工具，方法，库，组件能复用就复用，省时省力。
## 多项目分模块按需求打包，按项目，按需引入，分别打包，减少了开发人员每次重复搭建的时间，更专心于业务的具体实现。

## Build Setup

# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build // 打包模块到一个包复用重复的资源
npm run build moduleName1,moduleName2,... // 打包指定模块
npm run build-all // 打包所有模块

# 项目已配置proxy，支持本地跨域请求
