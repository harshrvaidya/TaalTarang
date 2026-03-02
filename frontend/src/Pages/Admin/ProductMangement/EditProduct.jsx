import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditProduct = () => {
  const { id } = useParams(); // Get product ID from the route
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [thumbnail, setThumbnail] = useState(null); // File object for the image
  const [category, setCategory] = useState('');
  const [preview, setPreview] = useState(null); // Preview URL for the image
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const myCloudName = process.env.REACT_APP_CLOUD_NAME;

  useEffect(() => {
    // Fetch product details
    const fetchProduct = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get(`http://localhost:3001/api/admin/products/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const product = response.data;
        setTitle(product.title);
        setDescription(product.description);
        setPrice(product.price);
        setCategory(product.category);
        setPreview(product.thumbnail); // Set the existing thumbnail as preview
      } catch (error) {
        console.error('Error fetching product:', error);
        setError('Failed to fetch product details.');
      }
    };

    fetchProduct();
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnail(file); // Set the file object
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result); // Set the preview URL
      reader.readAsDataURL(file);
    }
  };

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    const uniquePublicId = `${title}-${Date.now()}`;

    formData.append('file', file);
    formData.append('upload_preset', 'Product_preset');
    formData.append('public_id', uniquePublicId);

    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${myCloudName}/image/upload`,
        formData
      );
      return res.data.secure_url; // Return the uploaded image URL
    } catch (error) {
      console.error('Error uploading image:', error);
      throw new Error('Image upload failed.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let uploadedThumbnailUrl = preview; // Use the existing thumbnail if no new file is uploaded

      // Upload the image to Cloudinary if a new file is selected
      if (thumbnail) {
        uploadedThumbnailUrl = await uploadToCloudinary(thumbnail);
      }

      const token = localStorage.getItem('authToken');
      await axios.put(
        `http://localhost:3001/api/admin/products/${id}`,
        {
          title,
          description,
          price,
          thumbnail: uploadedThumbnailUrl, // Use the Cloudinary URL
          category,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setSuccess('Product updated successfully!');
      setError('');
      setTimeout(() => navigate('/admin/products'), 2000); // Redirect to product management page after 2 seconds
    } catch (error) {
      console.error('Error updating product:', error);
      setError('Failed to update product. Please try again.');
      setSuccess('');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Edit Product</h1>
      {success && <p className="text-green-600 mb-4">{success}</p>}
      {error && <p className="text-red-600 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter product title"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter product description"
            required
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1">Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter product price"
            required
          />
        </div>

        {/* Thumbnail */}
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1">Thumbnail</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full border border-gray-300 rounded-lg p-2 mb-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          {preview && (
            <div className="flex justify-center mb-4">
              <img
                src={preview}
                alt="Preview"
                className="w-24 h-24 rounded-full object-cover border-2 border-orange-500"
              />
            </div>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select a category</option>
            <option value="Protective Gears">Protective Gears</option>
            <option value="Maintenance">Maintenance</option>
            <option value="Learning">Learning</option>
            <option value="Others">Others</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProduct;