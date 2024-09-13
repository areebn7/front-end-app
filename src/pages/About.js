import React from "react";

function About() {
  return (
    <div className="container mt-5">
      <h1 className="display-4 mb-4 text-center">Application Requirements</h1>
      <p className="lead text-center mb-5">
        Here are the key requirements for the Customer Management System application:
      </p>
      <div className="list-group">
        <div className="list-group-item list-group-item-action">
          <h5 className="mb-1">1. Display Customer Records</h5>
          <p className="mb-1">
            The app should display a list of Customer records with the label “Customer List” above the list.
          </p>
        </div>
        <div className="list-group-item list-group-item-action">
          <h5 className="mb-1">2. Customer Selection and Highlighting</h5>
          <p className="mb-1">
            Users can select a record by clicking on it. Selected records should appear in bold, and clicking on an already selected record should remove the selection.
          </p>
        </div>
        <div className="list-group-item list-group-item-action">
          <h5 className="mb-1">3. Add-Update Form</h5>
          <p className="mb-1">
            The section below the Customer list should hold an add-update form with fields for name, email, and password. The form title should be “Add” or “Update” depending on the mode.
          </p>
        </div>
        <div className="list-group-item list-group-item-action">
          <h5 className="mb-1">4. Manage Records</h5>
          <p className="mb-1">
            Three buttons—Delete, Save, and Cancel—should appear below the form. Clicking Save when a record is selected updates the record, while clicking Delete removes the selected record. Clicking Cancel deselects the record and clears the form.
          </p>
        </div>
        <div className="list-group-item list-group-item-action">
          <h5 className="mb-1">5. New Record Addition</h5>
          <p className="mb-1">
            When no record is selected and data is entered into the form, clicking Save adds a new record. The Customer List should update to include the new record.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
