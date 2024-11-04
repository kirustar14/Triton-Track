import ExpenseItem from "./ExpenseItem";
import { AppContext } from "../../context/AppContext";
import { useContext, useEffect } from "react";
import { Expense } from "../../types/types";
import { fetchExpenses } from "../../utils/expense-utils"; // Import fetchExpenses

const ExpenseList = () => {
  const { expenses, setExpenses } = useContext(AppContext);
  // Fetch expenses on component mount
  useEffect(() => {
    loadExpenses();
    }, []);

    // Fetch expenses on component mount
  useEffect(() => {
    loadExpenses();
    }, []);
  
    // Function to load expenses and handle errors
    const loadExpenses = async () => {
    try {
      const expenseList = await fetchExpenses();
      setExpenses(expenseList);
    } catch (err: any) {
      console.log(err.message);
    }
    };
  

  return (
    <ul className="list-group">
      {expenses.map((expense: Expense) => (
        <ExpenseItem key={expense.id} id={expense.id} description={expense.description} cost={expense.cost} />
        ))}


    </ul>
  );
};

export default ExpenseList;
