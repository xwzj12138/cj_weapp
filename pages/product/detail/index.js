// pages/product/detail/index.js
import product from '../../../model/product.js';
import { login } from '../../../model/model.js';
let loginModel = new login();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:0,
    price_array:[],
    detail:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData(options);
    loginModel.isLogin((res) => {
      this.getDetail();
    });
  },

  /**
   * 获取商品详情
   */
  getDetail:function(){
    let param = {id:this.data.id};
    product.getDetail(param,(res)=>{
      this.setData({ detail: res.data, price_array: res.data.price.split('.')});
    });
  },
  /**
   * 收藏商品
   */
  collectGoods:function(){
    let param = { id: this.data.id };
    product.collect(param, (res) => {
      this.data.detail.is_collect = !this.data.detail.is_collect;
      this.setData(this.data);
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