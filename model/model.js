import {base} from '../utils/base.js'

export class pruze extends base {
  constructor() {
    super();
  }
  //获取奖品列表
  getList(param, callback) {
    this.request({ url: 'index/v1/pruze/get_list', type: 'POST', data: param, sCallBack: (res) => { callback(res); } });
  }
  //获取奖品详情
  getDetail(param, callback) {
    this.request({ url: 'index/v1/pruze/detail', type: 'POST', data: param, sCallBack: (res) => { callback(res); } });
  }
  //参与抽奖
  participant(param, callback) {
    this.request({ url: 'index/v1/pruze/participant', type: 'POST', data: param, sCallBack: (res) => { callback(res); } });
  }
  //确认收货地址
  setPruzeAdress(param, callback) {
    this.request({ url: 'index/v1/pruze/setAddress', type: 'POST', data: param, sCallBack: (res) => { callback && callback(res); } });
  }
  //获取我发起的奖品
  myPublish(param, callback) {
    this.request({ url: 'index/v1/pruze/myPublish', type: 'POST', data: param, sCallBack: (res) => { callback && callback(res); } });
  }
  //发起的抽奖
  publish(param, callback) {
    this.request({ url: 'index/v1/pruze/add', type: 'POST', data: param, sCallBack: (res) => { callback && callback(res); } });
  }
  //获取奖品信息（设置发货信息页面）
  getAddressInfo(param, callback){
    this.request({ url: 'index/v1/pruze/addressInfo', type: 'POST', data: param, sCallBack: (res) => { callback && callback(res); } });
  }
  //设置物流信息
  setTrackingNum(param, callback) {
    this.request({ url: 'index/v1/pruze/setTrackingNum', type: 'POST', data: param, sCallBack: (res) => { callback && callback(res); } });
  }
}

export class login extends base {
  constructor() {
    super();
  }
  isLogin(callback) {
    let token = wx.getStorageSync('token');
    if (token) {
      return callback && callback();
    }
    this.authLogin(callback)
  }
  authLogin(callback) {
    wx.login({
      success: res => {
        this.request({
          url: 'other/v1/login/auth',
          type: 'POST',
          data: {code:res.code},
          sCallBack: (result) => {
            let cache = { token: result.data.token }
            wx.setStorageSync('token', cache)
            callback && callback(result)
          }
        })
      }
    })
  }
}

export class cooperation extends base {
  constructor() { super(); }
  //添加商务合作
  add(param, callback) {
    this.request({ url: 'index/v1/applyCooperation/add', type: 'POST', data: param, sCallBack: (res) => { callback(res); } })
  }
}
// 文章相关
export class article extends base{
  constructor(){ super(); }
  // 获取文章列表
  getList(param,callback){
    this.request({ url: 'index/v1/article/getList', type: 'POST', data: param, sCallBack: (res) => { callback(res); } })
  }
  //点赞
  like(param, callback) {
    this.request({ url: 'index/v1/article/like', type: 'POST', data: param, sCallBack: (res) => { callback(res); } })
  }
  //获取文章详情
  detail(param, callback) {
    this.request({ url: 'index/v1/article/detail', type: 'POST', data: param, sCallBack: (res) => { callback(res); } })
  }
  //获取banner图列表
  getBanners(callback) {
    this.request({ url: 'index/v1/article/getBanners', type: 'POST', data: {}, sCallBack: (res) => { callback(res); } })
  }
  //设置浏览量
  browse(param,callback) {
    this.request({ url: 'index/v1/article/browse', type: 'POST', data: param, sCallBack: (res) => { callback(res); } })
  }
  //设置浏览量
  myList(param, callback) {
    this.request({ url: 'index/v1/article/myList', type: 'POST', data: param, sCallBack: (res) => { callback(res); } })
  }
  //获取分类列表
  getCateList(param,callback){
    this.request({ url: 'index/v1/article/getCateList', type: 'POST', data: param, sCallBack: (res) => { callback(res); } })
  }
  //发布文章
  publish(param, callback) {
    this.request({ url: 'index/v1/article/publish', type: 'POST', data: param, sCallBack: (res) => { callback(res); } })
  }
  //顶置文章
  top(param, callback) {
    this.request({ url: 'index/v1/article/top', type: 'POST', data: param, sCallBack: (res) => { callback(res); } })
  }
}
//推广品牌相关
export class brand extends base {
  constructor(){
    super();
  }
  //添加 
  add(param, callback) {
    this.request({ url: 'index/v1/brand/add', type: 'POST', data: param, sCallBack: (res) => { callback(res); } })
  }
  //获取
  getList(callback) {
    this.request({ url: 'index/v1/brand/get', type: 'POST', data: {}, sCallBack: (res) => { callback(res); } })
  }
  //修改品牌信息
  update(param, callback) {
    this.request({ url: 'index/v1/brand/update', type: 'POST', data: param, sCallBack: (res) => { callback(res); } })
  }
}

export class notice extends base {
  constructor(){ super(); }
  //获取通知详情
  detail(param,callback){
    this.request({ url: 'index/v1/notice/detail', type: 'POST', data: param, sCallBack: (res) => { callback(res); } })
  }
}