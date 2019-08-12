// pages/my/brand/list/index.js
import {brand} from '../../../../model/model.js';
let brandModel = new brand();
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
    brandModel.getList((res) => {
      this.setData({ data: res.data});
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
  }
})