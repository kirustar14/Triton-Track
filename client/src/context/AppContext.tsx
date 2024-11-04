import { createContext, useState } from "react";
import { Expense } from "../types/types";
import React, { act } from 'react'; 

// Exercise: Create add budget to the context

interface AppContextType {
  expenses: Expense[];
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>;
  budget: number; 
}

const initialState: AppContextType = {
  expenses: [],
  setExpenses: () => {},
  budget: 1000
};

export const AppContext = createContext<AppContextType>(initialState);

export const AppProvider = (props: any) => {
  const [expenses, setExpenses] = useState<Expense[]>(initialState.expenses);

  return (
    <AppContext.Provider
      value={{
        expenses: expenses,
        setExpenses: setExpenses,
        budget: 1000
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
