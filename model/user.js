import { base } from '../utils/base.js'

export class user extends base {
  constructor() {
    super();
  }
  //获取用户信息
  myinfo(callback) {
    this.request({
      url: 'index/v1/user/getInfo',
      type: 'POST',
      data: {},
      sCallBack: (res) => {
        callback(res)
      }
    })
  }
  //获取用户信息详情
  getGrade(callback) {
    this.request({
      url: 'index/v1/user/getGrade',
      type: 'POST',
      data: {},
      sCallBack: (res) => {
        callback(res)
      }
    })
  }
}