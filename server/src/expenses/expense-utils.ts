import { Database } from "sqlite";
import { Request, Response } from "express";
import { Expense } from "../types"; // Assuming Expense type is still needed

// Create an expense
export async function createExpenseServer(req: Request, res: Response, db: Database) {
    try {
        const { id, cost, description } = req.body as { id: string, cost: number, description: string };

        if (!description || !id || !cost) {
            return res.status(400).send({ error: "Missing required fields" });
        }

        await db.run('INSERT INTO expenses (id, description, cost) VALUES (?, ?, ?);', [id, description, cost]);
        res.status(201).send({ id, description, cost });

    } catch (error) {
        console.error('Error creating expense:', error); // Optional: log for debugging
        return res.status(400).send({ error: `Expense could not be created: ${(error as Error).message}` });
    }
}

// Delete an expense by ID
export async function deleteExpense(req: Request, res: Response, db: Database) {
    const { id } = req.params;

    if (!id) {
        return res.status(400).send({ error: "Missing ID" });
    }

    try {
        // Attempt to delete the expense
        const result = await db.run('DELETE FROM expenses WHERE id = ?;', [id]);

        if (result.changes === 0) {
            // If no rows are affected, the expense wasn't found
            return res.status(404).send({ error: "Expense not found" });
        }

        res.status(204).send(); // No Content response when successful deletion
    } catch (error) {
        console.error('Error deleting expense:', error); // Optional: log for debugging
        res.status(500).send({ error: `Could not delete expense: ${(error as Error).message}` });
    }
}

// Get all expenses
export async function getExpenses(req: Request, res: Response, db: Database) {
    try {
        // Fetch all expenses from the database
        const expenses: Expense[] = await db.all('SELECT * FROM expenses');
        res.status(200).json(expenses); // Send the expenses as a JSON array
    } catch (error) {
        console.error('Error fetching expenses:', error); // Optional: log for debugging
        res.status(500).send({ error: `Could not fetch expenses: ${(error as Error).message}` });
    }
}
