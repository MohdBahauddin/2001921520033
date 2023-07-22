import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [companyName, setCompanyName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [ownerEmail, setOwnerEmail] = useState('');
  const [accessCode, setAccessCode] = useState('');
  const [token, setToken] = useState('');
  const [error, setError] = useState('');

  const registerCompany = async () => {
    const url = 'http://20.244.56.144/train/register';

    try {
      const response = await axios.post(url, {
        companyName,
        ownerName,
        rollNo,
        ownerEmail,
        accessCode
      });

      console.log(response.data);
      setToken(response.data.clientSecret);
      setError('');
    } catch (error) {
      console.error(error);
      setError(error.response.data.message);
    }
  };

  const obtainAuthToken = async () => {
    const url = 'http://20.244.56.144/train/auth';

    try {
      const response = await axios.post(url, {
        companyName,
        clientID: 'b46128a0-fbde-4c16-a4b1-6ae6ad718e27',
        ownerName,
        ownerEmail,
        rollNo,
        clientSecret: 'XoyoloRPayKBdAN'
      });

      console.log(response.data);
      setToken(response.data.access_token);
      setError('');
    } catch (error) {
      console.error(error);
      setError(error.response.data.message);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">John Doe Railway Server APIs</h1>
      <div className="mb-3">
        <h2>Register Company</h2>
        {error && <p className="text-danger">{error}</p>}
        <input
          type="text"
          className="form-control mb-4"
          placeholder="Company Name"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Owner Name"
          value={ownerName}
          onChange={(e) => setOwnerName(e.target.value)}
        />
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Roll No"
          value={rollNo}
          onChange={(e) => setRollNo(e.target.value)}
        />
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Owner Email"
          value={ownerEmail}
          onChange={(e) => setOwnerEmail(e.target.value)}
        />
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Access Code"
          value={accessCode}
          onChange={(e) => setAccessCode(e.target.value)}
        />
        <button className="btn btn-primary" onClick={registerCompany}>Register</button>
      </div>
      {token && (
        <div className="mb-3">
          <h2>Obtain Authorization Token</h2>
          <button className="btn btn-primary" onClick={obtainAuthToken}>Obtain Token</button>
          <p>Token: {token}</p>
        </div>
      )}
    </div>
  );
}

export default App;
