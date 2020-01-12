// pages/my/index/index.js
import user from '../../../model/user.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo: {nickname: '', grade:0,avatar:''}
  },
  /**
   * 进入我参与或中奖纪录列表
   */
  gridClick:function(e){
    wx.navigateTo({
      url: e.currentTarget.dataset.page,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserInfo();
  },
  /**
   * 获取用户信息
   */
  getUserInfo:function(){
    user.myinfo((res) => {
      this.setData({ userinfo: res })
      wx.stopPullDownRefresh()
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.getUserInfo();
  },

  /**
   * 更新用户信息
   */
  updateUserInfo(e){
    let param = { nickname: e.detail.userInfo.nickName, avatar: e.detail.userInfo.avatarUrl, gender: e.detail.userInfo.gender};
    user.updateUserInfo(param,(res)=>{
      this.data.userinfo.nickname = param.nickname
      this.data.userinfo.avatar = param.avatar
      this.data.userinfo.gender = param.gender
      this.setData(this.data)
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title:'我刚刚抽中了几个,现在等级不够帮我助力一下',
      path:'/pages/share/help/index?share_uid='+this.data.userinfo.uid
    }
  }
})