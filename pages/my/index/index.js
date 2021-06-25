// pages/my/index/index.js
import user from '../../../model/user.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo: { nickname: '', grade: 0, avatar: '', is_sign_in:true}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserInfo();
    wx.showShareMenu({ withShareTicket: true });
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
    user.updateUserInfo(e.detail.userInfo,(res)=>{
      this.data.userinfo.nickname = e.detail.userInfo.nickname
      this.data.userinfo.avatar = e.detail.userInfo.avatar
      this.data.userinfo.gender = e.detail.userInfo.gender
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