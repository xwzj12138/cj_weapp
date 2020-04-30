// pages/school/my_join/index.js
import school from '../../../model/school.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navList: [{ "name": "我加入的" }, { "name": "江湖门派" }],
    nav_index:0,
    my_join_school: {current_page: 0,last_page: 1,data: []},
    school_list: { current_page: 0, last_page: 1, data: [] },
    show_loading:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMyJoinTheme();
  },
  /**
   * 获取我加入的门派列表
   */
  getMyJoinTheme:function(){
    if (this.data.my_join_school.current_page >= this.data.my_join_school.last_page) {
      wx.stopPullDownRefresh();
      return this.setData({ show_loading: true });
    }
    let param = { page: this.data.my_join_school.current_page + 1 };
    school.myJoinSchool(param, (res) => {
      if (res.current_page > 1) {
        res.data = [...this.data.my_join_school.data, ...res.data];
      }
      this.setData({ my_join_school: res});
      wx.stopPullDownRefresh();
    });
  },
  /**
   * 搜索门派列表
   */
  searchSchool:function(){
    if (this.data.school_list.current_page >= this.data.school_list.last_page) {
      wx.stopPullDownRefresh();
      return this.setData({ show_loading: true });
    }
    let param = { page: this.data.school_list.current_page + 1 };
    school.search(param, (res) => {
      if (res.current_page > 1) {
        res.data = [...this.data.school_list.data, ...res.data];
      }
      this.setData({ school_list: res });
      wx.stopPullDownRefresh();
    });
  },
  /**
   * 选择nav事件
   */
  tabSelect: function (e) {
    this.setData({ nav_index: e.detail.index})
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    if(this.data.nav_index==0){
      this.data.my_join_school.current_page = 0;
      this.data.my_join_school.last_page = 1;
      return this.getMyJoinTheme();
    }
    this.data.school_list.current_page = 0;
    this.data.school_list.last_page = 1;
    return this.searchSchool();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.nav_index == 0) {
      return this.getMyJoinTheme();
    }
    return this.searchSchool();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})