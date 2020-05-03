// pages/school/member/index.js
import school from '../../../model/school.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    school_id:0,
    current_page: 0,
    data: [],
    last_page: 1,
    show_loading: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ school_id: options.id});
    this.getSchoolMember();
  },

  /**
   * 获取门派成员列表
   */
  getSchoolMember: function () {
    if (this.data.current_page >= this.data.last_page) {
      wx.stopPullDownRefresh();
      return this.setData({ show_loading: true });
    }
    let param = {id:this.data.school_id,page:this.data.current_page+1}
    school.getMember(param,(res)=>{
      if (res.current_page > 1) {
        res.data = [...this.data.data, ...res.data];
      }
      this.setData(res);
      wx.stopPullDownRefresh();
    });
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getSchoolMember();
  }
})