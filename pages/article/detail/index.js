// pages/article/detail/index.js
import { article } from '../../../model/model.js'
let articleModel = new article();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    articleModel.detail({ id: options.id }, (res) => {
      this.setData(res);
    });
  },
  /**
   * 点赞文章
   */
  likeArticle: function (e) {
    let param = { id: this.data.data.id };
    articleModel.like(param, (res) => {
      this.data.data.like_num++
      this.setData(this.data);
      wx.showToast({ title: '成功' });
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