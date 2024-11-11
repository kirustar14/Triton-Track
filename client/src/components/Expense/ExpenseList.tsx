import ExpenseItem from "./ExpenseItem";
import { AppContext } from "../../context/AppContext";
import { useContext, useEffect } from "react";
import { Expense } from "../../types/types";
import { fetchExpenses } from "../../utils/expense-utils"; // Import fetchExpenses

const ExpenseList = () => {
  const { expenses, setExpenses } = useContext(AppContext);

  // Fetch expenses only once on component mount
  useEffect(() => {
    loadExpenses();
  }, []); // Empty dependency array ensures this runs only on mount

  // Function to load expenses and handle errors
  const loadExpenses = async () => {
    try {
      const expenseList = await fetchExpenses(); // Fetch expenses from API
      if (Array.isArray(expenseList)) {
        setExpenses(expenseList); // Set expenses only if it's an array
      } else {
        console.error("Invalid expense data:", expenseList);
      }
    } catch (err: any) {
      console.log("Error loading expenses:", err.message);
    }
  };

  // Ensure expenses is not undefined or null
  const safeExpenses = expenses || []; 

  return (
    <ul className="list-group">
      {safeExpenses.map((expense: Expense) => (
        <ExpenseItem 
          key={expense.id} 
          id={expense.id} 
          description={expense.description} 
          cost={expense.cost} 
        />
      ))}
    </ul>
  );
};

export default ExpenseList;
