// pages/my/address/list/index.js
import { address } from '../../../../model/address.js'
let addressModel = new address();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    total: 0, 
    per_page: 15, 
    current_page: 1, 
    last_page: 0, 
    data:[]
  },
  /**
   * 添加或修改地址
   */
  goDetail:function(e){
    let page = '/pages/my/address/detail/index'
    console.log(e.currentTarget.dataset.index)
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
      addressModel.setDefault({id:info.id})
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
    addressModel.getList((res) => {
      this.setData(res)
    })
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