// pages/my/my_apply_task/index.js
import article from '../../model/article.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    task_status: { 1:'已领取', 2:'已提交待审核', 3:'审核成功', 4:'审核失败'},
    current_page:0,
    last_page:1,
    data:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getApplyTaskList();
  },
  /**
   * 获取申请任务列表
   */
  getApplyTaskList:function(){
    if(this.data.current_page>=this.data.last_page){
      return wx.stopPullDownRefresh();
    }
    let param = {page:this.data.current_page+1}
    article.myApplyTaskList(param,(res)=>{
      if(res.current_page>1){
        res.data = [...this.data.data,...res.data];
      }
      this.setData(res);
      wx.stopPullDownRefresh();
    });
  },
  /**
   * 进入详情页
   */
  goDetail:function(e){
    wx.navigateTo({ url: '/pages/article/detail/index?id=' + e.currentTarget.dataset.id});
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.data.current_page = 0;
    this.data.last_page = 1;
    this.getApplyTaskList();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getApplyTaskList();
  }
})