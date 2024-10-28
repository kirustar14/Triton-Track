import { Expense } from "../../types/types";
import { AppContext } from '../../context/AppContext'; 
import React, { useContext } from "react";

const ExpenseItem = ({ id, name, cost }: Expense) => {
  const { expenses, setExpenses } = useContext(AppContext);

  const handleDeleteExpense = () => {
    console.log("Deleting expense:", { id, name, cost }); // Log the expense being deleted
    const removedExpenses = expenses.filter(expense => expense.id !== id);
    setExpenses(removedExpenses);
    console.log("Updated expenses:", removedExpenses); // Log updated expenses
  };

  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <div>{name}</div>
      <div>${cost}</div>
      <div>
        <button onClick={handleDeleteExpense}>x</button>
      </div>
    </li>
  );
};

export default ExpenseItem;
