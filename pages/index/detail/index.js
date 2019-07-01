// pages/index/detail/index.js
import { pruze } from '../../../model/pruze.js'
let pruzeModel = new pruze();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    is_participant:false,
    videoAd:'',
    image: '',
    title: '', activity_time: '', status: 0,
    brand_name: '', qrcode: '',
    pruze_detail: []
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
            this.setData({ is_participant:true})
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
    //获取奖品详情
    pruzeModel.getDetail({id:options.id},(res)=>{
      this.setData(res.data)
      this.loadVidelAd(res.data.ad_id)
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})