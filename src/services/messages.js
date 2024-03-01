// docs: https://vitejs.dev/guide/env-and-mode.html
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;


export const getAllMessagesByUserId = async (user_id) => {
    const payload = {
        user_id: user_id,
    };

    const requestOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    };
    
    const response = await fetch(`${BACKEND_URL}/messages/`, requestOptions)

    if (response.status === 200) {
        const data = await response.json();
        console.log("Messages loaded ")
        return data
      } else {
        const errorResponse = await response.json(); 
        throw new Error(errorResponse);
    }
}