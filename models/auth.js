const { Schema, model } = require('mongoose');

const authSchema = Schema({
  from: String,
  email: String,
  password: String,
  role: String,
  data: {
    displayName: String,
    photoURL: String,
    settings: {
      layout: {
        style: { type: String, default: 'layout1' },
        config: {
          scroll: { type: String, default: 'content' },
          navbar: {
            display: { type: Boolean, default: true },
            folded: { type: Boolean, default: true },
            position: { type: String, default: 'left' },
          },
          toolbar: {
            display: { type: Boolean, default: true },
            style: { type: String, default: 'fixed' },
            position: { type: String, default: 'below' },
          },
          footer: {
            display: { type: Boolean, default: true },
            style: { type: String, default: 'fixed' },
            position: { type: String, default: 'below' },
          },
          mode: { type: String, default: 'fullwidth' },
        },
      },
      customScrollbars: { type: Boolean, default: true },
      theme: {
        main: { type: String, default: 'defaultDark' },
        navbar: { type: String, default: 'defaultDark' },
        toolbar: { type: String, default: 'defaultDark' },
        footer: { type: String, default: 'defaultDark' },
      },
    },
    shortcuts: [String],
  },
});

module.exports = model('Auth', authSchema);
