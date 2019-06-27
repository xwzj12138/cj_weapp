// pages/my/cooperation/index.js
import { cooperation } from '../../../model/cooperation.js'
let cooperationModel = new cooperation();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    form:{
      company_name:'',
      product_name:'',
      linkman:'',
      wechat:'',
      remark:''
    }
  },
  /**
   * 设置输入的值
   */
  inputChange: function (e) {
    this.data.form[e.detail.name] = e.detail.value
    this.setData( this.data )
  },
  /**
   * 提交数据
   */
  handleClick:function(e){
    cooperationModel.add(this.data.form,(res)=>{
      wx.navigateBack({
        delta:1
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

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