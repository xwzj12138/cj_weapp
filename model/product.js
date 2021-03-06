import {auth} from './auth.js';

export default new class product extends auth {
  constructor() {
    super();
  }
  //获取产品列表
  getHomeInfo(callback) {
    this.request({ url: 'index/v1/product/homeInfo', type: 'POST', data: {}, sCallBack: (res) => { callback(res); } });
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
  //收藏商品
  collect(param,callback){
    this.request({ url: 'index/v1/collect/add', type: 'POST', data: param, sCallBack: (res) => { callback(res); } });
  }
  //收藏列表
  collectList(param, callback){
    this.request({ url: 'index/v1/collect/get', type: 'POST', data: param, sCallBack: (res) => { callback(res); } });
  }
  //订单预览
  order_preview(param, callback){
    this.request({ url: 'index/v1/product/order_preview', type: 'POST', data: param, sCallBack: (res) => { callback(res); } });
  }
  //评论列表
  commentList(param, callback) {
    this.request({ url: 'index/v1/product/commentList', type: 'POST', data: param, sCallBack: (res) => { callback(res); } });
  }
}