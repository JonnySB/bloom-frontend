const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const getReceivedHelpOffersByUserId = async (user_id) => {
    try {
        const requestOptions = {
            method: "GET",
            headers: {}
        };

        const response = await fetch(`${BACKEND_URL}/help_offers/help_requests/${user_id}`, requestOptions);
        if (!response.ok) {
            throw new Error('Failed to fetch all help requests with user details');
        }

        const data = await response.json();
        return data;
        
    } catch(error) {
        console.error("API Error:", error);
        throw error;
    }
}
