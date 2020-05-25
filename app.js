//app.js
import login from './model/login.js';
App({
  onLaunch: function (e) {
    //记录场景值
    this.globalData.source = e.scene;
    //记录来源用户id
    if (e.query.share_uid) this.globalData.share_uid = e.query.share_uid;
    //记录二维码标识
    if (e.query.scene) this.globalData.qr_code = e.query.scene;
    //获取登录
    login.getStorageSync((res)=>{
      this.globalData.userInfo = res;
    });
  },
  globalData: {
    is_refresh:false,
    userInfo: null,
    share_uid:0,
    source:0,
    qr_code:null
  }
})