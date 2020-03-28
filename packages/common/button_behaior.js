module.exports = Behavior({
  behaviors: [],
  properties: {
    form_type: {
      type: String
    },
    size: {
      type: Number,
      value: 96,
    },
    openType: String,
    appParameter: String,
    hoverStopPropagation: Boolean,
    lang: {
      type: String,
      value: 'en'
    },
    sessionFrom: {
      type: String,
      value: ''
    },
    sendMessageTitle: String,
    sendMessagePath: String,
    sendMessageImg: String,
    showMessageCard: Boolean
  },
  methods: {
    handleTap() {
      if (this.data.disabled) return false;

      this.triggerEvent('click');
    },
    bindgetuserinfo(e) {
      this.triggerEvent('getuserinfo', e.detail);
    },
    bindcontact(e) {
      this.triggerEvent('contact', e.detail);
    },
    bindgetphonenumber(e) {
      this.triggerEvent('getphonenumber', e.detail);
    },
    binderror(e) {
      this.triggerEvent('error', e.detail);
    }
  }
});