import React from "react";

// Handles the form for adding or updating a customer
function CustomerAddUpdateForm({
  formState, // State of the form, either 'Add' or 'Update'
  formValues, // Current values of the form fields (name, email, password)
  onInputChange, // Handle changes in form inputs
  onSave, // Handle saving the form
  onDelete, // Handle deleting a customer
  onCancel, // Handle form cancellation
}) {
  return (
    <>
      {/* Form title changes based on the formState (Add or Update) */}
      <h2 className="mb-4 mt-4">{formState} Customer</h2>

      {/* Form element for customer details */}
      <form>
        {/* Name field */}
        <div className="row mb-4">
          <div className="col-md-2">
            <label htmlFor="name">Name</label>
          </div>
          <div className="col-md-10">
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={formValues.name} 
              onChange={onInputChange} // Call onInputChange on input change
              placeholder="Enter Name"
              required
            />
          </div>
        </div>

        {/* Email field */}
        <div className="row mb-4">
          <div className="col-md-2">
            <label htmlFor="email">Email</label>
          </div>
          <div className="col-md-10">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formValues.email} 
              onChange={onInputChange} 
              placeholder="Enter Email"
              required
            />
          </div>
        </div>

        {/* Password field */}
        <div className="row mb-4">
          <div className="col-md-2">
            <label htmlFor="password">Password</label>
          </div>
          <div className="col-md-10">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={formValues.password} 
              onChange={onInputChange} 
              placeholder="Enter Password"
              required
            />
          </div>
        </div>

        {/* Button group for Save, Delete, and Cancel actions */}
        <div className="row">
          <div className="col-md-12">
            <div className="d-flex justify-content-end mb-4">
              <button
                type="button"
                className="btn btn-dark mx-1"
                onClick={onSave} // Handle save action
              >
                Save
              </button>
              <button
                type="button"
                className="btn btn-danger mx-1"
                onClick={onDelete} // Handle delete action
              >
                Delete
              </button>
              <button
                type="button"
                className="btn btn-light mx-1"
                onClick={onCancel} // Handle cancel action
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default CustomerAddUpdateForm;
