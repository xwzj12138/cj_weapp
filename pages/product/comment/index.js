// pages/product/comment/index.js
import product from '../../../model/product.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    product_id:0,
    current_page:0,
    data:[],
    last_page:1,
    total:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.product_id = options.id;
    this.setData(this.data);
    this.getProductComment();
  },

  /**
   * 获取评论列表
   */
  getProductComment:function(){
    if(this.data.current_page>=this.data.last_page) return ;
    let param = { id: this.data.product_id, page: this.data.current_page + 1};
    product.commentList(param,(res)=>{
      res.data = this.data.data.concat(res.data)
      this.setData(res)
    });
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getProductComment();
  }
})