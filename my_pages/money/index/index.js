// pages/my/money/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    now_brokerage:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ now_brokerage: options.now_brokerage})
  }
})