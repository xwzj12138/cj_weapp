import { base } from '../utils/base.js'

export class user extends base {
  constructor() {
    super();
  }
  getGlobalUserinfo(callback){
    let appinfo = getApp()
    if (appinfo.globalData.userInfo) {
      return callback(appinfo.globalData.userInfo)
    }
    return this.myinfo((res)=>{
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
  getGrade(param,callback) {
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
  getByIdUserInfo(param,callback){
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
  help(param, callback, errCallback=null) {
    this.request({
      url: 'index/v1/user/help',
      type: 'POST',
      data: param,
      sCallBack: (res) => {
        callback(res)
      },
      errCallBack:(err)=>{
        errCallback && errCallback(err)
      }
    })
  }
  //获取用户列表
  participant(param,callback){
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
  getfriend_list(param,callback){
    this.request({
      url: 'index/v1/user/friend_list',
      type: 'POST',
      data: param,
      sCallBack: (res) => {
        callback(res)
      }
    })
  }
}