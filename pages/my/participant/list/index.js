// pages/my/participant/index.js
import user from '../../../../model/user.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    status_list: ['待开奖', '未中奖', '待领取', '已过期', '待发货','已发货','中奖'],
    type:1,
    current_page:0,
    last_page:1,
    data: []
  },
  /**
   * 进入详情页面。默认进入奖品详情页面，已领取的进入物流信息页面
   */
  goDetail:function(e){
    let page = '/pages/index/detail/index?id=' + e.currentTarget.dataset.pruze_id;
    if (e.currentTarget.dataset.status>2){
      page = '/pages/my/participant/detail/index?id=' + e.currentTarget.dataset.id;
    }
    wx.navigateTo({
      url: page
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取参与记录
    this.getParticipant();
  },
  /**
   * 获取参与纪录数据
   */
  getParticipant:function(){
    if (this.data.current_page >= this.data.last_page) {
      return wx.stopPullDownRefresh();
    }
    let param = { type: this.data.type,page:this.data.current_page+1}
    //最后一页时直接不请求数据
    if (this.data.current_page < this.data.last_page) {
      user.participant(param, (res) => {
        if(res.current_page>1){
          res.data = this.data.data.concat(res.data);
        }
        this.setData(res)
        wx.stopPullDownRefresh();
      })
    }
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.setData({ current_page: 0, last_page: 1 });
    this.getParticipant();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getParticipant()
  },
  /**
   * 页面显示触发
   */
  onShow:function(){
    if (getApp().globalData.is_refresh){
      getApp().globalData.is_refresh = false;
      this.onPullDownRefresh();
    }
  }
})