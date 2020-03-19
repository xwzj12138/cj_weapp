// pages/article/detail/index.js
import article from '../../../model/article.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    article.detail({ id: options.id }, (res) => {
      this.setData({ data: res });
    });
  },
  /**
   * 点赞文章
   */
  likeArticle: function (e) {
    let param = { id: this.data.data.id };
    article.like(param, (res) => {
      this.data.data.like_num++
      this.setData(this.data);
      wx.showToast({ title: '成功' });
    });
  },
  /**
   * 显示图片
   */
  showImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.dataset.src,
      urls: this.data.data.images
    })
  },
  /**
   * 联系用户
   */
  contact: function (e) {
    wx.makePhoneCall({
      phoneNumber: this.data.data.tel,
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: this.data.data.title,
      path: '/pages/article/list/index?share_uid=' + getApp().globalData.userInfo.uid
    }
  }
})