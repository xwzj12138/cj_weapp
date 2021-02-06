import {auth} from './auth.js';

export default new class sectarian extends auth{
  constructor() {
    super();
  }
  //申请创建门派
  apply(param, callback) {
    this.request({ url: 'api/v1/sectarian/apply', method: 'POST', data: param, sCallBack: (res) => { callback(res); } });
  }
  //'获取当前用户加入的门派列表'
  myJoinSectarian(param, callback) {
    this.request({ url: 'api/v1/sectarian/myJoinSectarian', method: 'POST', data: param, sCallBack: (res) => { callback(res); } });
  }
  //搜索门派列表
  search(param, callback) {
    this.request({ url: 'api/v1/sectarian/search', method: 'POST', data: param, sCallBack: (res) => { callback(res); } });
  }
  //在某个门派中发布主题
  publishTheme(param, callback) {
    this.request({ url: 'api/v1/sectarian/publishTheme', method: 'POST', data: param, sCallBack: (res) => { callback(res); } });
  }
  //在某个门派中的主题列表
  getTheme(param, callback) {
    this.request({ url: 'api/v1/sectarian/getTheme', method: 'POST', data: param, sCallBack: (res) => { callback(res); } });
  }
  //获取某个主题详情
  themeDetail(param, callback) {
    this.request({ url: 'api/v1/sectarian/themeDetail', method: 'POST', data: param, sCallBack: (res) => { callback(res); } });
  }
  //评论主题
  commentTheme(param, callback) {
    this.request({ url: 'api/v1/sectarian/commentTheme', method: 'POST', data: param, sCallBack: (res) => { callback(res); } });
  }
  //获取主题的评论列表
  themeCommentList(param, callback) {
    this.request({ url: 'api/v1/sectarian/themeCommentList', method: 'POST', data: param, sCallBack: (res) => { callback(res); } });
  }
  //获取当前用户创建的门派
  mySectarian(callback) {
    this.request({ url: 'api/v1/sectarian/mySectarian', method: 'POST', data: {}, sCallBack: (res) => { callback(res); } });
  }
  //获取某个门派成员列表
  getMember(param, callback) {
    this.request({ url: 'api/v1/sectarian/getMember', method: 'POST', data: param, sCallBack: (res) => { callback(res); } });
  }
  //获取某个门派详情
  getDetail(param, callback) {
    this.request({ url: 'api/v1/sectarian/detail', method: 'POST', data: param, sCallBack: (res) => { callback(res); } });
  }
  //点赞门派主题或帖子
  likeTheme(param, callback) {
    this.request({ url: 'api/v1/sectarian/likeTheme', method: 'POST', data: param, sCallBack: (res) => { callback(res); } });
  }
  //加入门派
  joinSectarian(param, callback) {
    this.request({ url: 'api/v1/sectarian/join', method: 'POST', data: param, sCallBack: (res) => { callback(res); } });
  }
  //设置门派成员状态
  setMemberStatus(param, callback) {
    this.request({ url: 'api/v1/sectarian/setMemberStatus', method: 'POST', data: param, sCallBack: (res) => { callback(res); } });
  }
  //审核主题
  auditTheme(param, callback) {
    this.request({ url: 'api/v1/sectarian/auditTheme', method: 'POST', data: param, sCallBack: (res) => { callback(res); } });
  }
  //获取分享二维码
  getShareQrcode(param, callback) {
    this.request({ url: 'api/v1/sectarian/getQrCode', method: 'POST', data: param, sCallBack: (res) => { callback(res); } });
  }
}