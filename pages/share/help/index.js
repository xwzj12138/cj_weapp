// pages/share/help/index.js
import { login } from '../../../model/login.js'
import { pruze } from '../../../model/pruze.js'
import { user } from '../../../model/user.js'
let userModel = new user();
let pruzeModel = new pruze();
let loginModel = new login();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo: { uid:0},
    show_login: false,
    goodsList: { current_page: 1, data: [] }
  },
  /**
  * 进入详情页面
  */
  goDetail: function (e) {
    if (e.currentTarget.dataset.grade > this.data.userinfo.grade) {
      wx.showToast({ title: '您的等级不够，分享好友提升一下吧！', icon: 'none' })
    }
    wx.navigateTo({
      url: '/pages/index/detail/index?id=' + e.currentTarget.dataset.id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.userinfo.uid = options.uid
    this.setData({ userinfo: this.data.userinfo})
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
    //获取用户信息
    userModel.getByIdUserInfo({ id: this.data.userinfo.uid }, (res) => {
      this.setData({ userinfo: res.data, show_login: false })
    })
    pruzeModel.getList({page:1},(res) => {
      this.data.goodsList.current_page = res.current_page
      this.data.goodsList.data = this.data.goodsList.data.concat(res.data)
      this.setData({ goodsList: this.data.goodsList })
    })
  },
  /**
   * 助力
   */
  helpFriend:function(){
    userModel.help({id:this.data.userinfo.uid},(res) => {
      wx.switchTab({
        url: '/pages/index/index/index',
      })
    },(err)=>{
      setTimeout(function () {
        wx.switchTab({
          url: '/pages/index/index/index',
        })
      }, 1500)
    })
  }
})