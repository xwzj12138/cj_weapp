// pages/product/list/index.js
import product from '../../../model/product.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banner_list:[],
    cat_list:[],
    cate_id:0,
    current_page: 0,
    data: [],
    last_page: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getHomeInf();
    this.getProductList();
    wx.showShareMenu({ withShareTicket: true });
  },

  /**
   * 获取banner图及商品分类列表
   */
  getHomeInf:function(){
    product.getHomeInfo((res) => {
      this.setData(res)
    });
  },

  /**
   * 获取产品列表
   */
  getProductList(){
    if (this.data.current_page >= this.data.last_page) {
      wx.stopPullDownRefresh();
      return this.setData({ show_loading: true });
    }
    let param = { page: this.data.current_page + 1, cate_id: this.data.cate_id};
    product.getList(param,(res)=>{
      if(res.current_page>1){
        res.data = [...this.data.data, ...res.data];
      }
      this.setData(res);
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
   * 进入banner详情页
   */
  goBannerDetail: function (e) {
    wx.navigateTo({ url: e.currentTarget.dataset.detail_url });
  },

  /**
   * 选择分类事件
   */
  tabSelect(e){
    this.setData({ cate_id: e.detail.data.id, current_page: 0,last_page: 1});
    this.getProductList();
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.data.current_page = 0;
    this.getHomeInf();
    this.getProductList();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getProductList();
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