// pages/my/my_article/list/index.js
import article from '../../../../model/article.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current_page: 0,
    data: [],
    last_page: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getArticleList();
  },
  /**
   * 获取文章列表
   */
  getArticleList: function () {
    if (this.data.current_page == this.data.last_page) {
      wx.stopPullDownRefresh()
      return wx.showToast({ title: '没有更多数据哦!', icon: 'none' });
    }
    let param = { page: this.data.current_page + 1 };
    article.myList(param, (res) => {
      this.data.current_page = res.current_page
      this.data.last_page = res.last_page
      this.data.data = this.data.data.concat(res.data)
      this.setData(this.data)
      wx.stopPullDownRefresh()
    });
  },
  /**
   * 进入详情页面
   */
  goDetail: function (e) {
    wx.navigateTo({
      url: '/pages/article/detail/index?id=' + this.data.data[e.currentTarget.dataset.index].id,
    })
  },
  /**
   * 顶置文章
   */
  topArticle: function (e) {
    let param = { id: e.currentTarget.dataset.id };
    article.top(param, (res) => {
      wx.showToast({title: '顶置成功'});
    });
  },
  /**
   * 进入发布页面
   */
  goArticle:function(){
    wx.switchTab({
      url: '/pages/publish/index/index'
    })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getArticleList();
  }
})