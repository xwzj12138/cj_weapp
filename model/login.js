import {base} from '../utils/base.js';

export default new class login extends base {
  constructor() {
    if(!login.instance){
      super();
      login.instance = this;
      login.instance.callback_arr = [];
      login.instance.storeage = wx.getStorageSync('token');
    }
    return login.instance;
  }
  getStorageSync(callback) {
    if (this.storeage && (this.storeage.expire_time-5*60) > (Date.parse(new Date()))/1000) {
      return callback && callback(this.storeage);
    }
    //存贮回调
    if (this.callback_arr.length==0) {
      this.authLogin();
    }
    callback &&  this.callback_arr.push(callback)
  }
  authLogin() {
    wx.login({
      success: res => {
        let app = getApp();
        let url = 'api/v2/login/temporary_token';
        let system_info = wx.getSystemInfoSync();
        if (system_info.AppPlatform && system_info.AppPlatform == 'qq') url = 'api/v1/login/qq_auth';
        this.request({
          url: url,
          method: 'POST',
          data: { 
            code: res.code, app_type:'weapp',
            source: app.globalData.source, 
            share_uid: app.globalData.share_uid, 
            qr_code: app.globalData.qr_code
          },
          sCallBack: (result) => {
            this.storeage = result;
            wx.setStorageSync('token',result);
            this.callback_arr.forEach((callback)=>{
              callback(result);
            });
            this.callback_arr = [];
          }
        });
      }
    })
  }
}