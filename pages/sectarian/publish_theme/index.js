// pages/sectarian/publish_theme/index.js
import {config} from '../../../utils/config.js';
import sectarian from '../../../model/sectarian.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    formData: { token: '' },
    upload_api: '',
    data: { sectarian_id: 0, images: [], title: '', description: ''}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.data.sectarian_id = options.id;
    this.data.formData.token = wx.getStorageSync('token').token;
    this.data.upload_api = config.restUrl + 'index/v1/upload';
    this.setData(this.data)
  },

  /**
   * 输入框值发生变化时的事件,电脑端暂时有问题,手机端没有问题
   */
  inputChange: function (e) {
    this.data.data[e.detail.name] = e.detail.value;
    this.setData(this.data)
  },

  /**
   * 上传图片相关
   */
  upload: function (e) {
    if (e.detail.click_type == 'del') {
      this.data.data.images.splice(e.detail.index, 1);
      return this.setData(this.data);
    }
    this.data.data.images.push(e.detail.uploadResult.data.longUrl)
    this.setData(this.data)
  },

  /**
   * 提交
   */
  submit: function () {
    if (this.data.data.title == '') return wx.showToast({ title: '请输入标题', icon: 'none' });
    if (this.data.data.images.length==0) return wx.showToast({ title: '至少上传一张图片', icon: 'none' });
    wx.showLoading({ title: '提交中', mask: true });
    sectarian.publishTheme(this.data.data, (res) => {
      wx.hideLoading();
      getApp().globalData.is_refresh = true;
      wx.navigateBack({});
    });
  }
})