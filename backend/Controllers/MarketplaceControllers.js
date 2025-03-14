const Product = require('../models/Product');
require('dotenv').config();
const stripekey=process.env.stripe_Key;
const stripe = require('stripe')(process.env.stripe_Key);

const addProduct = async (req, res) => {
  const { title, description, price, thumbnail, quantity } = req.body;
  if (!title || !description || !price || !thumbnail || !quantity) {
    console.log('Missing fields:', { title, description, price, thumbnail, quantity });
    return res.status(400).json({ error: 'All fields are required' });
  }
  try {
    const newProduct = new Product({
      title,
      description,
      price,
      thumbnail,
      quantity,
      addedBy: req.user._id, // Save the ID of the logged-in user
    });
    const savedProduct = await newProduct.save();
    console.log('Product added successfully:', savedProduct);
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error('Error during adding product:', error);
    res.status(500).json({ error: 'Failed to add product' });
  }
};

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

const updateProduct = async (req, res) => {
  const id = req.params.id;
  const { title, description, price, thumbnail, quantity } = req.body;
  if (!title || !description || !price || !thumbnail || !quantity) {
    console.log('Missing fields:', { title, description, price, thumbnail, quantity });
    return res.status(400).json({ error: 'All fields are required' });
  }
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { title, description, price, thumbnail, quantity },
      { new: true }
    );
    console.log('Product updated successfully:', updatedProduct);
    res.json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Failed to update product' });
  }
};

const deleteProduct = async (req, res) => {
  const id = req.params.id;
  console.log(`Deleting product with ID: ${id}`);
  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    console.log('Product deleted successfully:', deletedProduct);
    res.json(deletedProduct);
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Failed to delete product' });
  }
};


// const payment=async(req,res)=>{
//   try {
//     const product = await stripe.products.create({
//         name: "Cart Items",
//     });

//     const price = await stripe.prices.create({
//         product: product.id,
//         unit_amount: 100 * 100, // 100 INR
//         currency: 'inr',
//     });

//     const session = await stripe.checkout.sessions.create({
//         line_items: [
//             {
//                 price: price.id,
//                 quantity: 1,
//             }
//         ],
//         mode: 'payment',
//         success_url: 'http://localhost:3000/success',
//         cancel_url: 'http://localhost:3000/cancel',
//         customer_email: 'demo@gmail.com',
//     });

//     res.json({ url: session.url });
// } catch (error) {
//     console.error('Error creating payment session:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
// }

// }
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

module.exports = { addProduct, getProducts, getProductById, updateProduct, deleteProduct,payment };