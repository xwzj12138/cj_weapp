// pages/my/userinfo/index.js
import user from '../../model/user.js'
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
    user.getGlobalUserinfo((res) => {
      this.setData({ userinfo: res })
    })
    this.getGradeList();
  },
  /**
   * 获取等级规则信息
   */
  getGradeList:function(page=1){
    user.getGrade({page:page},(res) => {
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
    return {
      title: '我刚刚抽中了几个,现在等级不够帮我助力一下',
      path: '/pages/share/help/index?uid=' + this.data.userinfo.uid
    }
  }
})