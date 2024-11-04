import { Response } from 'express';

// Function to get the budget
export function getBudget(res: Response, budget: number) {
    res.status(200).send({ "data": budget });
}

// Function to update the budget
export function updateBudget(res: Response, body: any, budget: { amount: number }) {
    // TO DO: Implement updateBudget function
    const newAmount = body.amount;

    // Validate the incoming amount
    if (typeof newAmount !== 'number' || newAmount < 0) {
        return res.status(400).send({ error: "Invalid budget amount" });
    }

    // Update the budget amount
    budget.amount = newAmount;
    res.status(200).send({ message: "Budget updated successfully", data: budget.amount });
}
