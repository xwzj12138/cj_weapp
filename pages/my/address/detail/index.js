// pages/my/address/detail/index.js
import { address } from '../../../../model/address.js'
let addressModel = new address();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region:[],
    form: {
      id:0,
      consignee_name: '',
      consignee_tel: '',
      province:'',
      city:'',
      county:'',
      address: '',
      is_default: ''
    }
  },
  /**
     * 设置输入的值
     */
  inputChange: function (e) {
    this.data.form[e.detail.name] = e.detail.value
    this.setData(this.data)
  },
  /**
   * 选择地址
   */
  bindRegionChange:function(e){
    this.data.form.province = e.detail.value[0]
    this.data.form.city = e.detail.value[1]
    this.data.form.county = e.detail.value[2]
    this.setData({ region: e.detail.value, form: this.data.form})
  },
  /**
   * 提交数据
   */
  handleClick: function (e) {
    if(this.data.form.id){
      return addressModel.update(this.data.form, (res) => {
        wx.navigateBack({
          delta: 1
        })
      })
    }
    return addressModel.add(this.data.form, (res) => {
      wx.navigateBack({
        delta: 1
      })
    })
  },
  /**
   * 删除数据
   */
  delAddress:function(){
    addressModel.del({ id: this.data.form.id },(res)=>{
      wx.navigateBack({
        delta:1
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options){
      this.setData({form:options})
    }
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