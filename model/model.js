import {base} from '../utils/base.js'

export class user extends base {
  constructor() {
    super();
  }
  //获取缓存的用户信息
  getGlobalUserinfo(callback) {
    let appinfo = getApp()
    if (appinfo.globalData.userInfo) {
      return callback(appinfo.globalData.userInfo)
    }
    return this.myinfo((res) => {
      callback(res.data)
    });
  }
  //获取用户信息
  myinfo(callback) {
    this.request({
      url: 'index/v1/user/getInfo',
      type: 'POST',
      data: {},
      sCallBack: (res) => {
        let appinfo = getApp()
        appinfo.globalData.userInfo = res.data
        callback(res)
      }
    })
  }
  //获取等级列表
  getGrade(param, callback) {
    this.request({
      url: 'index/v1/user/getGrade',
      type: 'POST',
      data: param,
      sCallBack: (res) => {
        callback(res)
      }
    })
  }
  //获取某个用户的信息
  getByIdUserInfo(param, callback) {
    this.request({
      url: 'index/v1/user/find',
      type: 'POST',
      data: param,
      sCallBack: (res) => {
        callback(res)
      }
    })
  }
  //给好友助力
  help(param, callback, errCallback = null) {
    this.request({
      url: 'index/v1/user/help',
      type: 'POST',
      data: param,
      sCallBack: (res) => {
        callback(res)
      },
      errCallBack: (err) => {
        errCallback && errCallback(err)
      }
    })
  }
  //获取用户列表
  participant(param, callback) {
    this.request({
      url: 'index/v1/user/participant',
      type: 'POST',
      data: param,
      sCallBack: (res) => {
        callback(res)
      }
    })
  }
  //获取好友列表
  getfriend_list(param, callback) {
    this.request({
      url: 'index/v1/user/friend_list',
      type: 'POST',
      data: param,
      sCallBack: (res) => {
        callback(res)
      }
    })
  }
  //获取参与详情
  getParticipantDetail(param, callback) {
    this.request({
      url: 'index/v1/user/participant_detail',
      type: 'POST',
      data: param,
      sCallBack: (res) => {
        callback(res)
      }
    })
  }
}

export class pruze extends base {
  constructor() {
    super();
  }
  //获取奖品列表
  getList(param, callback) {
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
      url: 'index/v1/UserParticipant/detail',
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
        callback && callback(res)
      }
    })
  }
}

export class login extends base {
  constructor() {
    super();
  }
  getToken() {
    return wx.getStorageSync('token')
  }
  authLogin(params, callback) {
    wx.login({
      success: res => {
        params['code'] = res.code
        this.request({
          url: 'other/v1/login/auth',
          type: 'POST',
          data: params,
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

export class address extends base {
  constructor() {
    super();
  }
  //获取地址列表
  getList(callback) {
    this.request({
      url: 'index/v1/address/get',
      type: 'POST',
      data: {},
      sCallBack: (res) => {
        callback(res)
      }
    })
  }
  //添加地址
  add(param, callback) {
    this.request({
      url: 'index/v1/address/add',
      type: 'POST',
      data: param,
      sCallBack: (res) => {
        callback(res)
      }
    })
  }
  //修改地址
  update(param, callback) {
    this.request({
      url: 'index/v1/address/update',
      type: 'POST',
      data: param,
      sCallBack: (res) => {
        callback(res)
      }
    })
  }
  //删除地址
  del(param, callback) {
    this.request({
      url: 'index/v1/address/del',
      type: 'POST',
      data: param,
      sCallBack: (res) => {
        callback(res)
      }
    })
  }
  //设置默认地址
  setDefault(param, callback) {
    this.request({ url: 'index/v1/address/setDefault', type: 'POST', data: param, sCallBack: (res) => { callback && callback(res) } })
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
}