import React, { useState } from 'react';
import AccountCreation from './components/AccountCreation';
import UserDetails from './components/UserDetails';
import './App.css';


function App() {
  const [accountData, setAccountData] = useState(null);

  const handleAccountCreated = (data) => {
    setAccountData(data);
  };
  

  return (
    
    <div>
      <UserDetails accountData={accountData} />
      <AccountCreation onAccountCreated={handleAccountCreated}/>
      </div>
    
  );

  }
export default App;
