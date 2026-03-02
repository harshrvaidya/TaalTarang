const ProductModel=require('../models/Product');

// to get all products we are using the same route as normal users

// to get particular product 
// const getParticularProduct = async (req, res) => {
//     const id = req.params.id;
//   ProductModel.findById({id}).then((data)=>{
//     res.status(200).json(data);
//   }).catch((err)=>{
//     res.status(500).json(err);
//   })
//   };
const getParticularProduct = async (req, res) => {
  const id = req.params.id; // Extract the product ID from the route
  try {
    const product = await ProductModel.findById(id); // Pass the ID directly
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (err) {
    console.error('Error fetching product:', err);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
};
const AddProduct = async (req, res) => {
    const { title, description, price, thumbnail, category } = req.body;
  
    try {
      const newProduct = new ProductModel({
        title,
        description,
        price,
        thumbnail,
        quantity: 1, // Default quantity is always 1
        category,
      });
  
      const savedProduct = await newProduct.save();
      res.status(201).json(savedProduct);
    } catch (error) {
      console.error('Error adding product:', error);
      res.status(500).json({ error: 'Failed to add product' });
    }
  };


  const updateProduct = async (req, res) => {
    const { id } = req.params; // Get product ID from the route
    const { title, description, price, thumbnail, category } = req.body;
  
    try {
      // Find the product by ID and update it
      const updatedProduct = await ProductModel.findByIdAndUpdate(
        id,
        { title, description, price, thumbnail, category },
        { new: true } // Return the updated product
      );
  
      if (!updatedProduct) {
        return res.status(404).json({ error: 'Product not found' });
      }
  
      res.status(200).json(updatedProduct);
    } catch (error) {
      console.error('Error updating product:', error);
      res.status(500).json({ error: 'Failed to update product' });
    }
  };
  
  const deleteproduct = async (req, res) => {
    const id = req.params.id;
    try{
    const deletedProduct = await ProductModel.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) { 
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Failed to delete product' });
  }};

module.exports = { AddProduct,deleteproduct,updateProduct,getParticularProduct }