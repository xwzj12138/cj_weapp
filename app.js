//app.js
import login from './model/login.js';
App({
  onLaunch: function (e) {
    //获取登录
    login.getStorageSync();
    this.globalData.source = e.scene;
    if (e.query.share_uid) this.globalData.share_uid = e.query.share_uid;
  },
  globalData: {
    is_refresh:false,
    userInfo: null,
    share_uid:0,
    source:0
  }
})