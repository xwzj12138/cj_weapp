// pages/index/detail/index.js
import pruze from '../../../model/pruze.js';
import user from '../../../model/user.js'
import userAddress from '../../../model/userAddress.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pruze_id:'',
    uid:'',
    videoAd: '',
    userinfo:'',
    pruze_info: { default_address: null}
  },
  /**
   * 显示广告
   */
  showAd(e) {
    //订阅通知消息
    wx.requestSubscribeMessage({ tmplIds: ['hmMrlW7_Ksp1TytiPVh_dD34LaOwQCh7Um_cEKJvMQw']});
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
    pruze.participant({ id: this.data.pruze_info.id, form_id: this.data.formId }, (res) => {
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
    this.getDetail();
  },
  /**
   * 获取奖品详情
   */
  getDetail:function(){
    //获取用户信息
    user.getGlobalUserinfo((res) => {
      this.setData({ userinfo: res })
    });
    //获取奖品详情
    pruze.getDetail({ id: this.data.pruze_id, super_uid:this.data.uid}, (res) => {
      this.setData({ pruze_info: res })
      if (res.ad_id != '' && !res.is_participant) {
        this.loadVidelAd(res.ad_id)
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
    pruze.setPruzeAdress({ pruze_id: this.data.pruze_info.id, address_id: this.data.pruze_info.default_address.id }, (res) => {
      getApp().globalData.is_refresh = true;
      wx.navigateBack({});
    });
  },
  /**
   * 选择地址返回是重新加载地址信息
   */
  onShow:function(){
    this.getDetaultAddress();
  },
  /**
   * 获取默认地址
   */
  getDetaultAddress:function(){
    if(this.data.pruze_info.id){
      userAddress.getDefault((res) => {
        this.data.pruze_info.default_address = res
        this.setData(this.data);
      });
    }
  },
  /**
   * 分享设置
   */
  onShareAppMessage:function(res){
    return {
      title:this.data.userinfo.nickname+'邀请您参与抽奖',
      path:'/pages/index/index/index'
    }
  }
})