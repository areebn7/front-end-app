import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import CustomerPage from './components/CustomerPage';
import Layout from './components/Layout';
import Home from './components/Home'; // Import Home component
import About from './components/About';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/customers" element={<CustomerPage />} />
          <Route path="/about" element={<About />} />
          {/* Catch-all Route for undefined URLs */}
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
