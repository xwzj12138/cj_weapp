// pages/publish/index/index.js
import article from '../../../model/article.js'
import user from '../../../model/user.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo:{},
    data:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取分类列表
    article.getCateList({},(res)=>{
      this.setData({ data: res, userinfo: getApp().globalData.userInfo})
    });
  },
  /**
   * 进入发布页面
   */
  goPublish:function(e){
    let url = '/pages/publish/pruze/index';
    if (e.currentTarget.dataset.id>0){
      url = '/pages/publish/article/index?cate_id=' + e.currentTarget.dataset.id;
    }
    return wx.navigateTo({url: url});
  },
  /**
   * 更新用户头像
   */
  updateUserInfo:function(e){
    let param = { nickname: e.detail.userInfo.nickName, avatar: e.detail.userInfo.avatarUrl, gender: e.detail.userInfo.gender };
    user.updateUserInfo(param, (res) => {
      this.data.userinfo.nickname = param.nickname
      this.data.userinfo.avatar = param.avatar;
      this.setData(this.data);
      wx.setStorage({key: 'token', data: this.data.userinfo});
      this.goPublish(e);
    })
  }
})