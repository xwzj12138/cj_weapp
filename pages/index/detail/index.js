// pages/index/detail/index.js
import pruze from '../../../model/pruze.js';
import user from '../../../model/user.js'
import userAddress from '../../../model/userAddress.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail:{}
  },
  /**
   * 显示广告
   */
  showAd(e) {
    //订阅通知消息
    wx.requestSubscribeMessage({ tmplIds:this.data.pruze_info.tmplIds});
    //不需要观看广告
    if(!this.data.pruze_info.ad_id){
      return this.participant();
    }
    //观看广告参与抽奖
    if (this.data.videoAd) {
      this.data.videoAd.show().catch((err) => {
        wx.showToast({title:'参与失败',icon: 'none'})
      });
    }else{
      wx.showToast({ title: '网络加载慢,请稍后再试', icon: 'none' });
    }
  },
  /**
   * 加载广告插件
   */
  loadVidelAd(ad_id) {
    // 在页面onLoad回调事件中创建激励视频广告实例
    if (wx.createRewardedVideoAd) {
      let videoAd = wx.createRewardedVideoAd({
        adUnitId: ad_id
      })
      videoAd.onLoad(() => {
        this.setData({ videoAd: videoAd })
      })
      videoAd.onError((err) => {
        wx.showToast({ title: err.errMsg, icon: 'none' })
      })
      videoAd.onClose((res) => {
        if (res.isEnded){
          this.participant();
        }else{
          wx.showToast({ title: '参与失败了！', icon: 'none' })
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    options.detail = JSON.parse(options.detail);
    this.setData(options);
  },
  /**
   * 分享设置
   */
  onShareAppMessage:function(res){
    return {
      title:this.data.userinfo.nickname+'邀请您参与抽奖',
      path:'/pages/share/help/index?share_uid='+this.data.userinfo.uid
    }
  }
})