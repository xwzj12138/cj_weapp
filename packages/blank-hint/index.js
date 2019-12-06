// packages/blank-hint/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    background_url:{
      type:String,
      value:'/static/blank_hint.png'
    },
    button_url: {
      type: String,
      value: ''
    },
    button_name: {
      type: String,
      value: '去添加'
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
    handleClick() {
      this.triggerEvent('click');
    },
  }
})
