import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function HomePage() {
  // Static array of customer data with IDs
  const customers = [
    { id: 1, name: 'Areeb', email: 'areeb@adp.com', password: 'itachi23' },
    { id: 2, name: 'Tuan', email: 'tuan@adp.com', password: 'ronaldo7' },
    { id: 3, name: 'Pranjal', email: 'pranjal@adp.com', password: 'onepiece12' },
  ];

  // State for form mode (Add/Update)
  const [formState, setFormState] = useState('Add');
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  // State for form inputs
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    password: ''
  });

  // Placeholder functions for buttons
  const handleSave = () => {
    console.log('Save button clicked');
  };

  const handleDelete = () => {
    console.log('Delete button clicked');
  };

  const handleCancel = () => {
    console.log('Cancel button clicked');
  };

  // Function to handle row click
  const handleRowClick = (customer) => {
    if (selectedCustomer && selectedCustomer.id === customer.id) {
      // Clear the form and unbold the row
      setSelectedCustomer(null);
      setFormState('Add');
      setFormValues({ name: '', email: '', password: '' });
    } else {
      // Set selected customer and update the form state
      setSelectedCustomer(customer);
      setFormState('Update');
      setFormValues({ name: customer.name, email: customer.email, password: customer.password });
    }
  };

  // Function to determine if a row should be bold
  const getRowStyle = (customer) => {
    return selectedCustomer && selectedCustomer.id === customer.id ? { fontWeight: 'bold' } : {};
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues(prevValues => ({
      ...prevValues,
      [name]: value
    }));
  };

  return (
    <div className="container mt-4">
      {/* Title */}
      <h1 className="mb-4">Customer Management System</h1>

      {/* Table of customers */}
      <h2 className="mb-3">Customer List</h2>
      <table className="table table-striped table-bordered">
        <thead className="thead-light">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr
              key={customer.id}
              onClick={() => handleRowClick(customer)}
              style={getRowStyle(customer)}
              className="cursor-pointer"
            >
              <td>{customer.name}</td>
              <td>{customer.email}</td>
              <td>{customer.password}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Customer form */}
      <h2 className="mb-3">{formState} Customer</h2>
      <form>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formValues.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formValues.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={formValues.password}
            onChange={handleInputChange}
          />
        </div>
        {/* Buttons */}
        <button type="button" className="btn btn-primary" onClick={handleSave}>Save</button>
        <button type="button" className="btn btn-danger m-2" onClick={handleDelete}>Delete</button>
        <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
      </form>
    </div>
  );
}

export default HomePage;
