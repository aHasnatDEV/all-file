import { Schema, model } from 'mongoose';

const schema = new Schema({
  supportNumber: { type: String, unique: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  staff: { type: Schema.Types.ObjectId, ref: 'User' },
  type: { type: String, enum: ['refund', 'account', 'payment', 'order'] },
  status: { type: String, enum: ['open', 'close', 'pending'], default: 'pending' },
}, { timestamps: true });

schema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.__v;
  return JSON.parse(JSON.stringify(obj).replace(/_id/g, 'id'));
};

export default model('Support', schema);