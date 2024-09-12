import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const goToCustomers = () => {
    navigate("/customers");
  };

  return (
    <div className="container mt-5">
      <div className="text-center">
        <h1 className="display-4 mb-4">Customer Management System</h1>
        <p className="lead mb-5">
          Streamline your customer management with our modern system built with
          the MERN stack to efficiently handle your customer data.
        </p>
        <img
          src="https://www.techinsights.com/sites/default/files/2024-04/can-AI-microprocessors-be-sustainable-new-NVIDIA-blackwell-chip-breakthrough-for-high-tech-industry.jpg"
          alt="Customer Management System"
          className="img-fluid mb-5 rounded shadow"
        />

        <p className="mb-4">
          Navigate through a user-friendly interface to view and manage customer
          information. Whether you need to onboard new clients, update details,
          or remove outdated records, our system is designed for optimal
          efficiency.
        </p>
        <button className="btn btn-primary btn-lg" onClick={goToCustomers}>
          Get Started
        </button>
      </div>

      <div className="row mt-5 mb-4">
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Onboard New Clients</h5>
              <p className="card-text">
                Quickly add new customers to your system using an intuitive
                form.
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Edit Customer Information</h5>
              <p className="card-text">
                Update existing customer details to keep your records current
                and accurate.
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Remove Unnecessary Data</h5>
              <p className="card-text">
                Delete outdated customer entries to maintain a clean and
                organized database.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
