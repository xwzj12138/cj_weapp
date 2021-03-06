// pages/index/index/index.js
import pruze from '../../../model/pruze.js';
import user from './../../../model/user.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    show_loading:false,
    userinfo:{},
    current_page:0,
    last_page: 1,
    data: []
  },
  /**
   * 进入详情页面
   */
  goDetail:function(e){
    if (e.currentTarget.dataset.grade>this.data.userinfo.grade){
      return wx.showToast({ title: '您的等级不够，分享好友提升一下吧！', icon: 'none' })
    }
    wx.navigateTo({url: '/pages/index/detail/index?id=' + e.currentTarget.dataset.id})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getuserinfo();
    this.getPruzeList();
  },
  /**
   * 授权登录成功回调，获取奖品列表
   */
  getuserinfo: function () {
    //获取用户信息
    user.getGlobalUserinfo((res) => {
      this.setData({ userinfo: res });
    });
  },
  /**
   * 获取奖品列表
   */
  getPruzeList:function(){
    if (this.data.current_page >= this.data.last_page) {
      //提示没有数据了
      wx.stopPullDownRefresh()
      return this.setData({ show_loading: true })
    }
    let param = { page: this.data.current_page+1}
    pruze.getList(param,(res) => {
      let now_time = (new Date()).getTime();
      res.data.forEach((e,index)=>{
        res.data[index].is_end = Date.parse(new Date(e.end_time.replace(/-/g, '/'))) < now_time;
      });
      if(res.current_page>1){
        res.data = [...this.data.data,...res.data];
      }
      res.show_loading = res.data.length == 0 ? true : false;
      this.setData(res);
      wx.stopPullDownRefresh();
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.data.current_page = 0;
    this.data.last_page = 1;
    this.getuserinfo();
    this.getPruzeList();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getPruzeList()
  },

  /**
   * 页面显示时触发
   */
  onShow: function () {
    if (getApp().globalData.is_refresh) {
      getApp().globalData.is_refresh = false;
      this.data.current_page = 0;
      this.data.last_page = 1;
      this.getPruzeList();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '我刚刚抽中了几个,现在等级不够帮我助力一下',
      path: '/pages/share/help/index?uid=' + this.data.userinfo.uid
    }
  }
})