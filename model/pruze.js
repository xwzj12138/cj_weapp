import { base } from '../utils/base.js'

export class pruze extends base {
  constructor() {
    super();
  }
  //获取奖品列表
  getList(param,callback) {
    this.request({
      url: 'index/v1/pruze/get_list',
      type: 'POST',
      data: param,
      sCallBack: (res) => {
        callback(res)
      }
    })
  }
  //获取奖品详情
  getDetail(param, callback) {
    this.request({
      url: 'index/v1/pruze/detail',
      type: 'POST',
      data: param,
      sCallBack: (res) => {
        callback(res)
      }
    })
  }
  //参与抽奖
  participant(param, callback) {
    this.request({
      url: 'index/v1/pruze/participant',
      type: 'POST',
      data: param,
      sCallBack: (res) => {
        callback(res)
      }
    })
  }
  //获取领取详情
  getPruzeDetail(param, callback) {
    this.request({
      url: 'index/v1/pruze/getDetail',
      type: 'POST',
      data: param,
      sCallBack: (res) => {
        callback(res)
      }
    })
  }
  //确认收货地址
  setPruzeAdress(param, callback) {
    this.request({
      url: 'index/v1/pruze/setAddress',
      type: 'POST',
      data: param,
      sCallBack: (res) => {
        callback(res)
      }
    })
  }
}