// pages/my/my_article/task_audit/index.js
import article from '../../../model/article.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    task_id:0,
    button_url:'/pages/article/detail/index?id=',
    show_submit:false,
    show_info: { index: 0, submit_images:[],status:0},
    current_page: 0, data: [], last_page: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ task_id:options.id});
    this.getApplyList();
  },

  /**
   * 申请列表
   */
  getApplyList: function () {
    if (this.data.current_page >= this.data.last_page) {
      return wx.stopPullDownRefresh()
    }
    let param = { id: this.data.task_id, page: this.data.current_page + 1 };
    article.applyList(param, (res) => {
      if (res.current_page > 1) res.data = [...this.data.data, ...res.data];
      this.setData(res);
      wx.stopPullDownRefresh();
    });
  },
  /**
   * 审核任务
   */
  auditTask:function(e){
    if (e.currentTarget.dataset.index!=undefined){
      this.data.show_info.index = e.currentTarget.dataset.index;
      this.data.show_info.status = this.data.data[e.currentTarget.dataset.index].status;
      this.data.show_info.submit_images = this.data.data[e.currentTarget.dataset.index].task_evidences;
      return this.setData({ show_submit: true, show_info: this.data.show_info });
    }
    let param = { id: this.data.data[this.data.show_info.index].id, status: e.currentTarget.dataset.status };
    article.auditTask(param, (res) => {
      this.data.data[this.data.show_info.index].status = e.currentTarget.dataset.status;
      this.setData({ data: this.data.data, show_submit:false});
    });
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.data.current_page = 0;
    this.data.last_page = 1;
    this.getApplyList();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getApplyList();
  }
})