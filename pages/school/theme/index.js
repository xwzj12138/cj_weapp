// pages/school/theme/index.js
import school from '../../../model/school.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    comment_content:'',
    theme_info:{id:0},
    current_page: 0,
    data: [],
    last_page: 1,
    show_loading: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.theme_info.id = options.id;
    this.getThemeDetail();
    this.getCommentList();
  },

  /**
   * 获取主题详情
   */
  getThemeDetail: function () {
    let param = {id:this.data.theme_info.id};
    school.themeDetail(param,(res)=>{
      this.setData({ theme_info:res});
    });
  },
  /**
   * 获取评论列表
   */
  getCommentList:function(){
    if (this.data.current_page >= this.data.last_page) {
      wx.stopPullDownRefresh();
      return this.setData({ show_loading: true });
    }
    let param = { id: this.data.theme_info.id,page:this.data.current_page+1};
    school.themeCommentList(param,(res)=>{
      if (res.current_page > 1) {
        res.data = [...this.data.data, ...res.data];
      }
      this.setData(res);
      wx.stopPullDownRefresh();
    });
  },
  /**
   * 设置评论内容
   */
  handleInputChange:function(e){
    this.setData({ comment_content: e.detail.value});
  },
  /**
   * 评论你
   */
  commentTheme:function(){
    if (this.data.comment_content.length==0) return wx.showToast({title: '内容不能为空',icon:'none'});
    let param = { school_theme_id: this.data.theme_info.id, content:this.data.comment_content};
    school.commentTheme(param,(res)=>{
      this.data.data.unshift(res)
      this.setData({comment_content:'',data:this.data.data})
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: this.data.theme_info.title,
      path: '/pages/school/detail/index?share_uid=' + getApp().globalData.userInfo.uid + '&id=' + this.data.theme_info.id
    }
  }
})