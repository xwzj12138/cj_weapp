// pages/my/brand/list/index.js
import brand from '../../../model/brand.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getBrandList()
  },
  /**
   * 获取品牌列表
   */
  getBrandList:function(){
    brand.getList((res) => {
      this.setData({ data: res});
    });
  },
  /**
   * 进入添加品牌页面
   */
  goDetail:function(e){
    let url = '/my_pages/brand/detail/index';
    if (e.currentTarget.dataset.index!=undefined){
      let item = this.data.data[e.currentTarget.dataset.index];
      url = url + '?id=' + item.id + '&brand_name=' + item.brand_name + '&qrcode=' + item.qrcode + '&intro=' + item.intro;
    }
    wx.navigateTo({ url: url });
  },
  /**
   * 页面显示触发
   */
  onShow: function () {
    if (getApp().globalData.is_refresh) {
      getApp().globalData.is_refresh = false;
      this.getBrandList();
    }
  }
})