import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import CustomerPage from './components/CustomerPage';
import Layout from './components/Layout';
import Home from './components/Home'; // Import Home component

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/customers" element={<CustomerPage />} />

          {/* Catch-all Route for undefined URLs */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
