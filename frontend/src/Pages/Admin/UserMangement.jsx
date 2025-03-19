// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// const UserManagement = () => {
//   const [users, setUsers] = useState([]);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchAllUsers = async () => {
//       try {
//         const token = localStorage.getItem('authToken'); // Get token from localStorage
//         const response = await axios.get('http://localhost:3001/api/admin/users', {
//           headers: { Authorization: `Bearer ${token}` }, // Include token in headers
//         });
//         setUsers(response.data);
//       } catch (error) {
//         console.error('Error fetching users:', error);
//         setError('Failed to fetch users');
//       }
//     };

//     fetchAllUsers();
//   }, []);

// const deleteUser = async (userId) => {
//   if (!window.confirm('Are you sure you want to delete this user?')) return;

//   try {
//     const token = localStorage.getItem('authToken');
//     await axios.delete(`http://localhost:3001/api/admin/users/${userId}`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });

//     // Remove the deleted user from the state
//     setUsers(users.filter((user) => user._id !== userId));
//     alert('User deleted successfully');
//   } catch (error) {
//     console.error('Error deleting user:', error);
//     alert('Failed to delete user. Please try again.');
//   }
// };
//   return (
//     <div>
//       <h1 className="text-3xl font-bold mb-4">User Management</h1>
//       {error && <p className="text-red-600">{error}</p>}
//       <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
//         <thead className="bg-gray-800 text-white">
//           <tr>
//             <th className="p-4 text-left">Name</th>
//             <th className="p-4 text-left">Email</th>
//             <th className="p-4 text-left">Role</th>
//             <th className="p-4 text-left">Update</th>
//             <th className="p-4 text-left">Delete</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user) => (
//             <tr key={user._id} className="border-b">
//               <td className="p-4">{user.name}</td>
//               <td className="p-4">{user.email}</td>
//               <td className="p-4">{user.role}</td>
//              <td> <Link to={`/admin/Edituser/${user._id}`} className="p-4 text-blue-600 hover:underline">Edit</Link></td>
//              <td><button onClick={()=>deleteUser(user._id)}>delete</button></td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default UserManagement;  
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const token = localStorage.getItem('authToken'); // Get token from localStorage
        const response = await axios.get('http://localhost:3001/api/admin/users', {
          headers: { Authorization: `Bearer ${token}` }, // Include token in headers
        });
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
        setError('Failed to fetch users');
      }
    };

    fetchAllUsers();
  }, []);

  const deleteUser = async () => {
    try {
      const token = localStorage.getItem('authToken');
      await axios.delete(`http://localhost:3001/api/admin/users/${selectedUserId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Remove the deleted user from the state
      setUsers(users.filter((user) => user._id !== selectedUserId));
      setShowModal(false); // Close the modal
      alert('User deleted successfully');
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Failed to delete user. Please try again.');
    }
  };

  const openDeleteModal = (userId) => {
    setSelectedUserId(userId);
    setShowModal(true);
  };

  const closeDeleteModal = () => {
    setShowModal(false);
    setSelectedUserId(null);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">User Management</h1>
      {error && <p className="text-red-600">{error}</p>}
      <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="p-4 text-left">Name</th>
            <th className="p-4 text-left">Email</th>
            <th className="p-4 text-left">Role</th>
            <th className="p-4 text-left">Update</th>
            <th className="p-4 text-left">Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="border-b">
              <td className="p-4">{user.name}</td>
              <td className="p-4">{user.email}</td>
              <td className="p-4">{user.role}</td>
              <td>
                <Link
                  to={`/admin/Edituser/${user._id}`}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200"
                >
                  Edit
                </Link>
              </td>
              <td>
                <button
                  onClick={() => openDeleteModal(user._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-200"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Delete Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
            <p className="text-gray-700 mb-6">
              Are you sure you want to delete this user? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={closeDeleteModal}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition duration-200"
              >
                Cancel
              </button>
              <button
                onClick={deleteUser}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-200"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;