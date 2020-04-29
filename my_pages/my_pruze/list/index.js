// pages/my/my_pruze/list/index.js
import pruze from '../../../model/pruze.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current_page:0,
    data:[],
    last_page:1,
    show_drawer:false,
    address_info:{},
    form: { index: '', pruze_id:0,shipper_code: '', shipper_name:'', tracking_num:''},
    hd_company_list:[],
    hd_companys:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMyPublish();
  },
  /**
   * 获取我发起的抽奖列表
   */
  getMyPublish:function(){
    //提示没有数据了
    if (this.data.current_page == this.data.last_page) return wx.stopPullDownRefresh();
    //获取我的发布文章
    let param = { page: this.data.current_page + 1 }
    pruze.myPublish(param,(res)=>{
      if (res.current_page > 1) res.data = [...this.data.data, ...res.data];
      this.setData(res);
      wx.stopPullDownRefresh();
    });
  },
  /**
   * 进入奖品详情页
   */
  goDetail:function(e){
    let pruze_info = this.data.data[e.currentTarget.dataset.index];
    let url = '/pages/index/detail/index?id=' + pruze_info.id;
    //未开奖之前进入抽奖页面,否则进入发货页面
    if (pruze_info.no_send_num >0){
      url = '/my_pages/my_pruze/order_list/index?pruze_id=' +pruze_info.id;
    }
    wx.navigateTo({url: url});
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.data.current_page = 0;
    this.data.last_page = 1;
    this.getMyPublish();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getMyPublish();
  },
  /**
   * 页面显示触发
   */
  onShow: function () {
    if (getApp().globalData.is_refresh) {
      getApp().globalData.is_refresh = false;
      this.onPullDownRefresh();
    }
  }
})