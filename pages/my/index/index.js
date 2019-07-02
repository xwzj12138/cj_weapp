// pages/my/index/index.js
import { user } from '../../../model/user.js'
let userModel = new user();
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
    userModel.getGlobalUserinfo((res) => {
      this.setData({ userinfo: res })
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title:'我刚刚抽中了几个,现在等级不够帮我助力一下',
      path:'/pages/share/help/index?uid='+this.data.userinfo.uid
    }
  }
})