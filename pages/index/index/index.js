// pages/qr_code/list/index.js
import community from '../../../model/community.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    resources_type:1,banner_list:[],
    resources_type_list:[{id:1,name:'微信群',button:'加群'},{id:2,name:'公众号',button:'关注公众号'},{id:3,name:'小程序',button:'进入小程序'}],
    data:{current_page:0,last_page:1,data:[]}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getResources()
  },
  /**
   * 获取资源列表 
   */
  getResources(){
    if (this.data.data.current_page >= this.data.data.last_page){
      return wx.stopPullDownRefresh();
    }
    let param = {page:this.data.data.current_page+1,resources_type:this.data.resources_type};
    community.get(param,(res)=>{
      if(res.current_page>1){
        res.data = [...this.data.data.data,...res.data];
      }
      this.setData({ data:res});
      return wx.stopPullDownRefresh();
    });
  },
  /**
   * 选择资源类型事件
   */
  selectResourcesType(value){
    this.data.data.current_page = 0;
    this.data.resources_type = value.detail.data.id;
    this.getResources();
  },
  
  /**
   * 进入banner详情页
   */
  goBannerDetail:function(e){
    wx.navigateTo({url: e.currentTarget.dataset.detail_url});
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.data.data.current_page = 0;
    this.getResources();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getResources();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})