// pages/index/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [
      { 
        url: 'https://test.xwzj88.cn/uploads/20190625/a295a07807b404fd656b3507fd87b270.jpeg', 
        title: '美甲指甲剪十件套 x 1', activity_time:'2019-06-25 15:06',id:1
      }, {
        url: 'https://test.xwzj88.cn/uploads/20190625/a295a07807b404fd656b3507fd87b270.jpeg',
        title: '美甲指甲剪十件套 x 1', activity_time: '2019-06-25 15:06', id: 2
      }, {
        url: 'https://test.xwzj88.cn/uploads/20190625/a295a07807b404fd656b3507fd87b270.jpeg',
        title: '美甲指甲剪十件套 x 1', activity_time: '2019-06-25 15:06', id: 3
      }, {
        url: 'https://test.xwzj88.cn/uploads/20190625/a295a07807b404fd656b3507fd87b270.jpeg',
        title: '美甲指甲剪十件套 x 1', activity_time: '2019-06-25 15:06', id: 4
      }
    ]
  },
  /**
   * 进入详情页面
   */
  goDetail:function(e){
    wx.navigateTo({
      url: '/pages/index/detail/index?id=' + e.currentTarget.dataset.id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})