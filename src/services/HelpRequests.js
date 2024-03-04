import { getUserById } from "./users";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const getAllHelpRequestsWithUserDetails = async () => {
    try {
        const requestOptions = {
            method: "GET",
            headers: {}
        };

        const response = await fetch(`${BACKEND_URL}/help_requests2`, requestOptions);
        if (!response.ok) {
            throw new Error('Failed to fetch all help requests with user details');
        }

        const data = await response.json();
        console.log("DATA", data)
        return data;
        
    } catch(error) {
        console.error("API Error:", error);
        throw error;
    }
}

export const getOneHelpRequestById = async (requestId) => {
    try {
        const requestOptions = {
            method: "GET",
            headers: {}
        };

        const response = await fetch(`${BACKEND_URL}/help_requests/${requestId}`, requestOptions);
        if (!response.ok) {
            throw new Error(`Failed to fetch help request with id ${requestId}`);
        }

        const data = await response.json();
        console.log("DATA", data);
        return data;
        
    } catch(error) {
        console.error("API Error:", error);
        throw error;
    }
}
