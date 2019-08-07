// packages/headnav/index.js
Component({
  lifetimes:{
    ready() {
      wx.getSystemInfo({
        success: (res) => {
          this.setData({ statusBarHeight: res.statusBarHeight })
        }
      })
    }
  },
  /**
   * 组件的属性列表
   */
  properties: {
  },
  /**
   * 组件的初始数据
   */
  data: {
    statusBarHeight:20
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
