import {base} from '../utils/base.js';

export default new class login extends base {
  constructor() {
    super();
  }
  getStorageSync(callback) {
    let storeage = wx.getStorageSync('token');
    if (storeage) {
      return callback && callback(storeage);
    }
    this.authLogin(callback)
  }
  authLogin(callback) {
    wx.login({
      success: res => {
        this.request({
          url: 'other/v1/login/auth',
          type: 'POST',
          data: { code: res.code },
          sCallBack: (result) => {
            wx.setStorageSync('token', result)
            callback && callback(result)
          }
        })
      }
    })
  }
}