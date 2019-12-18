// pages/my/order/list/index.js
import order from '../../../../model/order.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    is_null:false,
    pay_status: ['待支付', '待发货','订单已取消', '待收货', '待评论', '已完成', '申请退款中', '拒绝退款', '退款中','退款成功'],
    current_page: 0,
    data: [],
    last_page: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getOrderList();
  },

  /**
   * 订单列表
   */
  getOrderList:function(){
    if(this.data.current_page>=this.data.last_page) {
      return wx.stopPullDownRefresh();
    }
    let param = { page : this.data.current_page + 1};
    order.getAll(param,(res)=>{
      if(res.data.length==0){
        res.is_null = true;
      }
      if(res.data.current_page>1){
        res.data = this.data.data.concat(res.data);
      }
      this.setData(res);
      wx.stopPullDownRefresh();
    });
  },

  /**
   * 进入订单详情页
   */
  goDetail:function(e){
    wx.navigateTo({
      url: '/pages/my/order/detail/index?id=' + e.currentTarget.dataset.id
    });
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.setData({current_page: 0,last_page: 1});
    this.getOrderList();
  },
  /**
   * 取消订单
   */
  cancel:function(e){
    let param = { id: e.currentTarget.dataset.id};
    order.cancel(param,(res)=>{
      this.data.data[e.currentTarget.dataset.index].status = 2;
      this.setData(this.data)
    });
  },
  /**
   * 支付
   */
  pay: function (e) {
    let param = { id: e.currentTarget.dataset.id };
    order.pay(param, (res) => {
      this.data.data[e.currentTarget.dataset.index].status = 1;
      this.setData(this.data)
    });
  },

  /**
   * 进去评论页面
   */
  goComment:function(e){
    wx.navigateTo({ url: '/pages/my/order/comment/index?id=' + e.currentTarget.dataset.id});
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getOrderList();
  },
  onShow:function(){
    if (getApp().globalData.is_refresh){
      getApp().globalData.is_refresh = false;
      this.onPullDownRefresh();
    }
  }
})