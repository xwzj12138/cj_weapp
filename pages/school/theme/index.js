// pages/school/theme/index.js
import school from '../../../model/school.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    theme_info:{id:0}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.theme_info.id = options.id;
    this.getThemeDetail();
  },

  /**
   * 获取主题详情
   */
  getThemeDetail: function () {
    let param = {id:this.data.theme_info.id};
    school.themeDetail(param,(res)=>{
      this.setData({ theme_info:res});
    });
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