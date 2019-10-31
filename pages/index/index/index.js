// pages/index/index/index.js
import { pruze, login } from './../../../model/model.js'
import { user } from './../../../model/user.js'
let userModel = new user();
let pruzeModel = new pruze();
let loginModel = new login();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    show_loading:false,
    userinfo:{},
    goodsList: { current_page: 0, last_page:1, data: [] }
  },
  /**
   * 进入详情页面
   */
  goDetail:function(e){
    if (e.currentTarget.dataset.grade>this.data.userinfo.grade){
      return wx.showToast({ title: '您的等级不够，分享好友提升一下吧！', icon: 'none' })
    }
    wx.navigateTo({url: '/pages/index/detail/index?id=' + e.currentTarget.dataset.id})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    loginModel.isLogin((res) => {
      this.getuserinfo()
    });
  },
  /**
   * 授权登录成功回调，获取奖品列表
   */
  getuserinfo: function () {
    //获取用户信息
    userModel.getGlobalUserinfo((res) => {
      this.setData({ userinfo: res })
    })
    this.getPruzeList();
  },
  /**
   * 获取奖品列表
   */
  getPruzeList:function(){
    let param = { page: this.data.goodsList.current_page+1}
    if (this.data.goodsList.current_page == this.data.goodsList.last_page){
      //提示没有数据了
      wx.stopPullDownRefresh()
      return this.setData({ show_loading:true})
    }
    pruzeModel.getList(param,(res) => {
      this.data.show_loading = res.data.length==0?true:false
      this.data.goodsList.current_page = res.current_page
      this.data.goodsList.last_page = res.last_page
      this.data.goodsList.data = this.data.goodsList.data.concat(res.data)
      this.setData({ goodsList: this.data.goodsList, show_loading: this.data.show_loading })
      wx.stopPullDownRefresh()
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.setData({ goodsList: { current_page: 0, last_page:1, data: [] }})
    this.getuserinfo()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getPruzeList()
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