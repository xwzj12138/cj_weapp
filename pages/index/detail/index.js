// pages/index/detail/index.js
import { pruze } from '../../../model/pruze.js'
import { user } from '../../../model/user.js'
let userModel = new user();
let pruzeModel = new pruze();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoAd: '',
    userinfo:'',
    pruze_info: {
      id: '',
      is_participant: false,
      image: '',
      title: '', activity_time: '', status: 0,
      brand_name: '', qrcode: '',
      pruze_detail: []
    }
  },
  /**
   * 显示广告
   */
  showAd() {
    if (this.data.videoAd) {
      this.data.videoAd.show().catch((err) => {
        wx.showToast({title:'参与失败',icon: 'none'})
      })
    }else{
      wx.showToast({ title: '网络加载慢,请稍后再试', icon: 'none' })
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
        // isEnded：true有效观看完整视屏 false：无效观看
        if (res.isEnded){
          pruzeModel.participant({ id: this.data.id }, (res) => {
            this.data.pruze_info.is_participant = true
            this.setData({ pruze_info:this.data.pruze_info})
          })
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
    //获取用户信息
    userModel.getGlobalUserinfo((res) => {
      this.setData({ userinfo: res })
    })
    //获取奖品详情
    pruzeModel.getDetail({ id: options.id }, (res) => {
      this.setData({ pruze_info: res.data })
      this.loadVidelAd(res.data.ad_id)
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '我刚刚抽中了几个,现在等级不够帮我助力一下',
      path: '/pages/share/help/index?uid=' + this.data.userinfo.uid
    }
  }
})