const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

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
        return data;

    } catch(error) {
        console.error("API Error", error)
    }
}