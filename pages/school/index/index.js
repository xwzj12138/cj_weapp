// pages/school/index.js
import school from '../../../model/school.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    school_list: { current_page: 0, last_page: 1, total:0,data:[]},
    navList: [{ "name": "热门讨论主题" }],
    current_page: 0,
    data: [],
    last_page: 1,
    show_loading: false,
    ad_number:8
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getJoinSchoolList();
    this.getHotThemeList();
  },
  /**
   * 获取加入的门派列表
   */
  getJoinSchoolList: function () {
    wx.showLoading({ mask: true });
    school.myJoinSchool({ page: 1 }, (res) => {
      res.data.unshift({ id: 0, cover_image: '../../../static/tabbar/select_school.png', school_name:'江湖'})
      this.setData({ school_list: res });
      wx.hideLoading();
    });
  },
  /**
   * 获取热门主题列表
   */
  getHotThemeList: function () {
    if (this.data.current_page >= this.data.last_page) {
      wx.stopPullDownRefresh();
      return this.setData({ show_loading: true });
    }
    let param = { page: this.data.current_page + 1 };
    school.getTheme(param, (res) => {
      if (res.current_page > 1) {
        res.data = [...this.data.data, ...res.data];
      }
      if (res.current_page == 1 && res.data.length == 0) res.show_loading = true;
      this.setData(res);
      wx.stopPullDownRefresh();
    });
  },
  /**
   * 点赞门派主题
   */
  likeSchoolTheme: function (e) {
    let param = { id: this.data.data[e.currentTarget.dataset.index].id };
    school.likeTheme(param, (res) => {
      this.data.data[e.currentTarget.dataset.index].like_num++;
      this.setData(this.data);
      wx.showToast({ title: '成功' })
    });
  },
  /**
   * 门派点击事件
   */
  goDetail:function(e){
    wx.navigateTo({url: e.currentTarget.dataset.page});
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.data.current_page = 0;
    this.data.last_page = 1;
    this.getJoinSchoolList();
    this.getHotThemeList();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getHotThemeList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    let userinfo = getApp().globalData.userInfo
    return {
      title: userinfo.nickname + '邀请您创建门派',
      path: '/pages/school/index/index?share_uid=' + userinfo.uid
    }
  }
})