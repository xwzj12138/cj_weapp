import {base} from '../utils/base.js';
import login from './login.js';

export class auth extends base {
  constructor(){
    super();
  }
  request(params){
    login.getStorageSync((storeage)=>{
      params.header = {"token":storeage.token}
      super.request(params);
    });
  }
  http(params) {
    super.request(params);
  }
}