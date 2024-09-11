import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CustomerPage from './components/CustomerPage';

function App() {
  return (
    <Router>
      <div className="container mt-4">
        <h1 className="mb-4">Customer Management System</h1>

        {/* Navigation Links */}
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/customers">Customer List</Link></li>
            <li><Link to="/form">Add/Update Customer</Link></li>
          </ul>
        </nav>

        {/* Define Routes */}
        <Routes>
          <Route path="/" element={<h2>Welcome to the Customer Management System!</h2>} />
          <Route path="/customers" element={<CustomerPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;