// my_pages/school/apply/index.js
import { config } from '../../../utils/config.js'
import school from '../../../model/school.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    formData: { token: '' },
    upload_api: '',
    form: {
      id: 0, school_name: '', cover_image: '', intro: '', code: '', iv: '', encryptedData:''
    }
  },
  /**
   * 输入框值发生变化时的事件,电脑端暂时有问题,手机端没有问题
   */
  inputChange: function (e) {
    this.data.form[e.detail.name] = e.detail.value;
    this.setData(this.data);
  },
  /**
   * 上传封面图
   */
  uploadImage: function (e) {
    this.data.form.cover_image = e.detail.uploadResult.data.longUrl;
    this.setData(this.data);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.id) {
      this.data.form.id = options.id;
      this.data.form.school_name = options.school_name;
      this.data.form.cover_image = options.cover_image;
      this.data.form.intro = options.intro;
    }
    this.data.formData.token = wx.getStorageSync('token').token;
    this.data.upload_api = config.restUrl + 'index/v1/upload';
    this.setData(this.data)
  },
  /**
   * 获取用户手机号
   */
  getPhone:function(e){
    wx.login({
      success: res =>{
        this.data.form.code = res.code;
        this.data.form.iv = e.detail.iv;
        this.data.form.encryptedData = e.detail.encryptedData;
        this.submit();
      }
    });
  },
  /**
   * 添加品牌
   */
  submit: function () {
    if (this.data.form.school_name == '') return wx.showToast({ title: '请输入门派名', icon: 'none' });
    if (this.data.form.cover_image == '') return wx.showToast({ title: '请上传门派封面图', icon: 'none' });
    if (this.data.form.intro == '') return wx.showToast({ title: '请输入门派简介', icon: 'none' });
    if (this.data.form.id > 0) {
      return school.apply(this.data.form, (res) => {
        getApp().globalData.is_refresh = true;
        wx.navigateBack({});
      });
    }
    school.apply(this.data.form, (res) => {
      getApp().globalData.is_refresh = true;
      wx.navigateBack({});
    });
  }
})