import React from 'react';

function Pricing() {
  return (
    <div>
      <h1>Pricing Plans</h1>
      <div className="card">
        <h2>Weekly Plan</h2>
        <ul>
          <li>Price: KES 500/week</li>
          <li>Bandwidth: Up to 10 Mbps</li>
        </ul>
      </div>
      <div className="card">
        <h2>Monthly Plan</h2>
        <ul>
          <li>Price: KES 1,800/month</li>
          <li>Bandwidth: Up to 25 Mbps</li>
        </ul>
      </div>
      <div className="card">
        <h2>Yearly Plan</h2>
        <ul>
          <li>Price: KES 20,000/year</li>
          <li>Bandwidth: Up to 50 Mbps</li>
          <li>10% discount for early payment</li>
        </ul>
      </div>
      <div className="card">
        <h2>One-Time Installation Fee</h2>
        <ul>
          <li>Installation fee: KES 1,500 (paid only the first time you install internet at your home or business)</li>
        </ul>
      </div>
      <div className="card">
        <h2>Comparison Table</h2>
        <table style={{ width: '100%', color: '#c9d1d9', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #30363d' }}>
              <th>Plan</th>
              <th>Price</th>
              <th>Bandwidth</th>
              <th>Installation</th>
              <th>Discounts</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Weekly</td>
              <td>KES 500</td>
              <td>10 Mbps</td>
              <td>One-time KES 1,500</td>
              <td>-</td>
            </tr>
            <tr>
              <td>Monthly</td>
              <td>KES 1,800</td>
              <td>25 Mbps</td>
              <td>One-time KES 1,500</td>
              <td>-</td>
            </tr>
            <tr>
              <td>Yearly</td>
              <td>KES 20,000</td>
              <td>50 Mbps</td>
              <td>One-time KES 1,500</td>
              <td>10% off</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="card">
        <h2>Promotions & Special Offers</h2>
        <ul>
          <li>10% discount on yearly plan for early payment</li>
        </ul>
      </div>
    </div>
  );
}

export default Pricing;
