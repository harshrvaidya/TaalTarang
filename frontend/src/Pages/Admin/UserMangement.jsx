import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

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
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="border-b">
              <td className="p-4">{user.name}</td>
              <td className="p-4">{user.email}</td>
              <td className="p-4">{user.role}</td>
              <Link to={`/admin/Edituser/${user._id}`} className="p-4 text-blue-600 hover:underline">Edit</Link>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;