// pages/my/order/detail/index.js
import order from '../../../../model/order.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data:{id:0}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.data.id = options.id
    this.setData(this.data)
    this.getOrderDetail();
  },
  /**
   * 获取订单详情
   */
  getOrderDetail:function(){
    let param = {id:this.data.data.id};
    order.detail(param,(res)=>{
      this.setData({data:res.data})
    });
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