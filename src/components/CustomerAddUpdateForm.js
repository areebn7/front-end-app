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

        <div className="row">
          <div className="col-md-12">
            {/* Button Container aligned to the right */}
            <div className="d-flex justify-content-end mb-4">
              <button type="button" className="btn btn-dark mx-1" onClick={onSave}>Save</button>
              <button type="button" className="btn btn-danger mx-1" onClick={onDelete}>Delete</button>
              <button type="button" className="btn btn-light mx-1" onClick={onCancel}>Cancel</button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default CustomerAddUpdateForm;
