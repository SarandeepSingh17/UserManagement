import React, { useState } from 'react';
import axios from 'axios';
import './AccountCreation.css';
const AccountCreation = ({ onAccountCreated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Validate form fields (add more validation as needed)
    if (!username.trim() || !password.trim()) {
      alert('Please fill in all fields.');
      return;
    }

    // Send form data to the server
    axios.post('http://localhost:5000/api/createAccount', { username, password })
      .then((response) => {
        console.log('Server response:', response.data);

        // Pass the new account data to the parent component
        onAccountCreated(response.data);
      })
      .catch((error) => {
        console.error('Error submitting form:', error);
        // Handle error, e.g., show an error message to the user
      });

    // Reset form fields
    setUsername('');
    setPassword('');
  };

  return (
    <div className="account-creation-container">
      <h2>Account Creation</h2>
      <form className="account-creation-form" onSubmit={handleFormSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={handleUsernameChange}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </label>
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
};

export default AccountCreation;
