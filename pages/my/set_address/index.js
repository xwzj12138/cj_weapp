// pages/my/set_address/index.js
import { pruze } from '../../../model/model.js'
import { login } from '../../../model/model.js'
let loginModel = new login();
let pruzeModel = new pruze();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:0,
    pruze_info:{}
  },
  /**
   * 进入首页
   */
  goHome: function () {
    wx.switchTab({
      url: '/pages/index/index/index',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ id: options.id })
  },
  /**
   * 确认地址
   */
  setAddress:function(){
    if (this.data.pruze_info.default_address==null){
      return wx.showToast({ title: '请添加收货地址', icon:'none' })
    }
    pruzeModel.setPruzeAdress({ pruze_id: this.data.pruze_info.pruze_id, address_id:this.data.pruze_info.default_address.id},(res)=>{
      wx.switchTab({ url: '/pages/index/index/index' })
    })
  },
  getDetail:function(){
    pruzeModel.getPruzeDetail({ id: this.data.id }, (res) => {
      this.setData({ pruze_info: res.data })
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //判断是否登录
    let token = loginModel.getToken()
    if (!token) {
      this.setData({ show_login: true })
    } else {
      this.getDetail();
    }
  }
})