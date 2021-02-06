// pages/sectarian/my_join/index.js
import sectarian from '../../../model/sectarian.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyword:'',
    navList: [{ "name": "我加入的" }, { "name": "江湖门派" }],
    nav_index:0,
    my_join_sectarian: {current_page: 0,last_page: 1,data: []},
    sectarian_list: { current_page: 0, last_page: 1, data: [] },
    show_loading:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.index){
      this.setData({ nav_index: options.index*1 });
      this.searchSectarian();
    }else{
      this.getMyJoinTheme();
    }
  },
  /**
   * 获取我加入的门派列表
   */
  getMyJoinTheme:function(){
    if (this.data.my_join_sectarian.current_page >= this.data.my_join_sectarian.last_page) {
      wx.stopPullDownRefresh();
      return this.setData({ show_loading: true });
    }
    let param = { page: this.data.my_join_sectarian.current_page + 1,keyword:this.data.keyword };
    sectarian.myJoinSectarian(param, (res) => {
      if (res.current_page > 1) {
        res.data = [...this.data.my_join_sectarian.data, ...res.data];
      }
      this.setData({ my_join_sectarian: res});
      wx.stopPullDownRefresh();
    });
  },
  /**
   * 搜索门派列表
   */
  searchSectarian:function(){
    if (this.data.sectarian_list.current_page >= this.data.sectarian_list.last_page) {
      wx.stopPullDownRefresh();
      return this.setData({ show_loading: true });
    }
    let param = { page: this.data.sectarian_list.current_page + 1, keyword: this.data.keyword };
    sectarian.search(param, (res) => {
      if (res.current_page > 1) {
        res.data = [...this.data.sectarian_list.data, ...res.data];
      }
      this.setData({ sectarian_list: res });
      wx.stopPullDownRefresh();
    });
  },
  /**
   * 选择nav事件
   */
  tabSelect: function (e) {
    this.setData({ nav_index: e.detail.index,keyword:''})
    this.onLoad(e.detail)
  },
  /**
   * 搜索门派
   */
  onConfirm:function(e){
    this.data.keyword = e.detail.value;
    this.onPullDownRefresh();
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    if(this.data.nav_index==0){
      this.data.my_join_sectarian.current_page = 0;
      this.data.my_join_sectarian.last_page = 1;
      return this.getMyJoinTheme();
    }
    this.data.sectarian_list.current_page = 0;
    this.data.sectarian_list.last_page = 1;
    return this.searchSectarian();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.nav_index == 0) {
      return this.getMyJoinTheme();
    }
    return this.searchSectarian();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    let userinfo = getApp().globalData.userInfo
    return {
      title: userinfo.nickname + '邀请您创建门派',
      path: '/pages/sectarian/index/index?share_uid=' + userinfo.uid
    }
  }
})