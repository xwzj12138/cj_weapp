// pages/my/friend_list/index.js
import user from '../../model/user.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show_loading:false,
    is_null:false,
    userinfo:{},
    current_page: 0,
    last_page: 1,
    data: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    user.getGlobalUserinfo((res)=>{
      this.setData({ userinfo:res})
    })
    this.friend_list()
  },
  /**
   * 获取好友列表
   */
  friend_list:function(){
    if (this.data.current_page == this.data.last_page) {
      wx.stopPullDownRefresh();
      return this.setData({ show_loading: true });
    }
    let param = { page: this.data.current_page + 1 }
    user.getfriend_list(param,(res)=>{
      res.is_null = res.current_page == 1 && res.data.length == 0;
      if (res.current_page > 1) res.data = [...this.data.data, ...res.data];
      this.setData(res);
      wx.stopPullDownRefresh();
    });
  },
  /**
   * 助力
   */
  helpFriend: function (e) {
    user.help({ id: e.currentTarget.dataset.uid }, (res) => {
      wx.showToast({
        title: '助力成功',
      })
    })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.friend_list()
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