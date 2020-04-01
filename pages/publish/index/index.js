// pages/publish/index/index.js
import article from '../../../model/article.js'
import user from '../../../model/user.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo: { nickname: '', avatar:''},
    data:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取分类列表
    article.getCateList({},(res)=>{
      let param = { data: res};
      if (getApp().globalData.userInfo) param.userinfo = getApp().globalData.userInfo;
      this.setData(param);
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
    wx.showLoading({ title: '提交中', mask: true });
    user.updateUserInfo(param, (res) => {
      wx.hideLoading();
      this.setData({ userinfo:param})
      wx.setStorage({key: 'token', data: this.data.userinfo});
      this.goPublish(e);
    })
  }
})