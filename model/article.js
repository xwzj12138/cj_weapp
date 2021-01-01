import { auth } from './auth.js'


// 文章相关
export default new class article extends auth {
  constructor() { super(); }
  // 获取文章列表
  getList(param, callback) {
    this.request({ url: 'api/v1/article/get_list', method: 'POST', data: param, sCallBack: (res) => { callback(res); } })
  }
  //点赞
  like(param, callback) {
    this.request({ url: 'api/v1/article/like', method: 'POST', data: param, sCallBack: (res) => { callback(res); } })
  }
  //获取文章详情
  detail(param, callback) {
    this.request({ url: 'api/v1/article/detail', method: 'POST', data: param, sCallBack: (res) => { callback(res); } })
  }
  //获取banner图列表
  getBanners(callback) {
    this.request({ url: 'api/v1/index/index', method: 'POST', data: {}, sCallBack: (res) => { callback(res); } })
  }
  //设置浏览量
  browse(param, callback) {
    this.request({ url: 'api/v1/article/browse', method: 'POST', data: param, sCallBack: (res) => { callback(res); } })
  }
  //设置浏览量
  myList(param, callback) {
    this.request({ url: 'api/v1/article/myList', method: 'POST', data: param, sCallBack: (res) => { callback(res); } })
  }
  //获取分类列表
  getCateList(param, callback) {
    this.request({ url: 'api/v1/article/getCateList', method: 'POST', data: param, sCallBack: (res) => { callback(res); } })
  }
  //发布文章
  publish(param, callback) {
    this.request({ url: 'api/v1/article/publish', method: 'POST', data: param, sCallBack: (res) => { callback(res); } })
  }
  //顶置文章
  top(param, callback) {
    this.request({ url: 'api/v1/article/top', method: 'POST', data: param, sCallBack: (res) => { callback(res); } })
  }
  //支付任务金额
  payTaskMoney(param, callback) {
    this.request({ url: 'api/v1/article/pay_task_money', method: 'POST', data: param, sCallBack: (res) => { callback(res); } })
  }
  //领取任务
  getTask(param, callback) {
    this.request({ url: 'api/v1/article/getTask', method: 'POST', data: param, sCallBack: (res) => { callback(res); } })
  }
  //提交任务截图
  submitTaskScreenshot(param, callback) {
    this.request({ url: 'api/v1/article/submitTaskScreenshot', method: 'POST', data: param, sCallBack: (res) => { callback(res); } })
  }
  //任务申请列表
  applyList(param, callback) {
    this.request({ url: 'api/v1/article/apply_list', method: 'POST', data: param, sCallBack: (res) => { callback(res); } })
  }
  //审核任务
  auditTask(param, callback) {
    this.request({ url: 'api/v1/article/audit_task', method: 'POST', data: param, sCallBack: (res) => { callback(res); } })
  }
  //当前用户申请的任务列表
  myApplyTaskList(param, callback) {
    this.request({ url: 'api/v1/article/my_apply_list', method: 'POST', data: param, sCallBack: (res) => { callback(res); } })
  }
  //删除文章
  del(param, callback) {
    this.request({ url: 'api/v1/article/delete', method: 'POST', data: param, sCallBack: (res) => { callback(res); } })
  }
}