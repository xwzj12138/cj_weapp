// pages/publish/article/index.js
import { config } from '../../../utils/config.js'
import article from '../../../model/article.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    formData:{token:''},
    upload_api: '',
    data: { cate_id: 0, images: [], title: '', tel: '', latitude: 0, longitude:0}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.data.cate_id = options.cate_id;
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
  upload:function(e){
    if (e.detail.click_type == 'del') {
      this.data.data.images.splice(e.detail.index, 1);
      return this.setData(this.data);
    }
    this.data.data.images.push(e.detail.uploadResult.data.longUrl)
    this.setData(this.data)
  },
  /**
   * 提交数据
   */
  handleClick:function(){
    if (this.data.data.title == '') return wx.showToast({ title: '请输入标题', icon: 'none' });
    wx.getLocation({
      success: (res)=> {
        this.data.data.latitude = res.latitude
        this.data.data.longitude = res.longitude
        article.publish(this.data.data, (res) => {
          wx.showToast({title: '提交成功，等待审核'});
          setTimeout((res)=>{
            wx.switchTab({
              url: '/pages/article/list/index',
            });
          },1100);
        });
      }
    })
  }
})