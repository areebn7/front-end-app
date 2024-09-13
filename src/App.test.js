import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import HandleCustomer from './HandleCustomer';

jest.mock('axios');

describe('HandleCustomer Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should toggle form visibility when the "Show Form"/"Hide Form" button is clicked', () => {
    render(<HandleCustomer />);

    const toggleButton = screen.getByText('Show Form');
    
    // Initially, the form should not be visible
    expect(screen.queryByText('Add Customer')).not.toBeInTheDocument();

    // Click the button to show the form
    fireEvent.click(toggleButton);
    expect(screen.getByText('Add Customer')).toBeInTheDocument();

    // Button text should change to 'Hide Form'
    expect(screen.getByText('Hide Form')).toBeInTheDocument();

    // Click the button again to hide the form
    fireEvent.click(screen.getByText('Hide Form'));
    expect(screen.queryByText('Add Customer')).not.toBeInTheDocument();
  });

  test('should trigger save functionality when "Save" button is clicked', () => {
    render(<HandleCustomer />);

    // Simulate clicking the "Show Form" button to show the form
    fireEvent.click(screen.getByText('Show Form'));

    // Find and click the "Save" button
    fireEvent.click(screen.getByText('Save'));

    // Check if the alert is shown when fields are empty
    expect(screen.getByText(/Missing Fields!/)).toBeInTheDocument();
  });

  test('should trigger delete functionality when "Delete" button is clicked with no customer selected', () => {
    render(<HandleCustomer />);

    // Simulate clicking the "Show Form" button to show the form
    fireEvent.click(screen.getByText('Show Form'));

    // Find and click the "Delete" button
    fireEvent.click(screen.getByText('Delete'));

    // Check if the no selection alert is shown
    expect(screen.getByText(/No Customer Selected!/)).toBeInTheDocument();
  });

  test('should trigger cancel functionality when "Cancel" button is clicked', () => {
    render(<HandleCustomer />);

    // Simulate clicking the "Show Form" button to show the form
    fireEvent.click(screen.getByText('Show Form'));

    // Fill the form fields
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });

    // Click the "Cancel" button
    fireEvent.click(screen.getByText('Cancel'));

    // The form should be cleared
    expect(screen.getByLabelText('Name').value).toBe('');
    expect(screen.getByLabelText('Email').value).toBe('');
    expect(screen.getByLabelText('Password').value).toBe('');
  });
});
