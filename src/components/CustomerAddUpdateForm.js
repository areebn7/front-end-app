import React from 'react';

function CustomerAddUpdateForm({ formState, formValues, onInputChange, onSave, onDelete, onCancel }) {
  return (
    <>
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
            onChange={onInputChange}
            placeholder="Customer Name"
            required
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
            onChange={onInputChange}
            placeholder="Customer Email"
            required
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
            onChange={onInputChange}
            placeholder="Customer Password"
            required
          />
        </div>
        <button type="button" className="btn btn-primary" onClick={onSave}>Save</button>
        <button type="button" className="btn btn-danger m-2" onClick={onDelete}>Delete</button>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
      </form>
    </>
  );
}

export default CustomerAddUpdateForm;
