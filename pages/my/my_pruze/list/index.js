// pages/my/my_pruze/list/index.js
import {pruze} from '../../../../model/model.js'
let pruzeModel = new pruze();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current_page:0,
    data:[],
    last_page:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMyPublish();
  },
  /**
   * 获取我发起的抽奖列表
   */
  getMyPublish:function(){
    let param = { page: this.data.current_page + 1 }
    if (this.data.current_page == this.data.last_page) {
      //提示没有数据了
      return wx.stopPullDownRefresh()
    }
    pruzeModel.myPublish(param,(res)=>{
      this.data.current_page = res.current_page
      this.data.last_page = res.last_page
      this.data.data = this.data.data.concat(res.data)
      this.setData(this.data)
      wx.stopPullDownRefresh()
    })
  }
})