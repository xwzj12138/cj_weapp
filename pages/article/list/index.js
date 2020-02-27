// pages/article/list/index.js
import article from '../../../model/article.js';
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
    this.getBannerList();
    this.getArticleList();
  },
  /**
   * 获取文章列表
   */
  getArticleList: function () {
    if(this.data.current_page>=this.data.last_page){
      wx.stopPullDownRefresh()
      return this.setData({ show_loading:true});
    }
    let param = {page:this.data.current_page+1,cate_id:this.data.cate_id};
    article.getList(param,(res) => {
      if (res.data.length == 0) return this.setData({ show_loading: true });
      if (res.current_page > 1) res.data = [...this.data.data,...res.data];
      this.setData(res);
      wx.stopPullDownRefresh();
    });
  },
  /**
   * 获取banner图列表
   */
  getBannerList:function(){
    wx.showLoading({title: '数据加载中'});
    article.getBanners( (res) => {
      this.setData(res);
      wx.hideLoading();
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
    let param = { id: this.data.data[e.currentTarget.dataset.index].id };
    article.like(param, (res) => {
      this.data.data[e.currentTarget.dataset.index].like_num++;
      this.setData(this.data);
      wx.showToast({title: '成功'})
    });
  },
  /**
   * 浏览文章
   */
  browseArticle:function(index){
    let article_data = this.data.data[index];
    article_data.browse_num++;
    let param = { id: article_data.id };
    article.browse(param, (res) => {
      this.data.data[index] = article_data
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
    wx.navigateTo({url: e.currentTarget.dataset.detail_url});
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
    wx.makePhoneCall({
      phoneNumber: this.data.data[e.currentTarget.dataset.index].tel,
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.setData({ current_page:0,last_page:1});
    this.getHomeInfo();
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