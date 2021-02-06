// pages/sectarian/detail/index.js
import sectarian from '../../../model/sectarian.js'
import { config } from '../../../utils/config.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showShare:false,
    showShareImage:false,
    order_type:1,
    navList: [{ "name": "最新主题", order_type: 1 }, { "name": "热门主题", order_type:2}],
    show_loading:false,
    sectarian_info: { id: 0, member_list: [], join_status:0},
    current_page:0,
    last_page:1,
    data:[],
    ad_number:8
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.sectarian_info.id = options.id;
    this.getSectarianDetail(options.scene);
    this.getSectarianThemeList(options.scene);
  },
  /**
   * 获取门派详情
   */
  getSectarianDetail: function (qr_code=null){
    wx.showLoading({mask: true });
    let param = {id:this.data.sectarian_info.id};
    if (qr_code) param.qr_code = qr_code;
    sectarian.getDetail(param,(res)=>{
      wx.hideLoading();
      this.setData({ sectarian_info:res});
    });
  },
  /**
   * 获取主题列表
   */
  getSectarianThemeList: function (qr_code=null) {
    if (this.data.current_page >= this.data.last_page) {
      wx.stopPullDownRefresh();
      return this.setData({ show_loading: true });
    }
    let param = { sectarian_id: this.data.sectarian_info.id, page: this.data.current_page + 1, order_type:this.data.order_type };
    if (qr_code) param.qr_code = qr_code;
    sectarian.getTheme(param, (res) => {
      if (res.current_page > 1) {
        res.data = [...this.data.data, ...res.data];
      }
      this.setData(res);
      wx.stopPullDownRefresh();
    });
  },
  /**
   * 点赞门派主题
   */
  likeSectarianTheme:function(e){
    let param = { id: this.data.data[e.currentTarget.dataset.index].id};
    sectarian.likeTheme(param,(res)=>{
      this.data.data[e.currentTarget.dataset.index].like_num++;
      this.setData(this.data);
      wx.showToast({ title: '成功' })
    });
  },
  /**
   * 选择主题类型
   */
  tabSelect:function(e){
    this.data.order_type = e.detail.data.order_type;
    this.data.current_page = 0;
    this.data.last_page = 1;
    this.getSectarianThemeList();
  },
  /**
   * 门派主题或帖子点击事件
   */
  goDetail: function(e) {
    wx.navigateTo({ url: e.currentTarget.dataset.page });
  },
  /**
   * 加入或者退出门派
   */
  joinSectarian:function(){
    wx.showLoading({title: '提交中',mask:true});
    let param = { id: this.data.sectarian_info.id};
    sectarian.joinSectarian(param,(res)=>{
      this.data.sectarian_info.join_status = this.data.sectarian_info.join_status==0?1:0;
      this.setData({sectarian_info:this.data.sectarian_info})
      let title = this.data.sectarian_info.join_status == 0 ? '成功退出门派' : '加入成功';
      wx.hideLoading();
      wx.showToast({ title: title});
    });
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.data.current_page = 0;
    this.data.last_page = 1;
    this.getSectarianDetail();
    this.getSectarianThemeList();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getSectarianThemeList();
  },
  /**
   * 进入发布主题页面
   */
  goPublishTheme:function(){
    if (this.data.sectarian_info.join_status == 0) return wx.showToast({ title: '您还没有加入该门派!', icon: 'none' });
    wx.navigateTo({ url: '/pages/sectarian/publish_theme/index?id=' + this.data.sectarian_info.id});
  },
  /**
   * 页面显示时触发
   */
  onShow: function () {
    if (getApp().globalData.is_refresh) {
      getApp().globalData.is_refresh = false;
      this.data.current_page = 0;
      this.data.last_page = 1;
      this.getSectarianThemeList();
    }
  },
  /**
   * 显示分享
   */
  showShare:function(){
    let param = { showShare: !this.data.showShare}
    if (this.data.showShare == true && this.data.showShareImage==true){
      param.showShareImage = false;
    }
    this.setData(param)
  },
  /**
   * 加载所有需要的图片
   */
  getImageInfo:function(url){
    return new Promise((resolve, reject) => {
      wx.getImageInfo({
        src: url,
        success: resolve,
        fail: reject,
      })
    })
  },
  /**
   * 生产朋友圈二维码
   */
  shareQrCode:function(){
    //获取分享二维码
    wx.showLoading({ title: '合成中' });
    let param = {id:this.data.sectarian_info.id};
    sectarian.getShareQrcode(param,(result)=>{
      this.setData({ showShareImage: true });
      wx.createSelectorQuery().select('#share_image').fields({ node: true, size: true })
        .exec((res) => {
          this.draw(res, result.qr_code);
        });
    });
  },
  draw(res, qrcode_path){
    const width = res[0].width
    const height = res[0].height
    const canvas = res[0].node
    const ctx = canvas.getContext('2d')

    const dpr = wx.getSystemInfoSync().pixelRatio
    canvas.width = width * dpr
    canvas.height = height * dpr
    ctx.scale(dpr, dpr)
    //绘制小程序码
    let qrcode = canvas.createImage()
    qrcode.src = qrcode_path;
    qrcode.onload = () => {
      ctx.drawImage(qrcode, 0, 0, qrcode.width, qrcode.height, 10, height - 80, 70, 70);
    }
    const img = canvas.createImage()
    img.src = this.data.sectarian_info.cover_image.replace('http://file.xwzj88.cn', config.uploadFile);
    img.onload = () => {
      ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, width, 130);
      // 画一个圆形边框
      ctx.beginPath();
      ctx.arc(width / 2, 145, 42, 0, 2 * Math.PI);
      ctx.closePath();
      ctx.lineWidth = 2 * dpr;
      ctx.strokeStyle = '#fff';
      ctx.stroke();
      // 裁剪图片
      ctx.save();
      ctx.beginPath();
      ctx.arc(width / 2, 145, 40, 0, 2 * Math.PI);
      ctx.clip();
      ctx.drawImage(img, 0, 0, img.width, img.height, width / 2 - 45, 100, 90, 90);
    }
    //绘制标题
    ctx.fillText(this.data.sectarian_info.sectarian_name, width/2-30, 210);
    //绘制成员数及帖子数
    let title = this.data.sectarian_info.member_num + '个成员，' + this.data.sectarian_info.theme_num+'个帖子';
    ctx.fillText(title, width / 2 - 30, 240);
    //绘制提示信息
    ctx.fillText('长按识别二维码，查看该门派主页', 90, height - 45);
    ctx.restore();
    wx.hideLoading();
  },
  /**
   * 下载分享图
   */
  DownQrCode:function(){
    wx.createSelectorQuery().select('#share_image').fields({ node: true, size: true })
      .exec((res) => {
        wx.canvasToTempFilePath({
          x: 0, y: 0,width:res[0].width,height:res[0].height,
          canvas: res[0].node,
          success: (res) => {
            wx.saveImageToPhotosAlbum({ filePath: res.tempFilePath,success:()=>{
              wx.showToast({title: '下载成功!'});
              this.setData({ showShare: false, showShareImage:false })
            } });
          },
          fail: (fail) => {
            wx.showToast({title: '下载失败!',icon:'none'});
          }
        });
      });
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    let userinfo = getApp().globalData.userInfo
    return {
      title: userinfo.nickname+'邀请您加入' + this.data.sectarian_info.sectarian_name,
      path: '/pages/sectarian/detail/index?share_uid=' + userinfo.uid+'&id='+this.data.sectarian_info.id
    }
  }
})