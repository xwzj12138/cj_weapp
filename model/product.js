import {auth} from './auth.js';

export default new class product extends auth {
  constructor() {
    super();
  }
  //获取产品列表
  getHomeInfo(callback) {
    this.request({ url: 'api/v1/product/homeInfo', method: 'POST', data: {}, sCallBack: (res) => { callback(res); } });
  }
  //获取产品列表
  getList(param, callback) {
    this.request({ url: 'api/v1/product/search', method: 'POST', data: param, sCallBack: (res) => { callback(res); } });
  }
  //获取产品详情
  getDetail(param, callback) {
    this.request({ url: 'api/v1/product/detail', method: 'POST', data: param, sCallBack: (res) => { callback(res); } });
  }
  //产品支付
  pay(param, callback) {
    this.request({ url: 'api/v1/product/pay', method: 'POST', data: param, sCallBack: (res) => { callback(res); } });
  }
  //收藏商品
  collect(param,callback){
    this.request({ url: 'api/v1/collect/add', method: 'POST', data: param, sCallBack: (res) => { callback(res); } });
  }
  //收藏列表
  collectList(param, callback){
    this.request({ url: 'api/v1/collect/get', method: 'POST', data: param, sCallBack: (res) => { callback(res); } });
  }
  //订单预览
  order_preview(param, callback){
    this.request({ url: 'api/v1/product/order_preview', method: 'POST', data: param, sCallBack: (res) => { callback(res); } });
  }
  //评论列表
  commentList(param, callback) {
    this.request({ url: 'api/v1/product/commentList', method: 'POST', data: param, sCallBack: (res) => { callback(res); } });
  }
}