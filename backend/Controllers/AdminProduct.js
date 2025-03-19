const ProductModel=require('../models/Product');

// const AddProduct = async (req, res) => {
//     ProductModel.create(req.body)
//     .then((data)=>{
//         res.status(200).json(data);
//     }).catch((err)=>{
//         res.status(500).json(err);
//     })
// }   

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
module.exports = { AddProduct};