import axios from 'axios'
import './http'
// import domains from './domains'
let locationUrl = ''
if (process.env.NODE_ENV === 'development') {
  locationUrl = '../api/'
} else {
  locationUrl = '../../'
}
// 相关接口
export const getList = (p, config) => axios.post(locationUrl + 'ajax/getList ', p, config)