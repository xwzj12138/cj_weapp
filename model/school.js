import {auth} from './auth.js';

export default new class school extends auth{
  constructor() {
    super();
  }
  //申请创建门派
  apply(param, callback) {
    this.request({ url: 'api/v1/school/apply', type: 'POST', data: param, sCallBack: (res) => { callback(res); } });
  }
  //'获取当前用户加入的门派列表'
  myJoinSchool(param, callback) {
    this.request({ url: 'api/v1/school/myJoinSchool', type: 'POST', data: param, sCallBack: (res) => { callback(res); } });
  }
  //搜索门派列表
  search(param, callback) {
    this.request({ url: 'api/v1/school/search', type: 'POST', data: param, sCallBack: (res) => { callback(res); } });
  }
  //在某个门派中发布主题
  publishTheme(param, callback) {
    this.request({ url: 'api/v1/school/publishTheme', type: 'POST', data: param, sCallBack: (res) => { callback(res); } });
  }
  //在某个门派中的主题列表
  getTheme(param, callback) {
    this.request({ url: 'api/v1/school/getTheme', type: 'POST', data: param, sCallBack: (res) => { callback(res); } });
  }
  //获取某个主题详情
  themeDetail(param, callback) {
    this.request({ url: 'api/v1/school/themeDetail', type: 'POST', data: param, sCallBack: (res) => { callback(res); } });
  }
  //评论主题
  commentTheme(param, callback) {
    this.request({ url: 'api/v1/school/commentTheme', type: 'POST', data: param, sCallBack: (res) => { callback(res); } });
  }
  //获取主题的评论列表
  themeCommentList(param, callback) {
    this.request({ url: 'api/v1/school/themeCommentList', type: 'POST', data: param, sCallBack: (res) => { callback(res); } });
  }
  //获取当前用户创建的门派
  mySchool(callback) {
    this.request({ url: 'api/v1/school/mySchool', type: 'POST', data: {}, sCallBack: (res) => { callback(res); } });
  }
  //获取某个门派成员列表
  getMember(param, callback) {
    this.request({ url: 'api/v1/school/getMember', type: 'POST', data: param, sCallBack: (res) => { callback(res); } });
  }
  //获取某个门派详情
  getDetail(param, callback) {
    this.request({ url: 'api/v1/school/detail', type: 'POST', data: param, sCallBack: (res) => { callback(res); } });
  }
  //点赞门派主题或帖子
  likeTheme(param, callback) {
    this.request({ url: 'api/v1/school/likeTheme', type: 'POST', data: param, sCallBack: (res) => { callback(res); } });
  }
  //加入门派
  joinSchool(param, callback) {
    this.request({ url: 'api/v1/school/join', type: 'POST', data: param, sCallBack: (res) => { callback(res); } });
  }
  //设置门派成员状态
  setMemberStatus(param, callback) {
    this.request({ url: 'api/v1/school/setMemberStatus', type: 'POST', data: param, sCallBack: (res) => { callback(res); } });
  }
  //审核主题
  auditTheme(param, callback) {
    this.request({ url: 'api/v1/school/auditTheme', type: 'POST', data: param, sCallBack: (res) => { callback(res); } });
  }
  //获取分享二维码
  getShareQrcode(param, callback) {
    this.request({ url: 'api/v1/school/getQrCode', type: 'POST', data: param, sCallBack: (res) => { callback(res); } });
  }
}