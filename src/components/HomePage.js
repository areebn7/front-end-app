import React from 'react'
import { useState } from 'react';

function HomePage() {
  // Static array of customer data
  const customers = [
    { name: 'Alice', email: 'alice@example.com', password: 'password123' },
    { name: 'Bob', email: 'bob@example.com', password: 'password456' },
    { name: 'Charlie', email: 'charlie@example.com', password: 'password789' },
  ];

// State for form mode (Add/Update)
const [formState, setFormState] = useState('Add');

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
          {customers.map((customer, index) => (
            <tr key={index}>
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
          Name: <input type="text" name="name" />
        </label>
        <br />
        <label>
          Email: <input type="email" name="email" />
        </label>
        <br />
        <label>
          Password: <input type="password" name="password" />
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

export default HomePage