// pages/school/detail/index.js
import school from '../../../model/school.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show_loading:false,
    school_info:{id:0},
    current_page:0,
    last_page:1,
    data:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.school_info.id = options.id;
    this.getSchoolDetail();
    this.getschoolThemeList();
  },
  /**
   * 获取门派详情
   */
  getSchoolDetail:function(){
    let param = {id:this.data.school_info.id};
    school.getDetail(param,(res)=>{
      this.setData({ school_info:res});
    });
  },
  /**
   * 获取主题列表
   */
  getschoolThemeList: function () {
    if (this.data.current_page >= this.data.last_page) {
      wx.stopPullDownRefresh();
      return this.setData({ show_loading: true });
    }
    let param = { page: this.data.current_page + 1 };
    school.getTheme(param, (res) => {
      if (res.current_page > 1) {
        res.data = [...this.data.data, ...res.data];
      }
      this.setData(res);
      wx.stopPullDownRefresh();
    });
  },
  /**
   * 点赞门派主题
   */
  likeSchoolTheme:function(e){
    let param = { id: this.data.data[e.currentTarget.dataset.index].id};
    school.likeTheme(param,(res)=>{
      this.data.data[e.currentTarget.dataset.index].like_num++;
      this.setData(this.data);
      wx.showToast({ title: '成功' })
    });
  },
  /**
   * 门派点击事件
   */
  goDetail: function(e) {
    wx.navigateTo({ url: e.currentTarget.dataset.page });
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.data.current_page = 0;
    this.data.last_page = 1;
    this.getSchoolDetail();
    this.getschoolThemeList();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getschoolThemeList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})