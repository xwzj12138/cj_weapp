// pages/my/userinfo/index.js
import { user } from '../../../model/user.js'
let userModel = new user();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo: {},
    grade_list: {current_page:1,data:[]}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    userModel.myinfo((res) => {
      this.setData({ userinfo: res.data })
    })
    this.getGradeList();
  },
  /**
   * 获取等级规则信息
   */
  getGradeList:function(page=1){
    userModel.getGrade({page:page},(res) => {
      this.data.grade_list.current_page = res.current_page
      this.data.grade_list.data = this.data.grade_list.data.concat(res.data)
      this.setData({ grade_list: this.data.grade_list })
    })
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