// pages/my/my_article/list/index.js
import article from '../../../../model/article.js'
import pay from '../../../../model/pay.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current_page: 0,
    data: [],
    last_page: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getArticleList();
  },
  /**
   * 获取文章列表
   */
  getArticleList: function () {
    if (this.data.current_page == this.data.last_page) {
      wx.stopPullDownRefresh()
      return wx.showToast({ title: '没有更多数据哦!', icon: 'none' });
    }
    let param = { page: this.data.current_page + 1 };
    article.myList(param, (res) => {
      res.data = this.data.data.concat(res.data);
      this.setData(res);
      wx.stopPullDownRefresh()
    });
  },
  /**
   * 进入详情页面
   */
  goDetail: function (e) {
    wx.navigateTo({
      url: '/pages/article/detail/index?id=' + e.currentTarget.dataset.id,
    });
  },
  /**
   * 进入任务审核页面
   */
  goTaskAudit:function(e){
    wx.navigateTo({
      url: '/pages/my/my_article/task_audit/index?id=' + e.currentTarget.dataset.id,
    })
  },
  /**
   * 支付任务金额
   */
  payTaskMoney:function(e){
    wx.showLoading({ title: '提交中', mask: true });
    let param = { id: e.currentTarget.dataset.id };
    article.payTaskMoney(param, (res) => {
      wx.hideLoading();
      res.success = (result) => {
        this.data.data[e.currentTarget.dataset.index].status = 1;
        this.setData(this.data)
      }
      res.fail = (result) => {
        let param = { id: res.pay_id };
        pay.cancel(param);
        wx.showToast({ title: '支付失败', icon: 'none' });
      }
      wx.requestPayment(res);
    });
  },
  /**
   * 顶置文章
   */
  topArticle: function (e) {
    wx.showLoading({ title: '提交中', mask: true });
    let param = { id: e.currentTarget.dataset.id };
    article.top(param, (res) => {
      wx.hideLoading();
      res.success = (result) => {
        let article = this.data.data[e.currentTarget.dataset.index];
        article.top_time = Date.parse(new Date());
        //删除原来的文章
        this.data.data.splice(e.currentTarget.dataset.index,1);
        //将顶置的文章添加到首位
        this.data.data.unshift(article);
        this.setData(this.data)
        wx.showToast({ title: '顶置成功' });
      }
      res.fail = (result) => {
        let param = { id: res.pay_id };
        pay.cancel(param);
        wx.showToast({ title: '支付失败', icon: 'none' });
      }
      wx.requestPayment(res);
    });
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getArticleList();
  },
  /**
   * 删除文章
   */
  deleteArticle(e){
    wx.showModal({
      title: '提示',
      content: '删除后不可恢复，是否确定删除?',
      success: (res) => {
        if (res.confirm) {
          let param = { id: this.data.data[e.currentTarget.dataset.index].id };
          article.del(param, (res) => {
            this.data.data.splice(e.currentTarget.dataset.index, 1);
            this.setData({ data: this.data.data });
          });
        }
      }
    });
  }
})