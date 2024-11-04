import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { fetchBudget } from "../utils/budget-utils";

const Remaining = () => {
  const { expenses } = useContext(AppContext);
  const [budget, setBudget] = useState<number | null>(null);

  useEffect(() => {
    const loadBudget = async () => {
      try {
        const budgetValue = await fetchBudget();
        setBudget(budgetValue);
      } catch (error) {
        console.error("Failed to load budget:", error);
      }
    };

    loadBudget();
  }, []);

  const totalExpenses = expenses.reduce((total, item) => {
    return total + item.cost;
  }, 0);

  const alertType = budget !== null && totalExpenses > budget ? "alert-danger" : "alert-success";

  // Ensure budget is not null before calculating remainingBalance
  const remainingBalance = budget !== null ? budget - totalExpenses : 0;

  useEffect(() => {
    if (remainingBalance < 0) {
      alert("You have exceeded your budget!");
    }
  }, [remainingBalance]);

  return (
    <div className={`alert ${alertType}`}>
      <span>Remaining: ${budget !== null ? remainingBalance : "Loading..."}</span>
    </div>
  );
};

export default Remaining;
