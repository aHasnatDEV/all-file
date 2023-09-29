import { Schema, model } from 'mongoose';
import paginate from 'mongoose-paginate-v2';

const schema = new Schema({
  orderNumber: { type: String, unique: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  email: { type: String, required: true },
  products: [{
    product: {
      type: Schema.Types.ObjectId, ref: 'Products',
    },
    productQuantity: { type: Number },
  }],
  requests: [{
    request: {
      type: Schema.Types.ObjectId, ref: 'Request'
    },
    requestQuantity: { type: Number },
  }],
  total: { type: Number },
  storeAmount: { type: Number },
  deliveredon: {
    from: { type: Date },
    to: { type: Date }
  },
  date: { type: Date, default: Date.now() },
  insideDhaka: { type: Boolean, default: true },
  status: { type: String, enum: ['pending', 'paid', 'processing', 'completed', 'shipping', 'cancelled', 'refunded', 'refundProcessing'], default: 'pending' },
  shippingaddress: {
    name: { type: String },
    address: { type: String, required: true },
    city: { type: String, required: true },
    area: { type: String, required: true },
    zip: { type: String, required: true },
  },
  billingaddress: {
    name: { type: String },
    address: { type: String },
    city: { type: String },
    area: { type: String },
    zip: { type: String },
  },
  phone: { type: String, required: true },
  alternativephone: { type: String },
  instructions: { type: String },
  discountApplied: {
    amount: { type: String },
    percentage: { type: String },
    code: { type: String }
  },
  val_id: { type: String },
  sessionkey: { type: String },
  trxID: { type: String },
  bankTranid: { type: String },
  failedReason: { type: String },
  refundRefid: { type: String }
});

schema.plugin(paginate);
schema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.__v;
  return JSON.parse(JSON.stringify(obj).replace(/_id/g, 'id'));
};

export default model('Orders', schema);