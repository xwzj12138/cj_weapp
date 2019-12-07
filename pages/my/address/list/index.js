// pages/my/address/list/index.js
import userAddress from '../../../../model/userAddress.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data:[]
  },
  /**
   * 添加或修改地址
   */
  goDetail:function(e){
    let page = '/pages/my/address/detail/index'
    if (e.currentTarget.dataset.index!=undefined){
      let info = this.data.data[e.currentTarget.dataset.index]
      page = page+'?id=' + info.id + '&consignee_name=' + info.consignee_name + '&consignee_tel=' + info.consignee_tel + '&province=' + info.province + '&city=' + info.city + '&county=' + info.county + '&address=' + info.address + '&is_default=' + info.is_default
    }
    wx.navigateTo({
      url: page,
    })
  },
  /**
   * 设置默认地址
   */
  setDefault:function(e){
    let info = this.data.data[e.currentTarget.dataset.index]
    if (info.is_default!=1){
      for (let i = 0; i < this.data.data.length; i++) {
        if (e.currentTarget.dataset.index == i) {
          this.data.data[i].is_default = 1
        } else {
          this.data.data[i].is_default = 0
        }
      }
      this.setData(this.data)
      userAddress.setDefault({id:info.id})
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    userAddress.getList((res) => {
      this.setData({ data: res.data})
    })
  }
})