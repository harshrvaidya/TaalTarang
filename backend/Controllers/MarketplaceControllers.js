const Product = require('../models/Product');
require('dotenv').config();
const stripekey=process.env.stripe_Key;
const stripe = require('stripe')(process.env.stripe_Key);
const Order = require('../models/Order'); // Import the Order model

const getProducts = async (req, res) => {
  try {
    const products = await Product.find(); // Populate the addedBy field with the name
    console.log('Fetched products:', products);
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

const getProductById = async (req, res) => {
  try {
    console.log(`Fetching product with ID: ${req.params.id}`);
    const product = await Product.findById(req.params.id);
    if (!product) {
      console.log('Product not found');
      return res.status(404).json({ error: 'Product not found' });
    }
    console.log('Fetched product:', product);
    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
};



const addToHistory = async (req, res, next) => {
  console.log("addtohistory")
  try {
    console.log('Request body:', req.body); // Debug the incoming request body
    const { cartItems, userId, totalAmount } = req.body;

    if (!cartItems || !userId || !totalAmount) {
      return res.status(400).json({ error: 'Missing required fields: cartItems, userId, or totalAmount' });
    }

    if (!Array.isArray(cartItems) || cartItems.length === 0) {
      return res.status(400).json({ error: 'cartItems must be a non-empty array' });
    }

    for (const item of cartItems) {
      if (!item.id || !item.quantity) {
        return res.status(400).json({ error: 'Each cart item must have an id and quantity' });
      }
    }

    // Save the order in the database
    const order = new Order({
      user: userId,
      items: cartItems.map((item) => ({
        product: item.id,
        quantity: item.quantity,
      })),
      totalAmount,
      paymentStatus: 'Pending',
    });

    await order.save();
    console.log('Order saved:', order);

    req.orderId = order._id;

    return next(); // Ensure next() is only called if no response has been sent
  } catch (error) {
    console.error('Error saving order:', error);
    return res.status(500).json({ error: 'Failed to save order' });
  }
};




const payment = async (req, res) => {
  try {
// Get cart items from request body
const { cartItems, email } = req.body;
    // Create a Stripe product for each cart item
    const lineItems = await Promise.all(cartItems.map(async (item) => {
      const product = await stripe.products.create({
        name: item.title,
      });

      const price = await stripe.prices.create({
        product: product.id,
        unit_amount: item.price * 100, // Convert to smallest currency unit
        currency: 'inr',
      });

      return {
        price: price.id,
        quantity: item.quantity,
      };
    }));

    // Create a Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: 'payment',
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel',
      customer_email: email,
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error('Error creating payment session:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// const payment = async (req, res) => {
//   try {
//     const { cartItems, email } = req.body;

//     // Validate input
//     if (!cartItems || !cartItems.length || !email) {
//       return res.status(400).json({ error: 'Invalid input data' });
//     }

//     // Calculate total amount
//     const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

//     // Create Stripe line items
//     const lineItems = await Promise.all(cartItems.map(async (item) => {
//       const product = await stripe.products.create({
//         name: item.title,
//       });

//       const price = await stripe.prices.create({
//         product: product.id,
//         unit_amount: item.price * 100,
//         currency: 'inr',
//       });

//       return {
//         price: price.id,
//         quantity: item.quantity,
//       };
//     }));

//     // Create a Stripe checkout session
//     const session = await stripe.checkout.sessions.create({
//       line_items: lineItems,
//       mode: 'payment',
//       success_url: 'http://localhost:3000/success',
//       cancel_url: 'http://localhost:3000/cancel',
//       customer_email: email,
//     });

//     // Save the order to the database (optional)
//     // const newOrder = new Order({
//     //   customerEmail: email,
//     //   cartItems,
//     //   totalAmount,
//     //   sessionId: session.id,
//     //   paymentStatus: 'Pending',
//     // });
//     // await newOrder.save();

//     // Respond with the session URL
//     res.status(200).json({ url: session.url });
//   } catch (error) {
//     console.error('Error creating payment session:', error);
//     res.status(500).json({ error: 'An error occurred while creating the payment session. Please try again later.' });
//   }
// };






module.exports = {  getProducts, getProductById,addToHistory,payment};