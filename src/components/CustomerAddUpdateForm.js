import React from 'react';

function CustomerAddUpdateForm({ formState, formValues, onInputChange, onSave, onDelete, onCancel }) {
  return (
    <>
      <h2 className="mb-4 mt-4">{formState} Customer</h2>
      <form>
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
        onChange={onInputChange}
        placeholder="Enter Name"
        required
      />
    </div>
  </div>

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

  <button type="button" className="btn btn-primary " onClick={onSave}>Save</button>
  <button type="button" className="btn btn-danger m-2" onClick={onDelete}>Delete</button>
  <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
</form>

    </>
  );
}

export default CustomerAddUpdateForm;
