// pages/school/detail/index.js
import school from '../../../model/school.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show_loading:false,
    school_info: { id: 0, member_list:[]},
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
    wx.showLoading({mask: true });
    let param = {id:this.data.school_info.id};
    school.getDetail(param,(res)=>{
      wx.hideLoading();
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
    let param = { school_id:this.data.school_info.id, page: this.data.current_page + 1 };
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
   * 门派主题或帖子点击事件
   */
  goDetail: function(e) {
    wx.navigateTo({ url: e.currentTarget.dataset.page });
  },
  /**
   * 加入或者退出门派
   */
  joinSchool:function(){
    wx.showLoading({title: '提交交中',mask:true});
    let param = { id: this.data.school_info.id};
    school.joinSchool(param,(res)=>{
      this.data.school_info.join_status = this.data.school_info.join_status==0?1:0;
      this.setData({school_info:this.data.school_info})
      let title = this.data.school_info.join_status == 0 ? '成功退出门派' : '加入成功';
      wx.hideLoading();
      wx.showToast({ title: title});
    });
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
   * 进入发布主题页面
   */
  goPublishTheme:function(){
    if (this.data.school_info.join_status == 0) return wx.showToast({ title: '您还没有加入该门派!', icon: 'none' });
    wx.navigateTo({ url: '/pages/school/publish_theme/index?id=' + this.data.school_info.id});
  },
  /**
   * 页面显示时触发
   */
  onShow: function () {
    if (getApp().globalData.is_refresh) {
      getApp().globalData.is_refresh = false;
      this.data.current_page = 0;
      this.data.last_page = 1;
      this.getschoolThemeList();
    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    let userinfo = getApp().globalData.userInfo
    return {
      title: userinfo.nickname+'邀请您加入' + this.data.school_info.school_name,
      path: '/pages/school/detail/index?share_uid=' + userinfo.uid+'&id='+this.data.school_info.id
    }
  }
})