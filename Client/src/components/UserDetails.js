import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import './UserDetails.css';

const UserDetails = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Fetch user data from the server
    axios.get('http://localhost:5000/api/users')
      .then((response) => setUsers(response.data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []); // Empty dependency array ensures the effect runs once after initial render

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const openModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
  };

  const generateReport = () => {
    // Add logic to generate a report for the selected user
    console.log('Generating report for user:', selectedUser);
    closeModal();
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
            <th>Actions</th>
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
              <td>
                <button onClick={() => openModal(user)}>Generate Report</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Generate Report Modal"
        className="modal"
        overlayClassName="overlay"
      >
        <h2>Generate Report</h2>
        {selectedUser && (
          <div>
            <p>User: {selectedUser.username}</p>
            <p>Email: {selectedUser.email}</p>
            <p>Phone: {selectedUser.phone}</p>
            <p>Creation Date: {selectedUser.creationDate}</p>
          </div>
        )}
        <button onClick={generateReport}>Generate Report</button>
        <button onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
};

export default UserDetails;
