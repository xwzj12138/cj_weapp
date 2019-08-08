// pages/my/money/detail/index.js
import { user } from '../../../../model/model.js'
let userModel = new user();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type_list: ['', '提现', '奖品返利', '退款','购买'],
    current_page: 0, 
    last_page: 1, 
    data: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getBills();
  },
  /**
   * 获取账单列表
   */
  getBills:function(){
    let param = { page: this.data.current_page + 1 }
    if (this.data.current_page == this.data.last_page) {
      return wx.stopPullDownRefresh();
    }
    userModel.getBills(param, (res) => {
      this.data.current_page = res.current_page
      this.data.last_page = res.last_page
      this.data.data = this.data.data.concat(res.data)
      this.setData(this.data)
      wx.stopPullDownRefresh()
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

  }
})