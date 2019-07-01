// pages/index/index/index.js
import { login } from '../../../model/login.js'
import { pruze } from '../../../model/pruze.js'
let pruzeModel = new pruze();
let loginModel = new login();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show_login:false,
    goodsList: { current_page: 1, data: [] }
  },
  /**
   * 进入详情页面
   */
  goDetail:function(e){
    wx.navigateTo({
      url: '/pages/index/detail/index?id=' + e.currentTarget.dataset.id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //判断是否登录
    let token = loginModel.getToken()
    if (!token) {
      this.setData({ show_login: true })
    } else {
      this.getuserinfo()
    }
  },
  /**
   * 授权登录成功回调，获取奖品列表
   */
  getuserinfo: function () {
    pruzeModel.getList((res)=>{
      this.data.goodsList.current_page = res.current_page
      this.data.goodsList.data = this.data.goodsList.data.concat(res.data)
      this.setData({ goodsList: this.data.goodsList})
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