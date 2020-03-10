// pages/product/list/index.js
import product from '../../../model/product.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current_page: 0,
    data: [],
    last_page: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getProductList();
    wx.showShareMenu({ withShareTicket: true });
  },
  /**
   * 获取产品列表
   */
  getProductList(){
    if (this.data.current_page == this.data.last_page) {
      wx.stopPullDownRefresh();
      return this.setData({ show_loading: true });
    }
    let param = { page: this.data.current_page + 1 };
    product.getList(param,(res)=>{
      res.data = this.data.data.concat(res.data);
      this.setData(res)
      wx.stopPullDownRefresh();
    });
  },
  
  /**
   * 进入产品详情页
   */
  goDetail: function (e) {
    wx.navigateTo({
      url: '/pages/product/detail/index?id=' + e.currentTarget.dataset.id,
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.setData({current_page: 0,data: [],last_page: 1});
    this.getProductList();
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
    return {
      title: this.data.data[0].product_name,
      path: '/pages/product/detail/index?share_uid=' + getApp().globalData.userInfo.uid,
      imageUrl: this.data.data[0].image
    }
  }
})