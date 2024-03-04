import { getUserById } from "./users";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// export const getAllHelpRequests = async () => {
//     try {
//         const requestOptions = {
//             method: "GET",
//             headers: {}
//         };

//         const response = await fetch(`${BACKEND_URL}/help_requests`, requestOptions);
//         if (response.status !== 200) {
//             throw new Error('Failed to fetch all help requests');
//         }

//         const data = await response.json();
//         return data;
        
//     } catch(error) {
//         console.error("API Error:", error);
//         throw error;
//     }
// }

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

// export const getAllHelpRequestsWithUsers = async () => {
//     try {
//         const requestOptions = {
//             method: "GET",
//             headers: {},
//         };

//         const response = await fetch(`${BACKEND_URL}/help_requests`, requestOptions);
//         if (response.status !== 200) {
//             throw new Error('Failed to fetch all help requests');
//         }

//         const helpRequests = await response.json();

//         // Fetch user details for each help request
//         const helpRequestsWithUsers = [];
//         for (const helpRequest of helpRequests) {
//             try {
//                 const user = await getUserById(helpRequest.user_id);
//                 helpRequestsWithUsers.push({ ...helpRequest, user });
//             } catch (error) {
//                 console.error("Error fetching user details:", error);
//                 helpRequestsWithUsers.push({ ...helpRequest, user: null });
//             }
//         }

//         return helpRequestsWithUsers;
        
//     } catch(error) {
//         console.error("API Error:", error);
//         throw error;
//     }
// }


export const getHelpRequestById = async (id) => {
    try{
        const requestOptions = {
            method: "GET",
            headers:{}
        };

        const response = await fetch(`${BACKEND_URL}/help_requests/${id}`, requestOptions);
        if (response.status !== 200){
            throw new Error("Failed to fetch help request")
        }

        const data = await response.json()
        console.log("API response: ", data)
        return data
    } catch(error){
        console.error("API Error: ", error)
    }
}


export const getHelpRequestWithUserById = async (requestId) => {
    try {
        // Fetch help request by ID
        const helpRequest = await getHelpRequestById(requestId);
        console.log("getHelpRequestById", helpRequest)

        // Fetch user details using the user_id from the help request
        const user = await getUserById(helpRequest.user_id);

        // Combine help request and user data
        const helpRequestWithUser = {
            ...helpRequest,
            user: {
                id: user.id,
                first_name: user.first_name,
                last_name: user.last_name,
                username: user.username,
                email: user.email,
                avatar_url_string: user.avatar_url_string,
                address: user.address,
            }
        };

        return helpRequestWithUser;
    } catch (error) {
        console.error('Error fetching help request with user:', error);
        throw error;
    }
}

