// pages/index/detail/index.js
import { pruze, login } from '../../../model/model.js'
import { user } from '../../../model/user.js'
let loginModel = new login();
let userModel = new user();
let pruzeModel = new pruze();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pruze_id:'',
    uid:'',
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
  showAd(e) {
    //订阅通知消息
    wx.requestSubscribeMessage({tmplIds: ['u93dbusp5sqJHvpu2WaGFhNX_LHHIooWxvS2xeuUGyo']});
    //不需要观看广告
    if(this.data.pruze_info.ad_id==''){
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
        // isEnded：true有效观看完整视屏 false：无效观看
        if (res.isEnded){
          this.participant();
        }else{
          wx.showToast({ title: '参与失败了！', icon: 'none' })
        }
      })
    }
  },
  /**
   * 参与抽奖
   */
  participant:function(){
    pruzeModel.participant({ id: this.data.pruze_info.id, form_id: this.data.formId }, (res) => {
      this.data.pruze_info.is_participant = true
      this.setData({ pruze_info: this.data.pruze_info });
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    options.uid = options.uid?options.uid:'';
    this.setData({ pruze_id: options.id, uid: options.uid})
    loginModel.isLogin((res) => {
      this.getDetail();
    });
  },
  /**
   * 获取奖品详情
   */
  getDetail:function(){
    //获取用户信息
    userModel.getGlobalUserinfo((res) => {
      this.setData({ userinfo: res })
    });
    //获取奖品详情
    pruzeModel.getDetail({ id: this.data.pruze_id, super_uid:this.data.uid}, (res) => {
      this.setData({ pruze_info: res.data })
      if (res.data.ad_id != '' && !res.data.is_participant) {
        this.loadVidelAd(res.data.ad_id)
      }
    })
  },
  /**
   * 确认地址
   */
  setAddress: function () {
    if (this.data.pruze_info.default_address == null) {
      return wx.showToast({ title: '请添加收货地址', icon: 'none' })
    }
    pruzeModel.setPruzeAdress({ pruze_id: this.data.pruze_info.id, address_id: this.data.pruze_info.default_address.id }, (res) => {
      wx.switchTab({ url: '/pages/index/index/index' });
    })
  },
  onShareAppMessage:function(res){
    return {
      title:this.data.userinfo.nickname+'邀请您参与抽奖',
      path:'/pages/index/index/index'
    }
  }
})