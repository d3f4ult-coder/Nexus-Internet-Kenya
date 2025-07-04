import React from 'react';

function Dashboard() {
  return (
    <div>
      <h1>User Dashboard</h1>
      <div className="card">
        <h2>Welcome, [User]</h2>
        <p>Current Plan: <strong>Monthly (25 Mbps)</strong></p>
        <p>Expiry: 30 June 2024</p>
        <button className="btn" style={{ marginRight: 10 }}>Upgrade Plan</button>
        <button className="btn">Purchase Bandwidth</button>
      </div>
      <div className="card">
        <h2>Transaction History</h2>
        <ul>
          <li>01 June 2024 – KES 1,800 – Monthly Plan</li>
          <li>01 May 2024 – KES 1,800 – Monthly Plan</li>
        </ul>
      </div>
      <div className="card">
        <h2>Account Settings</h2>
        <button className="btn">Change Password</button>
      </div>
    </div>
  );
}

export default Dashboard;
