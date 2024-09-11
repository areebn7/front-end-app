import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CustomerList from './CustomerList';
import CustomerAddUpdateForm from './CustomerAddUpdateForm';

function CustomerPage() {
  const [formState, setFormState] = useState('Add');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
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

  const handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormValues(prevValues => ({
      ...prevValues,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      if (formState === 'Update' && selectedCustomer) {
        const response = await axios.put(`http://localhost:5000/api/customers/${selectedCustomer._id}`, formValues);
        setCustomers(prevCustomers =>
          prevCustomers.map(customer =>
            customer._id === selectedCustomer._id ? response.data : customer
          )
        );
      } else {
        const response = await axios.post('http://localhost:5000/api/customers', formValues);
        setCustomers(prevCustomers => [...prevCustomers, response.data]);
      }

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
        await axios.delete(`http://localhost:5000/api/customers/${selectedCustomer._id}`);
        setCustomers(prevCustomers => prevCustomers.filter(customer => customer._id !== selectedCustomer._id));
        setSelectedCustomer(null);
        setFormState('Add');
        setFormValues({ name: '', email: '', password: '' });
      } catch (error) {
        console.error('Error deleting customer:', error);
      }
    }
  };

  const handleCancel = () => {
    // This clears the selected customer and resets the form to 'Add' state
    setSelectedCustomer(null);
    setFormState('Add');
    setFormValues({ name: '', email: '', password: '' });  // Reset the form fields
  };
  

  const handleRowClick = (customer) => {
    if (selectedCustomer && selectedCustomer._id === customer._id) {
      setSelectedCustomer(null);
      setFormState('Add');
      setFormValues({ name: '', email: '', password: '' });
    } else {
      setSelectedCustomer(customer);
      setFormState('Update');
      setFormValues({ name: customer.name, email: customer.email, password: customer.password });
    }
  };

  return (
    <div>
      <CustomerList
        customers={customers}
        onRowClick={handleRowClick}
        selectedCustomer={selectedCustomer}
      />
      <CustomerAddUpdateForm
        formState={formState}
        formValues={formValues}
        onInputChange={handleInputChange}
        onSave={handleSave}
        onDelete={handleDelete}
        onCancel={handleCancel}
      />
    </div>
  );
}

export default CustomerPage;
