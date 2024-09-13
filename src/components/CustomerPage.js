import React, { useState, useEffect } from "react";
import axios from "axios";
import CustomerList from "./CustomerList";
import CustomerAddUpdateForm from "./CustomerAddUpdateForm";

function CustomerPage() {
  const [formState, setFormState] = useState("Add");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [customers, setCustomers] = useState([]);
  const [showAlert, setShowAlert] = useState(false); // Error alert state
  const [showSuccessAlert, setShowSuccessAlert] = useState(false); // Success alert state
  const [showDeleteSuccessAlert, setShowDeleteSuccessAlert] = useState(false); // Delete success alert state
  const [showNoSelectionAlert, setShowNoSelectionAlert] = useState(false); // No customer selected alert state
  const [showForm, setShowForm] = useState(false); // Form hidden initially

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/customers");
        setCustomers(response.data);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    fetchCustomers();
  }, []);

  // Auto-dismiss alerts after 5 seconds
  useEffect(() => {
    if (
      showAlert ||
      showSuccessAlert ||
      showDeleteSuccessAlert ||
      showNoSelectionAlert
    ) {
      const timeout = setTimeout(() => {
        setShowAlert(false);
        setShowSuccessAlert(false);
        setShowDeleteSuccessAlert(false);
        setShowNoSelectionAlert(false); // Hide the no selection alert after 5 seconds
      }, 5000); // Auto-hide after 5 seconds

      // Cleanup timeout when component unmounts or alert changes
      return () => clearTimeout(timeout);
    }
  }, [
    showAlert,
    showSuccessAlert,
    showDeleteSuccessAlert,
    showNoSelectionAlert,
  ]);

  const handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));

    // Hide the alerts if the user starts typing again
    setShowAlert(false);
    setShowSuccessAlert(false);
    setShowDeleteSuccessAlert(false);
    setShowNoSelectionAlert(false);
  };

  const handleSave = async () => {
    // Check if any field is empty
    if (!formValues.name || !formValues.email || !formValues.password) {
      setShowAlert(true); // Show error alert if validation fails
      setShowSuccessAlert(false); // Hide other alerts
      setShowDeleteSuccessAlert(false);
      setShowNoSelectionAlert(false);
      window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to the top of the page smoothly
      return; // Exit the function if validation fails
    }

    try {
      if (formState === "Update" && selectedCustomer) {
        const response = await axios.put(
          `http://localhost:5000/api/customers/${selectedCustomer._id}`,
          formValues
        );
        setCustomers((prevCustomers) =>
          prevCustomers.map((customer) =>
            customer._id === selectedCustomer._id ? response.data : customer
          )
        );
      } else {
        const response = await axios.post(
          "http://localhost:5000/api/customers",
          formValues
        );
        setCustomers((prevCustomers) => [...prevCustomers, response.data]);
      }

      // Show success alert when customer is saved successfully
      setShowSuccessAlert(true);
      setShowAlert(false); // Hide other alerts
      setShowDeleteSuccessAlert(false);
      setShowNoSelectionAlert(false);
      window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to the top to show the success alert

      setSelectedCustomer(null);
      setFormState("Add");
      setFormValues({ name: "", email: "", password: "" });
    } catch (error) {
      console.error("Error saving customer:", error);
    }
  };

  const handleDelete = async () => {
    if (!selectedCustomer) {
      // Show no selection alert if no customer is selected
      setShowNoSelectionAlert(true);
      setShowAlert(false); // Hide other alerts
      setShowSuccessAlert(false);
      setShowDeleteSuccessAlert(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return; // Exit function if no customer is selected
    }

    try {
      await axios.delete(
        `http://localhost:5000/api/customers/${selectedCustomer._id}`
      );
      setCustomers((prevCustomers) =>
        prevCustomers.filter(
          (customer) => customer._id !== selectedCustomer._id
        )
      );
      setSelectedCustomer(null);
      setFormState("Add");
      setFormValues({ name: "", email: "", password: "" });

      // Show delete success alert
      setShowDeleteSuccessAlert(true);
      setShowAlert(false); // Hide other alerts
      setShowSuccessAlert(false);
      setShowNoSelectionAlert(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };

  const handleCancel = () => {
    if (selectedCustomer) {
      setSelectedCustomer(null);
      setFormState("Add");
      setFormValues({ name: "", email: "", password: "" });
    }
  };

  const handleRowClick = (customer) => {
    if (selectedCustomer && selectedCustomer._id === customer._id) {
      setSelectedCustomer(null);
      setFormState("Add");
      setFormValues({ name: "", email: "", password: "" });
    } else {
      setSelectedCustomer(customer);
      setFormState("Update");
      setFormValues({
        name: customer.name,
        email: customer.email,
        password: customer.password,
      });
    }
  };

  // Toggle form visibility
  const toggleFormVisibility = () => {
    setShowForm(!showForm);
  };

  return (
    <div>
      {/* Error Alert */}
      {showAlert && (
        <div class="alert alert-dismissible alert-danger">
          <button
            type="button"
            class="btn-close"
            onClick={() => setShowAlert(false)}
          ></button>
          <strong>Missing Fields!</strong> Please fill out all fields before
          submitting the form.
        </div>
      )}

      {/* Success Alert */}
      {showSuccessAlert && (
        <div class="alert alert-dismissible alert-success">
          <button
            type="button"
            class="btn-close"
            onClick={() => setShowSuccessAlert(false)}
          ></button>
          <strong>Success!</strong> The customer has been successfully
          created/updated.
        </div>
      )}

      {/* Delete Success Alert */}
      {showDeleteSuccessAlert && (
        <div class="alert alert-dismissible alert-success">
          <button
            type="button"
            class="btn-close"
            onClick={() => setShowDeleteSuccessAlert(false)}
          ></button>
          <strong>Success!</strong> The customer has been successfully deleted.
        </div>
      )}

      {/* No Selection Alert */}
      {showNoSelectionAlert && (
        <div class="alert alert-dismissible alert-danger">
          <button
            type="button"
            class="btn-close"
            onClick={() => setShowNoSelectionAlert(false)}
          ></button>
          <strong>No Customer Selected!</strong> Please select a customer to
          delete.
        </div>
      )}

      {/* Customer List */}
      <CustomerList
        customers={customers}
        onRowClick={handleRowClick}
        selectedCustomer={selectedCustomer}
      />

      {/* Toggle Form Button below the table */}
      <button
        type="button"
        className="btn btn-info my-4"
        onClick={toggleFormVisibility}
      >
        {showForm ? "Hide Form" : "Show Form"}
      </button>

      {/* Conditionally Render Form */}
      {showForm && (
        <CustomerAddUpdateForm
          formState={formState}
          formValues={formValues}
          onInputChange={handleInputChange}
          onSave={handleSave}
          onDelete={handleDelete}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
}

export default CustomerPage;
