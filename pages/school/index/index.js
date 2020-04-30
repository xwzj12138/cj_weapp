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
    show_loading: false
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
    school.myJoinSchool({ page: 1 }, (res) => {
      this.setData({ school_list: res });
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
      // for(let i=0;i<10;i++){
      //   res.data.push(res.data[0]);
      // }
      this.setData(res);
      wx.stopPullDownRefresh();
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

  }
})