import { Schema, model } from 'mongoose';
import paginate from 'mongoose-paginate-v2';

const schema = new Schema({
  requestNumber: { type: String, unique: true },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  name: { type: String },
  link: { type: String },
  note: { type: String },
  images: [{ type: String }],
  quantity: { type: Number },
  price: { type: Number },
  tax: { type: Number },
  fee: { type: Number },
  status: { type: String, enum: ['pending', 'cancelled', 'accepted', 'closed', 'sent', 'processing'], default: 'pending' },
  trxId: { type: String },
  shippingaddress: {
    name: { type: String },
    address: { type: String },
    city: { type: String },
    area: { type: String },
    zip: { type: String },
  },
  billingaddress: {
    name: { type: String },
    address: { type: String },
    city: { type: String },
    area: { type: String },
    zip: { type: String },
  },
}, { timestamps: true });

schema.plugin(paginate);
schema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.__v;
  return JSON.parse(JSON.stringify(obj).replace(/_id/g, 'id'));
};

export default model('Request', schema);