import { auth} from './auth.js'


export default new class notice extends auth {
  constructor(){ super(); }
  //获取通知详情
  detail(param,callback){
    this.request({ url: 'api/v1/notice/detail', type: 'POST', data: param, sCallBack: (res) => { callback(res); } })
  }
}