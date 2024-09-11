import React from 'react';

function CustomerList({ customers, onRowClick, selectedCustomer }) {
  const getRowStyle = (customer) => {
    return selectedCustomer && selectedCustomer._id === customer._id ? { fontWeight: 'bold' } : {};
  };

  return (
    <>
      <h2 className="mb-3">Customer List</h2>
      <table className="table table-striped table-bordered">
        <thead className="thead-light">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr
              key={customer._id}
              onClick={() => onRowClick(customer)}
              style={getRowStyle(customer)}
              className="cursor-pointer"
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
