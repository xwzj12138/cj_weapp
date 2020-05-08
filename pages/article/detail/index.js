// pages/article/detail/index.js
import article from '../../../model/article.js';
import {config} from '../../../utils/config.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show_submit:false,
    upload_api:'',
    submit_images:[],
    upload_formData: { token: ''},
    task_status: ['待领取', '待提交截图', '待审核', '审核成功','审核失败'],
    apply_list: {current_page: 0,data: [],last_page: 1},
    data:null,
    ad_id:'adunit-c13acccb9263a491'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.upload_formData.token = wx.getStorageSync('token').token;
    this.data.upload_api = config.restUrl + 'index/v1/upload';
    article.detail({ id: options.id }, (res) => {
      this.setData({ data: res });
      if (res.cate_id==7){
        this.apply_list();
      }
    });
    this.setData(this.data)
  },
  /**
   * 点赞文章
   */
  likeArticle: function (e) {
    let param = { id: this.data.data.id };
    article.like(param, (res) => {
      this.data.data.like_num++
      this.setData(this.data);
      wx.showToast({ title: '成功' });
    });
  },
  /**
   * 显示图片
   */
  showImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.dataset.src,
      urls: this.data.data.images
    })
  },
  /**
   * 联系用户
   */
  contact: function (e) {
    wx.makePhoneCall({
      phoneNumber: this.data.data.tel,
    })
  },
  /**
   * 领取任务
   */
  getTask: function (e) {
    let param = { id: this.data.data.id };
    article.getTask(param, (res) => {
      this.data.apply_list.current_page = 0;
      this.data.apply_list.last_page = 1;
      this.data.data.get_task_status = 1;
      this.setData(this.data);
      wx.showToast({ title: '成功' });
      this.apply_list();
    });
  },
  /**
   * 申请列表
   */
  apply_list:function(){
    if (this.data.apply_list.current_page >= this.data.apply_list.last_page) {
      return wx.stopPullDownRefresh()
    }
    let param = { id: this.data.data.id, page: this.data.apply_list.current_page + 1};
    article.applyList(param, (res) => {
      if (res.current_page > 1) res.data = [...this.data.apply_list.data, ...res.data];
      this.setData({ apply_list: res});
      wx.stopPullDownRefresh();
    });
  },
  /**
   * 显示或隐藏提交截图页面
   */
  showSubmit:function(){
    this.setData({ show_submit:!this.data.show_submit});
  },
  /**
   * 上传截图
   */
  upload:function(e){
    if (e.detail.click_type == 'del') {
      this.data.submit_images.splice(e.detail.index, 1);
      return this.setData({ submit_images: this.data.submit_images });
    }
    this.data.submit_images.push(e.detail.uploadResult.data.longUrl);
    this.setData({ submit_images: this.data.submit_images});
  },
  /**
   * 提交或取消提交
   */
  submitImage:function(e){
    if (this.data.submit_images.length == 0) return wx.showToast({ title: '至少上传一张截图', icon: 'none' }); 
    let param = { id: this.data.data.id,task_evidences:this.data.submit_images}
    article.submitTaskScreenshot(param,(res)=>{
      this.data.data.get_task_status = 2;
      this.setData({ show_submit: false, data:this.data.data});
    });
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.apply_list();
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: this.data.data.title,
      path: '/pages/article/detail/index?id=' + this.data.data.id+'&share_uid=' + getApp().globalData.userInfo.uid
    }
  }
})