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
        // console.log("DATA", data)
        return data;
        
    } catch(error) {
        console.error("API Error:", error);
        throw error;
    }
}

export const getAllHelpRequestsWithUserDetailsAndPlant = async () => {
    try {
        const requestOptions = {
            method: "GET",
            headers: {}
        };

        const response = await fetch(`${BACKEND_URL}/help_requests3`, requestOptions);
        if (!response.ok) {
            throw new Error('Failed to fetch all help requests with user details');
        }

        const data = await response.json();
        // console.log("DATA", data)
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

export const createHelpRequest = async (title, message, start_date, end_date, maxprice, userId, token) => {
    try {
        const payload = {
            title: title,
            message: message,
            start_date: start_date,
            end_date: end_date,
            maxprice: maxprice
        }

        const requestOptions = {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        }

        const response =  await fetch(`${BACKEND_URL}/help_requests/create/${userId}`, requestOptions)
        if (response.status !== 200) {
            throw new Error("Unable to make POST request for create request");
        }

        const data = await response.json();
        // console.log("DATA", data);
        return data;

    } catch(error) {
        console.error("API error", error)
    }
}

// THIS NEEDS TO BE FIXED IN CASE THE USER STARTS HIS FIRST OFFER 
export const getAllRequestsByOneUser = async (userId, token) => {
    try {
        const requestOptions = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        };

        const response = await fetch(`${BACKEND_URL}/help_requests/user/${userId}`, requestOptions)
        if (response.status !== 200) {
            throw new Error("Unable to make GET request for get all requests by one user");
        }
    
        const data = await response.json();
        // console.log("DATA", data);
        return data;

    } catch(error) {
        console.error("API Error", error)
    }
}