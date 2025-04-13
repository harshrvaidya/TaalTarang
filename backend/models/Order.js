// const mongoose = require('mongoose');

// const OrderSchema = new mongoose.Schema(
//   {
//     user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//     items: [
//       {
//         product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
//         quantity: { type: Number, required: true },
//       },
//     ],
//     totalAmount: { type: Number, required: true },
//     paymentStatus: { type: String, enum: ['Pending', 'Completed'], default: 'Completed' },
//     createdAt: { type: Date, default: Date.now },
//   },
//   { timestamps: true }
// );

// const Order = mongoose.model('Order', OrderSchema);
// module.exports = Order;

const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    customerEmail: { type: String, required: true },
    items: [
      {
        title: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    totalAmount: { type: Number, required: true },
    sessionId: { type: String, required: true },
    paymentStatus: { type: String, enum: ['Pending', 'Completed'], default: 'Pending' },
  },
  { timestamps: true }
);

const Order = mongoose.model('Order', OrderSchema);
module.exports = Order;
