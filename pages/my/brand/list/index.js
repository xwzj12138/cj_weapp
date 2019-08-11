// pages/my/brand/list/index.js
import {brand} from '../../../../model/model.js';
let brandModel = new brand();
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
    this.getBrandList()
  },
  /**
   * 获取品牌列表
   */
  getBrandList:function(){
    let param = { page: this.data.current_page + 1 }
    if (this.data.current_page == this.data.last_page) {
      //提示没有数据了
      return wx.stopPullDownRefresh();
    }
    brandModel.getList(param, (res) => {
      this.data.current_page = res.current_page;
      this.data.last_page = res.last_page;
      this.data.data = this.data.data.concat(res.data);
      this.setData(this.data);
      wx.stopPullDownRefresh();
    });
  },
  /**
   * 进入添加品牌页面
   */
  goDetail:function(e){
    let url = '/pages/my/brand/detail/index';
    if (e.currentTarget.dataset.index!=undefined){
      let item = this.data.data[e.currentTarget.dataset.index];
      url = url + '?id=' + item.id + '&brand_name=' + item.brand_name + '&qrcode=' + item.qrcode + '&intro=' + item.intro;
    }
    wx.navigateTo({ url: url });
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getBrandList();
  }
})