// pages/school/my_school/index.js
import school from '../../../model/school.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    audit_status_list: ['待审核,客服人员会尽快审核', '审核通过', '审核未通过点击重新创建'],
    show_loading: false,
    school_info: { id: 0, member_list: []},
    current_page: 0,
    last_page: 1,
    data: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMySchool();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  getMySchool: function () {
    school.mySchool((res) => {
      this.setData({ school_info: res });
      if (res && res.status == 1) {
        //用户已经创建门派并且审核通过，获取门派主题列表
        this.getThemeList();
      }
      wx.stopPullDownRefresh();
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  getThemeList: function () {
    if (this.data.current_page >= this.data.last_page) {
      wx.stopPullDownRefresh();
      return this.setData({ show_loading: true });
    }
    let param = { school_id: this.data.school_info.id, page: this.data.current_page + 1 }
    school.getTheme(param, (res) => {
      if (res.current_page > 1) {
        res.data = [...this.data.data, ...res.data];
      }
      this.setData(res);
      wx.stopPullDownRefresh();
    });
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.getMySchool();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getThemeList();
  },
  /**
   * 页面显示时触发
   */
  onShow:function(){
    if (getApp().globalData.is_refresh){
      getApp().globalData.is_refresh = false;
      this.getMySchool();
    }
  },
  /**
   * 进入主题详情页
   */
  goDetail:function(e){
    wx.navigateTo({
      url: e.currentTarget.dataset.page,
    });
  }
})