import {auth} from './auth.js';

export default new class order extends auth{
  constructor(){
    super();
  }
  //获取订单列表
  getAll(param,callback){
    this.request({ url: 'api/v1/order/get', method: 'POST', data: param, sCallBack: (res) => { callback(res); } });
  }
  //获取订单列表
  detail(param, callback) {
    this.request({ url: 'api/v1/order/detail', method: 'POST', data: param, sCallBack: (res) => { callback(res); } });
  }
  //取消订单
  cancel(param, callback) {
    this.request({ url: 'api/v1/order/cancel', method: 'POST', data: param, sCallBack: (res) => { callback(res); } });
  }
  //订单继续支付
  pay(param, callback) {
    this.request({ url: 'api/v1/order/pay', method: 'POST', data: param, sCallBack: (res) => { callback(res); } });
  }
  //订单评论的商品列表
  goodsList(param, callback) {
    this.request({ url: 'api/v1/order/goodsList', method: 'POST', data: param, sCallBack: (res) => { callback(res); } });
  }
  //订单评论
  comment(param, callback) {
    this.request({ url: 'api/v1/order/comment', method: 'POST', data: param, sCallBack: (res) => { callback(res); } });
  }
}