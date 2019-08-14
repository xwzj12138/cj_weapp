// pages/my/my_pruze/list/index.js
import {pruze} from '../../../../model/model.js'
let pruzeModel = new pruze();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current_page:0,
    data:[],
    last_page:1,
    show_drawer:false,
    address_info:{},
    form: { index: '', pruze_id:0,shipper_code: '', shipper_name:'', tracking_num:''},
    hd_company_list:[],
    hd_companys:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMyPublish();
  },
  /**
   * 获取我发起的抽奖列表
   */
  getMyPublish:function(){
    let param = { page: this.data.current_page + 1 }
    if (this.data.current_page == this.data.last_page) {
      //提示没有数据了
      return wx.stopPullDownRefresh()
    }
    pruzeModel.myPublish(param,(res)=>{
      this.data.current_page = res.current_page
      this.data.last_page = res.last_page
      this.data.data = this.data.data.concat(res.data)
      this.setData(this.data)
      wx.stopPullDownRefresh()
    })
  },
  /**
   * 进入奖品详情页
   */
  goDetail:function(e){
    let pruze = this.data.data[e.currentTarget.dataset.index];
    let url = '/pages/index/detail/index?id=' + pruze.id;
    //未开奖之前进入抽奖页面,否则进入发货页面
    if (pruze.status == 4){
      pruzeModel.getAddressInfo({ id: pruze.id }, (res) => {
        this.data.form.pruze_id = pruze.id;
        this.data.form.index = e.currentTarget.dataset.index;
        this.data.address_info = res.data.address_info;
        this.data.hd_companys = res.data.hd_company_list;
        res.data.hd_company_list.forEach((item)=>{
          this.data.hd_company_list.push(item.company_name)
        })
        this.setData(this.data)
      });
      return this.setData({ show_drawer:true})
      // url = '/pages/my/my_pruze/detail/index?id=' + pruze.id;
    }
    wx.navigateTo({url: url});
  },
  /**
   * 设置物流单号
   */
  inputChange:function(e){
    this.data.form[e.detail.name] = e.detail.value;
    this.setData(this.data)
  },
  /**
   * 选择快递公司
   */
  selectHdCompany:function(e){
    console.log(e)
    this.data.form.shipper_name = e.detail.value;
    this.setData(this.data)
  },
  /**
   * 提交数据
   */
  handleClick:function(e){
    let hd_comapny = this.data.hd_companys[this.data.form.shipper_name];
    this.data.form.shipper_code = hd_comapny.company_code
    this.data.form.shipper_name = hd_comapny.company_name
    pruzeModel.setTrackingNum(this.data.form, (res) => {
      this.data.data[this.data.form.index].status = 5;
      this.data.show_drawer = false;
      this.setData(this.data)
      wx.showToast({ title: '设置成功' });
    });
  }
})