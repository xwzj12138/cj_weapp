// pages/my/userinfo/index.js
import { user } from '../../../model/user.js'
let userModel = new user();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo: {},
    grade_list:{data:[]}
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
      res.data = res.data.concat(this.data.grade_list.data)
      this.setData({ grade_list: res })
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