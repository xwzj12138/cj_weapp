import { auth } from './auth.js'


// 文章相关
export default new class article extends auth {
  constructor() { super(); }
  // 获取文章列表
  getList(param, callback) {
    this.http({ url: 'index/v1/article/getList', type: 'POST', data: param, sCallBack: (res) => { callback(res); } })
  }
  //点赞
  like(param, callback) {
    this.request({ url: 'index/v1/article/like', type: 'POST', data: param, sCallBack: (res) => { callback(res); } })
  }
  //获取文章详情
  detail(param, callback) {
    this.request({ url: 'index/v1/article/detail', type: 'POST', data: param, sCallBack: (res) => { callback(res); } })
  }
  //获取banner图列表
  getBanners(callback) {
    this.http({ url: 'index/v1/article/getBanners', type: 'POST', data: {}, sCallBack: (res) => { callback(res); } })
  }
  //设置浏览量
  browse(param, callback) {
    this.request({ url: 'index/v1/article/browse', type: 'POST', data: param, sCallBack: (res) => { callback(res); } })
  }
  //设置浏览量
  myList(param, callback) {
    this.request({ url: 'index/v1/article/myList', type: 'POST', data: param, sCallBack: (res) => { callback(res); } })
  }
  //获取分类列表
  getCateList(param, callback) {
    this.request({ url: 'index/v1/article/getCateList', type: 'POST', data: param, sCallBack: (res) => { callback(res); } })
  }
  //发布文章
  publish(param, callback) {
    this.request({ url: 'index/v1/article/publish', type: 'POST', data: param, sCallBack: (res) => { callback(res); } })
  }
  //顶置文章
  top(param, callback) {
    this.request({ url: 'index/v1/article/top', type: 'POST', data: param, sCallBack: (res) => { callback(res); } })
  }
  //支付任务金额
  payTaskMoney(param, callback) {
    this.request({ url: 'index/v1/article/pay_task_money', type: 'POST', data: param, sCallBack: (res) => { callback(res); } })
  }
  //领取任务
  getTask(param, callback) {
    this.request({ url: 'index/v1/article/getTask', type: 'POST', data: param, sCallBack: (res) => { callback(res); } })
  }
  //提交任务截图
  submitTaskScreenshot(param, callback) {
    this.request({ url: 'index/v1/article/submitTaskScreenshot', type: 'POST', data: param, sCallBack: (res) => { callback(res); } })
  }
  //任务申请列表
  applyList(param, callback) {
    this.request({ url: 'index/v1/article/apply_list', type: 'POST', data: param, sCallBack: (res) => { callback(res); } })
  }
  //获取任务截图
  getTaskEvidences(param, callback) {
    this.request({ url: 'index/v1/article/get_task_evidences', type: 'POST', data: param, sCallBack: (res) => { callback(res); } })
  }
  //审核任务
  auditTask(param, callback) {
    this.request({ url: 'index/v1/article/audit_task', type: 'POST', data: param, sCallBack: (res) => { callback(res); } })
  }
  //删除文章
  del(param, callback) {
    this.request({ url: 'index/v1/article/delete', type: 'POST', data: param, sCallBack: (res) => { callback(res); } })
  }
}