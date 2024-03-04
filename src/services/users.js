const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const getUserById = async (userId, token) => {
    try{
        const requestOptions = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const response = await fetch(`${BACKEND_URL}/user_details/${userId}`, requestOptions);
        if (response.status !== 200){
            throw new Error("Unable to fetch user")
        }

        const data = await response.json();
        console.log("API response: ", data)
        return data
    } catch(error){
        console.error("API Error: ", error)
    }
}
