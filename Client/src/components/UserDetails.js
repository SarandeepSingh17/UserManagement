import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserDetails.css';
const UserDetails = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch user data from the server
    axios.get('http://localhost:5000/api/users')
      .then((response) => setUsers(response.data))
      .catch((error) => console.error('Error fetching data:', error));
  }, [users]); // Empty dependency array ensures the effect runs once after initial render

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="user-details-container">
      <h2>User Details</h2>
      <div className="user-details-search">
        <input
          type="text"
          placeholder="Search by username"
          onChange={handleSearch}
        />
      </div>
      <table className="user-details-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Creation Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user, index) => (
            <tr key={index}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.creationDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


export default UserDetails;
