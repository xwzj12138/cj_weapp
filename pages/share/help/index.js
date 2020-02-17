// pages/share/help/index.js
import pruze from '../../../model/pruze.js';
import user from '../../../model/user.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    share_user: { uid: 0},
    userinfo: {},
    goodsList: { current_page: 1, data: [] }
  },
  /**
   * 进入首页
   */
  goHome:function(){
    wx.switchTab({
      url: '/pages/index/index/index'
    });
  },
  /**
  * 进入详情页面
  */
  goDetail: function (e) {
    if (e.currentTarget.dataset.grade > this.data.userinfo.grade) {
      wx.showToast({ title: '您的等级不够，分享好友提升一下吧！', icon: 'none' });
    }
    wx.navigateTo({
      url: '/pages/index/detail/index?id=' + e.currentTarget.dataset.id
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.share_user.uid = options.share_uid;
    this.setData({ share_user: this.data.share_user});
    this.getuserinfo();
  },
  /**
  * 授权登录成功回调，获取奖品列表
  */
  getuserinfo: function () {
    wx.showLoading({title: '数据加载中'});
    //获取用户信息
    user.getByIdUserInfo({ id: this.data.share_user.uid }, (res) => {
      this.setData({ userinfo: res.user, share_user: res.share_user });
      wx.hideLoading();
    });
    pruze.getList({page:1},(res) => {
      if (res.current_page > 1) res.data = [...this.data.goodsList.data, ...res.data];
      this.setData({ goodsList: res });
    });
  },
  /**
   * 助力
   */
  helpFriend:function(){
    user.help({ id: this.data.share_user.uid},(res) => {
      wx.switchTab({
        url: '/pages/index/index/index'
      })
    },(err)=>{
      setTimeout(function () {
        wx.switchTab({
          url: '/pages/index/index/index'
        });
      }, 1500)
    })
  }
})