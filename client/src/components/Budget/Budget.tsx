import React, { useEffect, useState } from 'react';
import { fetchBudget, updateBudget } from '../../utils/budget-utils';

const Budget = () => {
  const [budget, setBudget] = useState<number | null>(null);
  const [newAmount, setNewAmount] = useState<number | ''>('');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);

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

  const handleUpdateBudget = async () => {
    if (typeof newAmount === 'number' && newAmount > 0) {
      try {
        await updateBudget(newAmount); // Call the updateBudget function
        setBudget(newAmount); // Update state with the new budget
        setNewAmount(''); // Clear input field
        setIsEditing(false); // Exit edit mode
      } catch (error) {
        console.error("Failed to update budget:", error);
        setMessage("Failed to update budget.");
      }
    } else {
      setMessage("Please enter a valid budget amount.");
    }
  };

  return (
    <div className="alert alert-secondary p-3 d-flex align-items-center justify-content-between">
      <div>
        Budget: ${budget !== null ? budget : "Loading..."}
      </div>
      {!isEditing ? (
        <button className="btn btn-secondary ms-2" onClick={() => {
          if (budget !== null) {
            setNewAmount(budget); // Set the current budget to the input when editing
          }
          setIsEditing(true);
        }}>
          Edit
        </button>
      ) : (
        <>
          <input
            type="number"
            value={newAmount}
            onChange={(e) => setNewAmount(Number(e.target.value))}
            placeholder="Enter new budget amount"
            required
            min="0"
            className="form-control mt-2"
            style={{ width: '120px', display: 'inline-block' }}
          />
          <button className="btn btn-primary ms-2" onClick={handleUpdateBudget}>
            Save
          </button>
        </>
      )}
      {message && <div className="mt-2">{message}</div>}
    </div>
  );
};

export default Budget;
