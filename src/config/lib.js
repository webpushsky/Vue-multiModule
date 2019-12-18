import Vue from 'vue'
import {WechatPlugin} from 'vux'
import CryptoJS from 'crypto-js/crypto-js'
import Mixins from '@/config/mixins'
// import { createCustomComponent } from 'VueAMap'
Vue.use(WechatPlugin) //  微信
/*
 * 隐藏微信分享按钮的链接
 * @param {是否隐藏}
 */
export const wxHideMenuItems = (sd) => {
  const wx = Vue.wechat
  wx.config({
    debug: false,
    appId: sd.appId,
    timestamp: sd.timestamp,
    nonceStr: sd.nonceStr,
    signature: sd.signature,
    jsApiList: ['hideMenuItems']
  })
  wx.ready(function () {
    wx.hideMenuItems({
      // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
      menuList: ['menuItem:share:appMessage', 'menuItem:share:timeline', 'menuItem:share:qq', 'menuItem:share:weiboApp', 'menuItem:share:QZone']
    })
  })
  wx.error(function (res) {
    // console.log('1',JSON.stringify(res))
    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，
    // 对于SPA可以在这里更新签名。
  })
}
/**
 * 微信分享
 * @param {微信签名所需对象} sd
 * @param {分享所需字段} sharobj
 * @param {分享所需链接地址} href
 */
export const wxInit = (sd, sharobj, href, path) => {
  const wx = Vue.wechat
  const sharobj1 = sharobj.sharobj1
  const sharobj2 = sharobj.sharobj2
  wx.config({
    debug: false,
    appId: sd.appId,
    timestamp: sd.timestamp,
    nonceStr: sd.nonceStr,
    signature: sd.signature,
    jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareQZone']
  })
  wx.ready(function () {
    wx.onMenuShareTimeline({// 分享到朋友圈
      title: sharobj2.title, // 分享标题
      // link: window.location.origin + '/app/dmstore?store_id=' + _this.storeid, // 分享链接
      link: href, // 分享链接
      imgUrl: sharobj2.imgUrl, // 分享图标
      success: function () {
        // Vue.wxBtnClickTj('share', 'share_timeline')
        Mixins.methods.wxBtnClickTj('share', 'share_timeline', path)
        // alert('分享到朋友圈成功')
      },
      cancel: function () {
        // alert('分享失败,您取消了分享!')
      }
    })
    wx.onMenuShareAppMessage({// 分享给朋友
      title: sharobj1.title, // 分享标题
      desc: sharobj1.desc, // 分享描述
      link: href, // 分享链接
      imgUrl: sharobj1.imgUrl, // 分享图标
      success: function () {
        // alert('成功分享给朋友')
        Mixins.methods.wxBtnClickTj('share', 'share_appmessage', path)
      },
      cancel: function () {
        // alert("分享失败,您取消了分享!")
      }
    })
    wx.onMenuShareQQ({ // 分享到qq
      title: sharobj1.title, // 分享标题
      desc: sharobj1.desc, // 分享描述
      link: href, // 分享链接
      imgUrl: sharobj1.imgUrl, // 分享图标
      success: function () {
        // alert('成功分享到qq')
        Mixins.methods.wxBtnClickTj('share', 'share_qq', path)
      },
      cancel: function () {}
    })
    wx.onMenuShareWeibo({// 分享到微博
      title: sharobj.title, // 分享标题
      desc: sharobj.desc, // 分享描述
      link: href, // 分享链接
      imgUrl: sharobj.imgUrl, // 分享图标
      success: function () {
        // alert('分享到微博')
      },
      cancel: function () {
        // alert("分享失败,您取消了分享!")
      }
    })
    wx.onMenuShareQZone({// 分享到空间
      title: sharobj2.title, // 分享标题
      link: href, // 分享链接
      imgUrl: sharobj2.imgUrl, // 分享图标
      success: function () {
        // alert('分享到空间')
      },
      cancel: function () {
        // alert("分享失败,您取消了分享!")
      }
    })
  })
  wx.error(function (res) {
    console.log(res)
    // alert(JSON.stringify(res))
    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，
    // 对于SPA可以在这里更新签名。
  })
}

/**
 * 微信支付
 * @param {微信签名所需对象} sd
 * @param {支付所需字段} paysd
 * @param {回调函数} cb
 */
export const wxpay = (sd, paysd, cb, cancelCb) => {
  const wx = Vue.wechat
  wx.config({
    debug: false,
    appId: sd.appId,
    timestamp: sd.timestamp,
    nonceStr: sd.nonceStr,
    signature: sd.signature,
    jsApiList: [
      'chooseWXPay'
    ]
  })
  wx.ready(function () {
    wx.chooseWXPay({
      timestamp: paysd.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
      nonceStr: paysd.nonceStr, // 支付签名随机串，不长于 32 位
      package: paysd.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
      signType: paysd.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
      paySign: paysd.paySign, // 支付签名
      success: function (res) {
        // 支付成功后的回调函数
        cb(res)
      },
      cancel: function (res) {
        // 取消支付后的回调函数
        cancelCb(res)
      }
    })
  })
  wx.error(function (res) {
    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看
  })
}
/**
 * 图片预览
 * @param {数组中当前图片链接} src
 * @param {图片数组} imgPaths
 */
export const wximgview = (src, imgPaths) => {
  const wx = Vue.wechat
  wx.previewImage({
    current: src,
    urls: imgPaths
  })
}
/**
 * 获取地址栏参数
 * @param {url中要截取的参数字段} name
 */
// 获取url参数
export const getHashQueryString = (name) => {
  var after = window.location.hash.split('?')[1]
  if (after) {
    var reg = new RegExp('(^|&)' + name + '= ([^&]*)(&|$)')
    var r = after.match(reg)
    if (r !== null) {
      return decodeURIComponent(r[2])
    } else {
      return null
    }
  }
}
export const getQueryString = (name) => {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  var r = window.location.search.substr(1).match(reg)
  if (r != null) {
    return unescape(r[2])
  }
  return null
}
/**
 * 获取地址栏参数
 * @param {url中要截取的参数字段} name
 */
// export const getParam = (paramName) => {
//   var paramValue = '', isFound = !1
//   if (window.location.search.indexOf('?') === 0 && window.location.search.indexOf('=') > 1) {
//     var arrSource = unescape(window.location.search).substring(1, window.location.search.length).split('&'), i = 0
//     while (i < arrSource.length && !isFound) arrSource[i].indexOf('=') > 0 && arrSource[i].split('=')[0].toLowerCase() == paramName.toLowerCase() && (paramValue = arrSource[i].split('=')[1], isFound = !0), i++
//   }
//   return paramValue
// }
/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
  if (!name) return
  if (typeof content !== 'string') {
    content = JSON.stringify(content)
  }
  window.localStorage.setItem(name, content)
}
/**
 * 获取localStorage
 */
export const getStore = name => {
  if (!name) return
  return window.localStorage.getItem(name)
}
/**
 * 删除localStorage
 */
export const removeStore = name => {
  if (!name) return
  window.localStorage.removeItem(name)
}
/**
 * 获取日期差
 */
export const getDiffDays = (timeOne, timeTwo) => {
  if (!timeOne || !timeTwo) return
  var days = timeTwo.getTime() - timeOne.getTime()
  var time = parseInt(days / (1000 * 60 * 60 * 24))
  return time
}
export const DateDiff = (sDate1, sDate2) => {
  var aDate, oDate1, oDate2, iDays
  aDate = sDate1.split('-')
  oDate1 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0])
  aDate = sDate2.split('-')
  oDate2 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0])
  iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24)
  return iDays
}
/**
 * 加密
 */
export const encrypt = (str) => {
  var key = CryptoJS.enc.Utf8.parse('52D3583B39EF02E8')// 秘钥
  var iv = CryptoJS.enc.Utf8.parse('')// 向量iv
  var encrypted = CryptoJS.AES.encrypt(str, key, {iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7})
  return encrypted.toString()
}
/**
 * 解密
 * @param str
 */
export const decrypt = (str) => {
  var key = CryptoJS.enc.Utf8.parse('52D3583B39EF02E8') // 秘钥
  var iv = CryptoJS.enc.Utf8.parse('') // 向量iv
  var decrypted = CryptoJS.AES.decrypt(str, key, {iv: iv, padding: CryptoJS.pad.Pkcs7})
  return decrypted.toString(CryptoJS.enc.Utf8)
}
/**
 * 生成四个随机字母
 * @param
 */
export const getRanNum = () => {
  var result = []
  for (var i = 0; i < 4; i++) {
    var ranNum = Math.ceil(Math.random() * 25)
    result.push(String.fromCharCode(65 + ranNum))
  }
  return result.join('')
}
/**
 * 设置title
 * @param
 */
export const setTitle = (t) => {
  document.title = t
  let iframe = document.createElement('iframe')
  iframe.style.display = 'none'
  iframe.onload = function () {
    setTimeout(iframe.remove, 100)
  }
  document.body.appendChild(iframe)
  return document.title
}
export const getCurrentDate = () => {
  if (JSON.parse(sessionStorage.getItem('currentDate')) !== null && JSON.parse(sessionStorage.getItem('currentDate')).length === 2) {
    return JSON.parse(sessionStorage.getItem('currentDate'))
  } else {
    let tomorrowDay = new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
    let afterTomorrowDay = new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000)
    let currentDate = [
      {
        year: tomorrowDay.getFullYear().toString(),
        month: tomorrowDay.getMonth() + 1 < 10 ? '0' + (tomorrowDay.getMonth() + 1).toString() : (tomorrowDay.getMonth() + 1).toString(),
        day: tomorrowDay.getDate().toString(),
        week: weekFilter(tomorrowDay.getDay())
      },
      {
        year: afterTomorrowDay.getFullYear().toString(),
        month: afterTomorrowDay.getMonth() + 1 < 10 ? '0' + (tomorrowDay.getMonth() + 1).toString() : (tomorrowDay.getMonth() + 1).toString(),
        day: afterTomorrowDay.getDate().toString(),
        week: weekFilter(afterTomorrowDay.getDay())
      }
    ]
    return currentDate
  }
}

// 判断ios系统浏览器自带返回
export const judgmentSystem = () => {
  let ua = navigator.userAgent
  // 苹果手机
  if (ua.indexOf('iPhone') > -1) {
    window.onload = function () {
      setTimeout(() => {
        // alert('我监听到了浏览器的返回按钮事件啦')
        window.addEventListener('popstate', function (e) {
          self.location = document.referrer
        })
      }, 500)
    }
  }
}
