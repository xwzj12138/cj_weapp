// pages/my/participant/detail/index.js
import { user } from '../../../../model/user.js'
let userModel = new user()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    status_list: ['待开奖', '未中奖', '待领取', '领取过期', '待发货','已发货','中奖'],
    pruze_info:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取奖品信息
    userModel.getParticipantDetail({id:options.id},(res)=>{
      this.setData({ pruze_info:res.data})
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})