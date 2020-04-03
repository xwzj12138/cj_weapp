// pages/article/detail/index.js
import article from '../../../model/article.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    apply_list: {current_page: 0,data: [],last_page: 1},
    data:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    article.detail({ id: options.id }, (res) => {
      this.setData({ data: res });
      if (res.cate_id==7){
        this.apply_list();
      }
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
   * 领取任务
   */
  getTask: function (e) {
    let param = { id: this.data.data.id };
    article.getTask(param, (res) => {
      this.data.data.task_detail.is_get_task = true;
      this.setData(this.data);
      wx.showToast({ title: '成功' });
    });
  },
  /**
   * 申请列表
   */
  apply_list:function(){
    if (this.data.apply_list.current_page >= this.data.apply_list.last_page) {
      return wx.stopPullDownRefresh()
    }
    let param = { id: this.data.data.id, page: this.data.apply_list.current_page + 1};
    article.applyList(param, (res) => {
      if (res.current_page > 1) res.data = [...this.data.apply_list.data, ...res.data];
      this.setData({ apply_list: res});
      wx.stopPullDownRefresh();
    });
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.apply_list();
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