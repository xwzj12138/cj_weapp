// pages/product/detail/index.js
import product from '../../../model/product.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:0,
    detail:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData(options);
    this.getDetail();
  },

  /**
   * 获取商品详情
   */
  getDetail:function(){
    let param = {id:this.data.id};
    product.getDetail(param,(res)=>{
      this.setData({detail:res.data});
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