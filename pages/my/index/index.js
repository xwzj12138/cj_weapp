// pages/my/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo: {
      nickname: '我们不一样', grade:1,
    avatar:'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJVXjzLkbZp0biaib5zMPibwsZq7JjwnhibRQYvUoE5NphngOa4u6W684JHqpBBBYBBggictauXq8ICsbQ/132'}
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