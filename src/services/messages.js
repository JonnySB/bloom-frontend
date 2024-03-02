// docs: https://vitejs.dev/guide/env-and-mode.html
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;


export const getAllMessagesByUserId = async (userId) => {
    const requestOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTcwOTM3OTA3MiwianRpIjoiODA1MzNkNjgtZWRhNS00YWVlLTgwYmMtNGQ4ZWJmYjZmYWVlIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6MSwibmJmIjoxNzA5Mzc5MDcyLCJjc3JmIjoiZWUxNjRkZDctYTU1OC00OGQ1LWIwODktNmExNWI2NWE5ZTdkIiwiZXhwIjoxNzA5NDY1NDcyfQ.dgwVVOUWGY555I7S8PcwRpRZ8i1udu8zORMhuS5gcVY`,
        },
    };
    
    const response = await fetch(`${BACKEND_URL}/messages/user/${userId}`, requestOptions);

    if (response.status === 200) {
        const data = await response.json();
        // console.log("Messages loaded ");
        return data;
    } else {
        const errorResponse = await response.json();
        console.error('Full error response:', errorResponse);
        throw new Error(`Error fetching messages: ${errorResponse}`);
    }
}

export const getMessagesById = async (chat_id) => {
    const requestOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTcwOTM3OTA3MiwianRpIjoiODA1MzNkNjgtZWRhNS00YWVlLTgwYmMtNGQ4ZWJmYjZmYWVlIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6MSwibmJmIjoxNzA5Mzc5MDcyLCJjc3JmIjoiZWUxNjRkZDctYTU1OC00OGQ1LWIwODktNmExNWI2NWE5ZTdkIiwiZXhwIjoxNzA5NDY1NDcyfQ.dgwVVOUWGY555I7S8PcwRpRZ8i1udu8zORMhuS5gcVY`,
          
        },

    };
    
    const response = await fetch(`${BACKEND_URL}/messages/${chat_id}`, requestOptions);

    if (response.status === 200) {
        const data = await response.json();
        // console.log("Messages loaded ");
        return data;
    } else {
        const errorResponse = await response.json();
        console.error('Full error response:', errorResponse);
        throw new Error(`Error fetching messages: ${errorResponse}`);
    }
}


