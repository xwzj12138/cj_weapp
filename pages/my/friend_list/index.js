// pages/my/friend_list/index.js
import {user} from '../../../model/user.js'
let userModel = new user();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo:{},
    current_page: 0,
    last_page: 1,
    data: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    userModel.getGlobalUserinfo((res)=>{
      this.setData({ userinfo:res})
    })
    this.friend_list()
  },
  /**
   * 获取好友列表
   */
  friend_list:function(){
    let param = { page: this.data.current_page + 1 }
    userModel.getfriend_list(param,(res)=>{
      this.setData(res)
    })
  },
  /**
   * 助力
   */
  helpFriend: function (e) {
    userModel.help({ id: e.currentTarget.dataset.uid }, (res) => {
      wx.showToast({
        title: '助力成功',
      })
    })
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