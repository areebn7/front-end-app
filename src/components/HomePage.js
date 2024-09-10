import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function HomePage() {
  // State for form mode (Add/Update)
  const [formState, setFormState] = useState('Add');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    // Fetch customers from the backend
    const fetchCustomers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/customers');
        setCustomers(response.data);
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };

    fetchCustomers();
  }, []);

  const handleSave = async () => {
    try {
      if (formState === 'Update' && selectedCustomer) {
        // Update the existing customer (PUT request)
        const response = await axios.put(`http://localhost:5000/api/customers/${selectedCustomer._id}`, formValues);
        
        // Update the customers list with the updated customer
        setCustomers((prevCustomers) =>
          prevCustomers.map((customer) =>
            customer._id === selectedCustomer._id ? response.data : customer
          )
        );
        
        console.log('Customer updated successfully');
      } else {
        // Add a new customer (POST request)
        const response = await axios.post('http://localhost:5000/api/customers', formValues);
        
        // Add the new customer to the customers list
        setCustomers((prevCustomers) => [...prevCustomers, response.data]);
        
        console.log('Customer added successfully');
      }

      // Reset the form after saving
      setSelectedCustomer(null);
      setFormState('Add');
      setFormValues({ name: '', email: '', password: '' });
    } catch (error) {
      console.error('Error saving customer:', error);
    }
  };

  const handleDelete = async () => {
    if (selectedCustomer) {
      try {
        // Send DELETE request to the backend
        await axios.delete(`http://localhost:5000/api/customers/${selectedCustomer._id}`);
        
        // Update the customer list after deletion
        setCustomers(prevCustomers => prevCustomers.filter(customer => customer._id !== selectedCustomer._id));

        // Clear the form and unselect the customer
        setSelectedCustomer(null);
        setFormState('Add');
        setFormValues({ name: '', email: '', password: '' });
        
        console.log('Customer deleted successfully');
      } catch (error) {
        console.error('Error deleting customer:', error);
      }
    }
  };

  const handleCancel = () => {
    if (selectedCustomer) {
      setSelectedCustomer(null);
      setFormState('Add');
      setFormValues({ name: '', email: '', password: '' });
    }
  };

  const handleRowClick = (customer) => {
    if (selectedCustomer && selectedCustomer._id === customer._id) {
      // If the selected customer is clicked again, unselect it
      setSelectedCustomer(null);
      setFormState('Add');
      setFormValues({ name: '', email: '', password: '' });
    } else {
      // Select the customer and update the form
      setSelectedCustomer(customer);
      setFormState('Update');
      setFormValues({ name: customer.name, email: customer.email, password: customer.password });
    }
  };

  const getRowStyle = (customer) => {
    return selectedCustomer && selectedCustomer._id === customer._id ? { fontWeight: 'bold' } : {};
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues(prevValues => ({
      ...prevValues,
      [name]: value
    }));
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Customer Management System</h1>

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
              key={customer._id}
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
        <button type="button" className="btn btn-primary" onClick={handleSave}>Save</button>
        <button type="button" className="btn btn-danger m-2" onClick={handleDelete}>Delete</button>
        <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
      </form>
    </div>
  );
}

export default HomePage;