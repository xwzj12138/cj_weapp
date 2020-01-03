// pages/my/my_pruze/order_list/index.js
import pruze from '../../../../model/pruze.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pruze_id:0,
    hd_company_list:[],
    company_list:[],
    current_page: 0,
    data: [],
    last_page: 1,
    show_drawer:false,
    form: { express_number: '', hd_company_id: '', id: '', index:''},
    select_index:''
  },

  /**
   * 关闭弹窗
   */
  closeDrawer:function(){
    this.setData({ show_drawer:false});
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //保存奖品id
    this.setData(options);
    //获取订单列表
    this.getOrderList ();
    //获取快递公司列表
    this.getCompanyList();
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.setData({ current_page: 0, last_page: 1 });
    this.getOderList();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getOrderList ();
  },

  /**
   * 获取中奖用户列表
   */
  getOrderList : function () {
    //提示没有数据了
    if (this.data.current_page == this.data.last_page) return wx.stopPullDownRefresh();
    let param = {id:this.data.pruze_id};
    pruze.getOrderList(param,(res)=>{
      res.data = [...this.data.data,...res.data];
      this.setData(res);
      wx.stopPullDownRefresh();
    });
  },
  /**
   * 获取快递公司
   */
  getCompanyList:function(){
    if (this.data.hd_company_list.length>0) return;
    pruze.getHdCompanyList((res)=>{
      res.forEach((e)=>{
        this.data.company_list.push(e.company_name)
      });
      this.data.hd_company_list = res;
      this.setData(this.data);
    });
  },
  /**
   * 显示设置物流信息
   */
  showDrawer:function(e){
    this.data.show_drawer = true;
    this.data.form.id = this.data.data[e.currentTarget.dataset.index].id;
    this.data.form.express_number = '';
    this.data.form.index = '';
    this.data.select_index = e.currentTarget.dataset.index;
    this.setData(this.data);
  },
  /**
   * 设置物流单号
   */
  inputChange: function (e) {
    this.data.form.express_number = e.detail.value;
    this.setData(this.data)
  },
  /**
   * 选择快递公司
   */
  selectHdCompany: function (e) {
    this.data.form.index = e.detail.value;
    this.setData(this.data)
  },
  /**
   * 提交数据
   */
  handleClick: function (e) {
    if (this.data.form.index==='') return wx.showToast({ title: '请选择快递公司',icon:'none'});
    if (this.data.form.express_number === '') return wx.showToast({ title: '请输入快递单号', icon: 'none'});
    this.data.form.hd_company_id = this.data.hd_company_list[this.data.form.index].id;
    pruze.setTrackingNum(this.data.form, (res) => {
      this.data.data[this.data.select_index].status = 5;
      this.data.show_drawer = false;
      this.setData(this.data)
      wx.showToast({ title: '设置成功' });
    });
  },
})