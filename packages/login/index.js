// packages/login/index.js
import {login} from '../../model/model.js' 
let loginModel = new login();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show:{
      type:Boolean
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
      * 获取用户信息
      */
    getuserinfo: function (e) {
      let params = {
        nickname: e.detail.userInfo.nickName, gender: e.detail.userInfo.gender,
        avatar: e.detail.userInfo.avatarUrl
      }
      this.setData({ show: false })
      loginModel.authLogin(params, (res) => {
        this.triggerEvent('getuserinfo')
      })
    },
  }
})
