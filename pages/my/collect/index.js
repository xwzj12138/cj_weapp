// pages/my/collect/index.js
import product from '../../../model/product.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    is_null:false,
    current_page: 0,
    data: [],
    last_page: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCollectList();
  },

  /**
   * 获取收藏列表
   */
  getCollectList(){
    //没有数据停止刷新
    if (this.data.current_page == this.data.last_page) return wx.stopPullDownRefresh();
    //获取数据
    let param = { page: this.data.current_page+1};
    product.collectList(param,(res)=>{
      if(res.data.length==0) res.is_null = true;
      res.data = this.data.data.concat(res.data);
      this.setData(res);
      wx.stopPullDownRefresh();
    });
  },
  /**
   * 进入商品详情页
   */
  goDetail:function(e){
    wx.navigateTo({
      url: '/pages/product/detail/index?id=' + e.currentTarget.dataset.id,
    });
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getCollectList();
  }
})