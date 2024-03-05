const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const createHelpOffer = async (helpRequestId, message, status, user_id, bid, token) => {
    try {
        const payload = {
            message: message,
            status: status,
            user_id: user_id,
            bid: bid
        }
        const requestOptions = {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        };

        const response = await fetch(`${BACKEND_URL}/help_offers/${helpRequestId}`, requestOptions);
        if (!response.ok) {
            throw new Error(`Failed to create help offer for help request with ID ${helpRequestId}`);
        }

        const data = await response.json();
        console.log("DATA", data);
        return data;
        
    } catch(error) {
        console.error("API Error:", error);
        throw error;
    }
}