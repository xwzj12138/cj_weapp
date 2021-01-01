import { auth } from './auth.js';

export default new class community extends auth{
  constructor() { super(); }
  //获取社群资源
  get(param,callback) {
    this.request({ url: 'api/v1/community/get', method: 'POST', data:param, sCallBack: (res) => { callback(res); } });
  }
  //添加社群资源
  add(param,callback) {
    this.request({ url: 'api/v1/community/add', method: 'POST', data: param, sCallBack: (res) => { callback(res); } });
  }
  //修改社群资源
  update(param,callback) {
    this.request({ url: 'api/v1/community/update', method: 'POST', data: param, sCallBack: (res) => { callback(res); } });
  }
  //获取当前用户发布的资源
  my_publish(callback) {
    this.request({ url: 'api/v1/community/my_publish', method: 'POST', data: {}, sCallBack: (res) => { callback(res); } });
  }
  //获取某个资源信息
  info(param,callback) {
    this.request({ url: 'api/v1/community/info', method: 'POST', data: param, sCallBack: (res) => { callback(res); } });
  }
  //查看某个社群资源
  to_view(param,callback) {
    this.request({ url: 'api/v1/community/to_view', method: 'POST', data: param, sCallBack: (res) => { callback(res); } });
  }
  //获取当前用户发布的资源
  top(param,callback) {
    this.request({ url: 'api/v1/community/top', method: 'POST', data:param, sCallBack: (res) => { callback(res); } });
  }
}