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
  const [showAlert, setShowAlert] = useState(false);  // Error alert state
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);  // Success alert state

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

    // Hide the alerts if the user starts typing again
    if (showAlert) setShowAlert(false);
    if (showSuccessAlert) setShowSuccessAlert(false);
  };

  const handleSave = async () => {
    // Check if any field is empty
    if (!formValues.name || !formValues.email || !formValues.password) {
      setShowAlert(true);  // Show error alert if validation fails
      window.scrollTo({ top: 0, behavior: 'smooth' });  // Scroll to the top of the page smoothly
      return;  // Exit the function if validation fails
    }

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

      // Show success alert when customer is saved successfully
      setShowSuccessAlert(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });  // Scroll to the top to show the success alert

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
    if (selectedCustomer) {
      setSelectedCustomer(null);
      setFormState('Add');
      setFormValues({ name: '', email: '', password: '' });
    }
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
      {/* Error Alert */}
      {showAlert && (
        <div className="alert alert-dismissible alert-danger">
          <button
            type="button"
            className="btn-close"
            onClick={() => setShowAlert(false)}  // Close the alert
          ></button>
          <strong>Oh snap!</strong> <a href="#" className="alert-link">Change a few things up</a> and try submitting again.
        </div>
      )}

      {/* Success Alert */}
      {showSuccessAlert && (
        <div className="alert alert-dismissible alert-success">
          <button
            type="button"
            className="btn-close"
            onClick={() => setShowSuccessAlert(false)}  // Close the alert
          ></button>
          <strong>Well done!</strong> You successfully read this important alert message.
        </div>
      )}

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
