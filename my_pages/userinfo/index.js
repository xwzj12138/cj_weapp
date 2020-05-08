// pages/my/userinfo/index.js
import user from '../../model/user.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo: { is_sign_in:true},
    videoAd:null,
    grade_list: {current_page:1,data:[]}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    user.getGlobalUserinfo((res) => {
      this.setData({ userinfo: res })
    })
    this.getGradeList();
    // 加载视频组件
    this.loadVidelAd();
  },
  /**
   * 获取等级规则信息
   */
  getGradeList:function(page=1){
    user.getGrade({page:page},(res) => {
      this.data.grade_list.current_page = res.current_page
      this.data.grade_list.data = this.data.grade_list.data.concat(res.data)
      this.setData({ grade_list: this.data.grade_list })
    })
  },
  /**
   * 签到触发事件
   */
  signIn: function () {
    if (this.data.videoAd) {
      this.data.videoAd.show().catch(() => {
        // 失败重试
        this.data.videoAd.load()
          .then(() => this.data.videoAd.show())
          .catch(err => {
            wx.showToast({ title: '签到失败', icon: 'none' })
          });
      });
    }
  },
  /**
   * 加载广告插件
   */
  loadVidelAd() {
    // 在页面onLoad回调事件中创建激励视频广告实例
    if (wx.createRewardedVideoAd) {
      let videoAd = wx.createRewardedVideoAd({
        adUnitId: 'adunit-fccf065088fb0505'
      })
      videoAd.onLoad(() => {
        this.data.videoAd = videoAd;
      })
      videoAd.onError((err) => {
        wx.showToast({ title: err.errMsg, icon: 'none' })
      })
      videoAd.onClose((res) => {
        // isEnded：true有效观看完整视屏 false：无效观看
        if (res.isEnded) {
          this.signInSuccess();
        } else {
          wx.showToast({ title: '网络异常', icon: 'none' })
        }
      })
    }
  },
  /**
   * 记录签到
   */
  signInSuccess:function(){
    user.signIn((res)=>{
      this.setData({ userinfo:res})
      getApp().globalData.userInfo = res;
      wx.showToast({ title: '签到成功' })
    });
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