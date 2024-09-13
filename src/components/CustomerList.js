import React from "react";

// CustomerList component: renders a list of customers in a table format
function CustomerList({ customers, onRowClick, selectedCustomer }) {
  
  // Conditionally style a row (bold text) if it's the selected customer
  const getRowStyle = (customer) => {
    return selectedCustomer && selectedCustomer._id === customer._id
      ? { fontWeight: "bold" } // Bold the row for the selected customer
      : {}; // Default style for non-selected customers
  };

  return (
    <>
      <h2 className="mb-3">Customer List</h2>

      {/* Table to display the customer data */}
      <table className="table table-striped table-bordered">
        <thead className="thead-light">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
          </tr>
        </thead>
        <tbody>
          {/* Map through customers array to render each customer's data */}
          {customers.map((customer) => (
            <tr
              key={customer._id} // Unique key for each customer row
              onClick={() => onRowClick(customer)} // Handle row click event to select/deselect customer
              style={getRowStyle(customer)} // Apply conditional styling for selected customer
              className="cursor-pointer" // Change cursor to pointer to indicate clickable rows
            >
              <td>{customer.name}</td>
              <td>{customer.email}</td>
              <td>{customer.password}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default CustomerList;
