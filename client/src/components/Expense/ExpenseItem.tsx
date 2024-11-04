import { Expense } from "../../types/types";
import { AppContext } from '../../context/AppContext'; 
import React, { useContext } from "react";
import { deleteExpense } from "../../utils/expense-utils";

const ExpenseItem = ({ id, description, cost }: Expense) => {
  const { expenses, setExpenses } = useContext(AppContext);

  const handleDeleteExpense =  () => {
    try {
      console.log("Deleting expense:", { id, description, cost }); // Log the expense being deleted
      
      deleteExpense(id); 


      // Update local state to remove the deleted expense
      const removedExpenses = expenses.filter(expense => expense.id !== id);
      setExpenses(removedExpenses);
      
      console.log("Updated expenses:", removedExpenses); // Log updated expenses
    } catch (error) {
      console.error("Error deleting expense:", error); // Log any errors
    }
  };

  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <div>{description}</div>
      <div>${cost}</div>
      <div>
        <button onClick={handleDeleteExpense}>x</button>
      </div>
    </li>
  );
};

export default ExpenseItem; 
