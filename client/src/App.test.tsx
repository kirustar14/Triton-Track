import React, { act } from 'react'; 
import { render, screen, fireEvent } from '@testing-library/react';
import { AppProvider } from './context/AppContext';
import {MyBudgetTracker} from './views/MyBudgetTracker';

describe('Budget Tracker App', () => {
  beforeEach(() => {
    render(
      <AppProvider>
        <MyBudgetTracker />
      </AppProvider>
    );
  });

  test('renders My Budget Planner', () => {
    render(
      <AppProvider>
        <MyBudgetTracker />
      </AppProvider>
    );
    const headerElements = screen.getAllByText(/My Budget Planner/i);
    expect(headerElements[0]).toBeInTheDocument(); // Check the first occurrence
  });
  
  

  test('create an expense', async () => {
    const expenseName = 'Groceries';
    const expenseCost = '50';

    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: expenseName } });
    fireEvent.change(screen.getByLabelText(/cost/i), { target: { value: expenseCost } });
    fireEvent.click(screen.getByText(/save/i));

    expect(screen.getByText(expenseName)).toBeInTheDocument();
  });

  test('delete an expense', async () => {
    const expenseName = 'Groceries';
    const expenseCost = '50';

    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: expenseName } });
    fireEvent.change(screen.getByLabelText(/cost/i), { target: { value: expenseCost } });
    fireEvent.click(screen.getByText(/save/i));

    expect(screen.getByText(expenseName)).toBeInTheDocument();

    const deleteButton = screen.getByText(/x/i);
    fireEvent.click(deleteButton);

    expect(screen.queryByText(expenseName)).not.toBeInTheDocument();
  });
  

  test('budget balance verification', () => {
    const expenseName1 = 'Groceries';
    const expenseCost1 = '50';
    const expenseName2 = 'Utilities';
    const expenseCost2 = '100';

    // Create two expenses
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: expenseName1 } });
    fireEvent.change(screen.getByLabelText(/cost/i), { target: { value: expenseCost1 } });
    fireEvent.click(screen.getByText(/save/i));
    
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: expenseName2 } });
    fireEvent.change(screen.getByLabelText(/cost/i), { target: { value: expenseCost2 } });
    fireEvent.click(screen.getByText(/save/i));

    // Check the budget balance verification
    const totalSpent = parseFloat(expenseCost1) + parseFloat(expenseCost2);
    expect(screen.getByText(/spent so far/i)).toHaveTextContent(`$${totalSpent}`);
    expect(screen.getByText(/remaining/i)).toHaveTextContent(`$${1000 - totalSpent}`);
  });

  test('alert when remaining balance is negative', () => {
    const expenseName = 'Expensive Item';
    const expenseCost = '1100'; // Exceeds budget

    // Input expense name
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: expenseName } });

    // Input expense cost
    fireEvent.change(screen.getByLabelText(/cost/i), { target: { value: expenseCost } });

    // Mock window alert
    window.alert = jest.fn();

    // Submit the form
    fireEvent.click(screen.getByText(/save/i));

    // Verify alert was called
    expect(window.alert).toHaveBeenCalledWith('You have exceeded your budget!'); // Fix typo if necessary

  });
  

});
