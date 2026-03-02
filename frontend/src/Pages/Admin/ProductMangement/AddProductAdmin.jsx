// import React, { useState } from 'react';
// import axios from 'axios';

// const AddProductAdmin = () => {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [price, setPrice] = useState('');
//   const [thumbnail, setThumbnail] = useState('');
//   const [category, setCategory] = useState('');
//   const [success, setSuccess] = useState('');
//   const [error, setError] = useState('');
//   const [preview, setPreview] = useState(null);
//   const myCloudName = process.env.REACT_APP_CLOUD_NAME;


//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setThumbnail(file);
//       const reader = new FileReader();
//       reader.onload = () => setPreview(reader.result);
//       reader.readAsDataURL(file);
//     }
//   };

//   const uploadToCloudinary = async (file) => {
//     const formData = new FormData();
//     const uniquePublicId = `${title}-${Date.now()}`;

//     formData.append('file', file);
//     formData.append('upload_preset', 'Product_preset');
//     formData.append('public_id', uniquePublicId);

//     try {
//       const res = await axios.post(`https://api.cloudinary.com/v1_1/${myCloudName}/image/upload`, formData);
//       return res.data.secure_url;
//     } catch (error) {
//       console.error('Error uploading image:', error);
//       throw new Error('Image upload failed.');
//     }
//   };
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem('authToken');
//       const response = await axios.post(
//         'http://localhost:3001/api/admin/products/addproduct',
//         { title, description, price, thumbnail, category },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       setSuccess('Product added successfully!');
//       setError('');
//       // Reset form fields
//       setTitle('');
//       setDescription('');
//       setPrice('');
//       setThumbnail('');
//       setCategory('');
//     } catch (error) {
//       console.error('Error adding product:', error);
//       setError('Failed to add product. Please try again.');
//       setSuccess('');
//     }
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold mb-6">Add Product</h1>
//       {success && <p className="text-green-600 mb-4">{success}</p>}
//       {error && <p className="text-red-600 mb-4">{error}</p>}

//       <form onSubmit={handleSubmit} className="space-y-6">
//         {/* Title */}
//         <div>
//           <label className="block text-gray-700 text-sm font-medium mb-1">Title</label>
//           <input
//             type="text"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder="Enter product title"
//             required
//           />
//         </div>

//         {/* Description */}
//         <div>
//           <label className="block text-gray-700 text-sm font-medium mb-1">Description</label>
//           <textarea
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder="Enter product description"
//             required
//           />
//         </div>

//         {/* Price */}
//         <div>
//           <label className="block text-gray-700 text-sm font-medium mb-1">Price</label>
//           <input
//             type="number"
//             value={price}
//             onChange={(e) => setPrice(e.target.value)}
//             className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder="Enter product price"
//             required
//           />
//         </div>

//         {/* Thumbnail */}
//         {/* <div>
//           <label className="block text-gray-700 text-sm font-medium mb-1">Thumbnail URL</label>
//           <input
//             type="text"
//             value={thumbnail}
//             onChange={(e) => setThumbnail(e.target.value)}
//             className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder="Enter thumbnail URL"
//             required
//           />
//         </div> */}
//          <label className="block text-center font-semibold text-gray-700 mb-2">Thumbnail</label>
//         <input
//           type="file"
//           accept="image/*"
//           onChange={handleImageChange}
//           className="block w-full border border-gray-300 rounded-lg p-2 mb-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
//         />
//         {preview && (
//           <div className="flex justify-center mb-4">
//             <img src={preview} alt="Preview" className="w-24 h-24 rounded-full object-cover border-2 border-orange-500" />
//           </div>
//         )}

//         {/* Category */}
//         <div>
//           <label className="block text-gray-700 text-sm font-medium mb-1">Category</label>
//           <select
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//             className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           >
//             <option value="">Select a category</option>
//             <option value="Protective Gears">Protective Gears</option>
//             <option value="Maintenance">Maintenance</option>
//             <option value="Learning">Learning</option>
//             <option value="Others">Others</option>
//           </select>
//         </div>

//         {/* Submit Button */}
//         <button
//           type="submit"
//           className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200"
//         >
//           Add Product
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddProductAdmin;   
import React, { useState } from 'react';
import axios from 'axios';

const AddProductAdmin = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [thumbnail, setThumbnail] = useState(null); // File object for the image
  const [category, setCategory] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [preview, setPreview] = useState(null); // Preview URL for the image
  const myCloudName = process.env.REACT_APP_CLOUD_NAME;

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
      let uploadedThumbnailUrl = '';

      // Upload the image to Cloudinary if a file is selected
      if (thumbnail) {
        uploadedThumbnailUrl = await uploadToCloudinary(thumbnail);
      }

      const token = localStorage.getItem('authToken');
      await axios.post(
        'http://localhost:3001/api/admin/products/addproduct',
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

      setSuccess('Product added successfully!');
      setError('');
      // Reset form fields
      setTitle('');
      setDescription('');
      setPrice('');
      setThumbnail(null);
      setCategory('');
      setPreview(null); // Clear the preview
    } catch (error) {
      console.error('Error adding product:', error);
      setError('Failed to add product. Please try again.');
      setSuccess('');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Add Product</h1>
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
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProductAdmin;