const Product = require('../models/Product');

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

module.exports = { addProduct, getProducts, getProductById, updateProduct, deleteProduct };