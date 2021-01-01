import { auth } from './auth.js'

export default new class pruze extends auth {
  constructor() {
    super();
  }
  //获取奖品列表
  getList(param, callback) {
    this.request({ url: 'api/v1/pruze/get_list', method: 'POST', data: param, sCallBack: (res) => { callback(res); } });
  }
  //获取奖品详情
  getDetail(param, callback) {
    this.request({ url: 'api/v1/pruze/detail', method: 'POST', data: param, sCallBack: (res) => { callback(res); } });
  }
  //参与抽奖
  participant(param, callback) {
    this.request({ url: 'api/v1/pruze/participant', method: 'POST', data: param, sCallBack: (res) => { callback(res); } });
  }
  //确认收货地址
  setPruzeAdress(param, callback) {
    this.request({ url: 'api/v1/pruze/setAddress', method: 'POST', data: param, sCallBack: (res) => { callback && callback(res); } });
  }
  //获取我发起的奖品
  myPublish(param, callback) {
    this.request({ url: 'api/v1/pruze/myPublish', method: 'POST', data: param, sCallBack: (res) => { callback && callback(res); } });
  }
  //发起的抽奖
  publish(param, callback) {
    this.request({ url: 'api/v1/pruze/add', method: 'POST', data: param, sCallBack: (res) => { callback && callback(res); } });
  }
  //设置物流信息
  setTrackingNum(param, callback) {
    this.request({ url: 'api/v1/pruze/setTrackingNum', method: 'POST', data: param, sCallBack: (res) => { callback && callback(res); } });
  }
  //参与详情
  participantDetail(param, callback) {
    this.request({ url: 'api/v1/pruze/participant_detail', method: 'POST', data: param, sCallBack: (res) => { callback && callback(res); } });
  }
  //获取订单列表
  getOrderList(param,callback){
    this.request({ url: 'api/v1/pruze/orderList', method: 'POST', data: param, sCallBack: (res) => { callback && callback(res); } });
  }
  //获取快递公司
  getHdCompanyList(callback){
    this.request({ url: 'api/v1/HdCompany/get', method: 'POST', data: {}, sCallBack: (res) => { callback && callback(res); } });
  }
}