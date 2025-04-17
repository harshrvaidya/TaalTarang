// // filepath: c:\Users\Harsh\Desktop\TaalTaraang\backend\models\Order.js
// const mongoose = require('mongoose');

// const OrderSchema = new mongoose.Schema({
//   user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   items: [
//     {
//       title: { type: String, required: true },
//       quantity: { type: Number, required: true },
//       price: { type: Number, required: true },
//     },
//   ],
//   totalAmount: { type: Number, required: true },
//   createdAt: { type: Date, default: Date.now },
// });

// const Order = mongoose.model('Order', OrderSchema);
// module.exports = Order;

const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      title: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
  totalAmount: { type: Number, required: true },
  deliveryAddress: { type: String, required: true }, // New field for delivery address
  orderStatus: {
    type: String,
    enum: ['Not Completed', 'Under Process', 'Shipped', 'Completed'], // Enum for order status
    default: 'Not Completed',
  },
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model('Order', OrderSchema);
module.exports = Order;