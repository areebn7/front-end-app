import React, { useState } from 'react';

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
    <div>
      {/* Title */}
      <h1>Customer Management System</h1>

      {/* Table of customers */}
      <h2>Customer List</h2>
      <table border="1">
        <thead>
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
            >
              <td>{customer.name}</td>
              <td>{customer.email}</td>
              <td>{customer.password}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Customer form */}
      <h2>{formState} Customer</h2>
      <form>
        <label>
          Name: <input type="text" name="name" value={formValues.name} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Email: <input type="email" name="email" value={formValues.email} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Password: <input type="password" name="password" value={formValues.password} onChange={handleInputChange} />
        </label>
        <br />
        {/* Buttons */}
        <button type="button" onClick={handleSave}>Save</button>
        <button type="button" onClick={handleDelete}>Delete</button>
        <button type="button" onClick={handleCancel}>Cancel</button>
      </form>
    </div>
  );
}

export default HomePage;
