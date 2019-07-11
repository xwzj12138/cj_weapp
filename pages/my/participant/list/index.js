// pages/my/participant/index.js
import { user } from '../../../../model/model.js'
let userModel = new user();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    status_list: ['待开奖', '未中奖', '待领取', '已过期', '待发货','已发货'],
    type:1,
    current_page:0,
    last_page:1,
    data: []
  },
  /**
   * 进入详情页面
   */
  goDetail:function(e){
    let page = '/pages/my/participant/detail/index?id=' + e.currentTarget.dataset.id;
    if (e.currentTarget.dataset.status==2){
      page = '/pages/my/set_address/index?id=' + e.currentTarget.dataset.pruze_id;
    }
    wx.navigateTo({
      url: page
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({type:options.type})
    //获取参与记录
    this.getParticipant()
  },
  /**
   * 获取参与纪录数据
   */
  getParticipant:function(){
    let param = { type: this.data.type,page:this.data.current_page+1}
    //最后一页时直接不请求数据
    if (this.data.current_page < this.data.last_page) {
      userModel.participant(param, (res) => {
        this.data.current_page = res.current_page
        this.data.last_page = res.last_page
        this.data.data = this.data.data.concat(res.data)
        this.setData(this.data)
      })
    }
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getParticipant()
  }
})