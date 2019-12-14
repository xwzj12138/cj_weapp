import {base} from '../utils/base.js';

export default new class order extends base{
  constructor(){
    super();
  }
  //获取订单列表
  getAll(param,callback){
    this.request({ url: 'index/v1/order/get', type: 'POST', data: param, sCallBack: (res) => { callback(res); } });
  }
  //获取订单列表
  detail(param, callback) {
    this.request({ url: 'index/v1/order/detail', type: 'POST', data: param, sCallBack: (res) => { callback(res); } });
  }
  //取消订单
  cancel(param, callback) {
    this.request({ url: 'index/v1/order/cancel', type: 'POST', data: param, sCallBack: (res) => { callback(res); } });
  }
  //订单继续支付
  pay(param, callback) {
    this.request({ url: 'index/v1/order/pay', type: 'POST', data: param, sCallBack: (res) => { callback(res); } });
  }
}