const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const getAllHelpRequests = async () => {
    try {
        const requestOptions = {
            method: "GET",
            headers: {}
        };

        const response = await fetch(`${BACKEND_URL}/help_requests`, requestOptions);
        if (response.status !== 200) {
            throw new Error('Failed to fetch all help requests');
        }

        const data = await response.json();
        console.log("API Response:", data);
        return data.help_requests;
        
    } catch(error) {
        console.error("API Error:", error);
        throw error;
    }
}
