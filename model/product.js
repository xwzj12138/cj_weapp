import { base } from '../utils/base.js'

export default new class product extends base {
  constructor() {
    super();
  }
  //获取产品列表
  getList(param, callback) {
    this.request({ url: 'index/v1/product/search', type: 'POST', data: param, sCallBack: (res) => { callback(res); } });
  }
  //获取产品详情
  getDetail(param, callback) {
    this.request({ url: 'index/v1/product/detail', type: 'POST', data: param, sCallBack: (res) => { callback(res); } });
  }
  //产品支付
  pay(param, callback) {
    this.request({ url: 'index/v1/product/pay', type: 'POST', data: param, sCallBack: (res) => { callback(res); } });
  }
}