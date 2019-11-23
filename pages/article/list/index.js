// pages/article/list/index.js
import { article, login } from '../../../model/model.js'
import { user } from '../../../model/user.js'
let loginModel = new login();
let articleModel = new article();
let userModel = new user();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show_loading:false,
    banner_list:[],
    cate_list:[],
    cate_id:0,
    current_page:0,
    data:[],
    last_page:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    loginModel.isLogin((res)=>{
      this.getHomeInfo();
    });
  },
  /**
   * 授权登录成功回调，文章列表及banner图
   */
  getHomeInfo: function () {
    this.getArticleList();
    this.getBannerList();
  },
  /**
   * 获取文章列表
   */
  getArticleList: function () {
    if(this.data.current_page==this.data.last_page){
      wx.stopPullDownRefresh()
      return this.setData({ show_loading:true});
    }
    let param = {page:this.data.current_page+1,cate_id:this.data.cate_id};
    articleModel.getList(param,(res) => {
      if (res.data.length == 0) return this.setData({ show_loading: true });
      res.data = this.data.data.concat(res.data)
      this.setData(res)
      wx.stopPullDownRefresh()
    });
  },
  /**
   * 获取banner图列表
   */
  getBannerList:function(){
    articleModel.getBanners( (res) => {
      this.setData(res.data)
    });
  },
  /**
   * 选择分类
   */
  select_cate:function(e){
    if (e.currentTarget.dataset.id == this.data.cate_id) return ;
    this.setData({cate_id: e.currentTarget.dataset.id, current_page: 0,data: [],last_page: 1})
    this.getArticleList();
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
   * 浏览文章
   */
  browseArticle:function(index){
    let article = this.data.data[index];
    article.browse_num++;
    let param = { id: article.id };
    articleModel.browse(param, (res) => {
      this.data.data[index] = article
      this.setData(this.data)
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
   * 进入banner详情页
   */
  goBannerDetail:function(e){
    wx.navigateTo({
      url: e.currentTarget.dataset.detail_url,
    })
  },
  /**
   * 显示图片
   */
  showImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.dataset.src,
      urls: this.data.data[e.currentTarget.dataset.index].images,
      success: (res) => {
        //记录浏览量
        this.browseArticle(e.currentTarget.dataset.index)
      }
    })
  },
  /**
   * 联系用户
   */
  contact:function(e){
    console.log(e.currentTarget.dataset.index)
    wx.makePhoneCall({
      phoneNumber: this.data.data[e.currentTarget.dataset.index].tel,
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.setData({ data: [], current_page:0,last_page:1})
    this.getArticleList();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getArticleList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})