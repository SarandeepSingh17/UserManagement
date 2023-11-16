import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AccountCreation from './components/AccountCreation';
import UserDetails from './components/UserDetails';
import './App.css';

function App() {
  const [accountData, setAccountData] = useState(null);

  const handleAccountCreated = (data) => {
    setAccountData(data);
  };

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/user-details">User Details</Link>
            </li>
            <li>
              <Link to="/account-creation">Account Creation</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/user-details" element={<UserDetails accountData={accountData} />} />
          <Route path="/account-creation" element={<AccountCreation onAccountCreated={handleAccountCreated} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
