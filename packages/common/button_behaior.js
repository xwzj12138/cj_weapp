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
    bindgetuserinfo({ detail = {} } = {}) {
      this.triggerEvent('getuserinfo', detail);
    },
    bindcontact({ detail = {} } = {}) {
      this.triggerEvent('contact', detail);
    },
    bindgetphonenumber({ detail = {} } = {}) {
      this.triggerEvent('getphonenumber', detail);
    },
    binderror({ detail = {} } = {}) {
      this.triggerEvent('error', detail);
    }
  }
});