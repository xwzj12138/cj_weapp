// pages/article/list/index.js
import { article } from '../../../model/model.js'
let articleModel = new article();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banner_list:[],
    current_page:0,
    data:[],
    last_page:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getArticleList();
    this.getBannerList();
  },
  /**
   * 获取文章列表
   */
  getArticleList: function () {
    if(this.data.current_page==this.data.last_page){
      return wx.showToast({ title: '没有更多数据哦!', icon:'none' });
    }
    let param = {page:this.data.current_page+1};
    articleModel.getList(param,(res) => {
      this.setData(res)
    });
  },
  /**
   * 获取banner图列表
   */
  getBannerList:function(){
    articleModel.getBanners( (res) => {
      this.setData({ banner_list:res.data})
    });
  },
  /**
   * 点赞文章
   */
  likeArticle:function(e){
    let article = this.data.data[e.currentTarget.dataset.index];
    article.like_num++;
    let param = { id: article.id };
    articleModel.like(param, (res) => {
      this.data.data[e.currentTarget.dataset.index] = article
      this.setData(this.data)
      wx.showToast({title: '成功'})
    });
  },
  /**
   * 进入详情页面
   */
  goDetail:function(e){
    wx.navigateTo({
      url: '/pages/article/detail/index?id=' + this.data.data[e.currentTarget.dataset.index].id,
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})