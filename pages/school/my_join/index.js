// pages/school/my_join/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navList: [{ "name": "我加入的" }, { "name": "江湖门派" }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 选择nav事件
   */
  tabSelect: function (e) {
    console.log(e.detail)
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