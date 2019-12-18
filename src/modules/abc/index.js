/**
 * Created by hyzx on 2018/08/14.
 */
import Vue from 'vue'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import App from './App'
import '@/config/common'
import { ToastPlugin } from 'vux'
Vue.use(ToastPlugin)
Vue.use(MintUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  // router,
  render: h => h(App)
})
