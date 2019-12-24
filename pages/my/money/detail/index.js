// pages/my/money/detail/index.js
import user from '../../../../model/user.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type_list: ['', '提现', '奖品返利', '退款','购买'],
    current_page: 0, 
    last_page: 1, 
    data: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getBills();
  },
  /**
   * 获取账单列表
   */
  getBills:function(){
    let param = { page: this.data.current_page + 1 }
    if (this.data.current_page == this.data.last_page) {
      return wx.stopPullDownRefresh();
    }
    user.getBills(param, (res) => {
      res.data = this.data.data.concat(res.data);
      this.setData(res);
      wx.stopPullDownRefresh();
    });
  }
})