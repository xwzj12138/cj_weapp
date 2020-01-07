import {base} from '../utils/base.js';
import {config} from '../utils/config.js';

export default new class login extends base {
  constructor() {
    if(!login.instance){
      super();
      login.instance = this;
    }
    return login.instance;
  }
  getStorageSync(callback) {
    let storeage = wx.getStorageSync('token');
    if (storeage) {
      return callback && callback(storeage);
    }
    if (this.is_request) {
      return setTimeout(() => {
        this.getStorageSync(callback)
      }, 100);
    }
    this.is_request = true;
    this.authLogin(callback);
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