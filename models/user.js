const moment = require('moment');

const { Schema, model } = require('mongoose');

const userSchema = Schema(
  {
    nickname: {
      type: String,
    },
    avatar: [
      {
        src: { type: String },
        key: { type: String },
        url: { type: String },
        id: { type: String },
        type: { type: String, default: 'IMAGE' },
      },
    ],
    phone: {
      type: String,
    },
    agent: {
      type: Schema.Types.ObjectId,
      ref: 'Agent',
    },
  
  },
  { timestamps: true }
);
userSchema.plugin(require('mongoose-autopopulate'));

userSchema.set('toObject', { virtuals: true });
userSchema.set('toJSON', { virtuals: true });
userSchema.virtual('registeredDate').get(function() {
  return moment(this.createdAt).format('YYYY/MM/DD');
});
module.exports = model('User', userSchema);
