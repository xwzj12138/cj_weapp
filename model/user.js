import { auth } from './auth.js';


export default new class user extends auth {
  constructor() {
    super();
  }
  //获取缓存的用户信息
  getGlobalUserinfo(callback) {
    let appinfo = getApp();
    if (appinfo.globalData.userInfo) {
      return callback(appinfo.globalData.userInfo)
    }
    return this.myinfo(callback);
  }
  //获取用户信息
  myinfo(callback) {
    this.request({
      url: 'api/v1/user/get_info',
      method: 'POST',
      data: {},
      sCallBack: (res) => {
        getApp().globalData.userInfo = res;
        callback(res);
      }
    });
  }
  //获取等级列表
  getGrade(param, callback) {
    this.request({ url: 'api/v1/user/get_grade', method: 'POST', data: param, sCallBack: (res) => { callback(res); } });
  }
  //获取某个用户的信息
  getByIdUserInfo(param, callback) {
    this.request({ url: 'api/v1/user/find', method: 'POST', data: param, sCallBack: (res) => { callback(res); } });
  }
  //给好友助力
  help(param, callback, errCallback = null) {
    this.request({
      url: 'api/v1/user/help', method: 'POST', data: param,
      sCallBack: (res) => { callback(res) },
      errCallBack: (err) => { errCallback && errCallback(err); }
    });
  }
  //获取用户列表
  participant(param, callback) {
    this.request({ url: 'api/v1/user/participant', method: 'POST', data: param, sCallBack: (res) => { callback(res); } });
  }
  //获取好友列表
  getfriend_list(param, callback) {
    this.request({ url: 'api/v1/user/friend_list', method: 'POST', data: param, sCallBack: (res) => { callback(res); } });
  }
  //获取参与详情
  getParticipantDetail(param, callback) {
    this.request({ url: 'api/v1/user/participant_detail', method: 'POST', data: param, sCallBack: (res) => { callback(res); } });
  }
  //获取账单列表
  getBills(param, callback) {
    this.request({ url: 'api/v1/user/getBills', method: 'POST', data: param, sCallBack: (res) => { callback(res); } });
  }
  //申请提现
  withdrawDeposit(param, callback) {
    this.request({ url: 'api/v1/user/withdrawDeposit', method: 'POST', data: param, sCallBack: (res) => { callback(res); } });
  }
  //修改用户信息
  updateUserInfo(param,callback){
    this.request({ url: 'api/v1/user/update', method: 'POST', data: param, sCallBack: (res) => { callback(res); } });
  }
  //修改用户信息
  signIn(callback) {
    this.request({ url: 'api/v1/user/sign_in', method: 'POST', data: {}, sCallBack: (res) => { callback(res); } });
  }
}