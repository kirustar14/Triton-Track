import { API_BASE_URL } from "../constants/constants";

// Function to get budget from the backend. Method: GET
export const fetchBudget = async (): Promise<number> => {
    try {
        const response = await fetch(`${API_BASE_URL}/budget`);
        console.log("Response status:", response.status); // Log the response status

        if (!response.ok) {
            throw new Error('Failed to fetch budget');
        }

        const jsonResponse = await response.json(); // Await the json parsing
        console.log("data in fetchBudget", jsonResponse); // Log the response data
        return jsonResponse.data; // Ensure this is the correct property in the response
    } catch (error) {
        console.error("Error in fetchBudget:", error);
        throw error; // Re-throw the error for handling in the component
    }
};


// Function to update budget in backend 
export const updateBudget = async (budget: number): Promise<{ data: number; message: string }> => {
    const response = await fetch(`${API_BASE_URL}/budget`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: budget }),
    });

    if (!response.ok) {
        throw new Error("Failed to update budget");
    }

    const jsonResponse = await response.json();
    return {
        data: jsonResponse.data, // Updated budget
        message: "Budget updated successfully" // Success message
    };
};



