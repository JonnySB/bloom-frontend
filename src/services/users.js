const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const getuserInformationById = async (userId) => {
    const requestOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    };
    const response = await fetch(`${BACKEND_URL}/user_details/${userId}`, requestOptions);

    if (response.status === 200) {
        const data = await response.json();
    // console.log("user details loaded loaded ");
        return data;
    } else {
        const errorResponse = await response.json();
        console.error('Full error response:', errorResponse);
        throw new Error(`Error fetching userdetails : ${errorResponse}`);
    }
}

export const editUsersInformation = async (form, token) => {
    console.log("Preparing to send edit request with form data:", form);

    const requestOptions = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
            first_name: form.firstName,
            last_name: form.lastName,
            username: form.userName,
            email: form.email,
            address: form.address,
        }),
    };
    
    console.log("Request options:", requestOptions);

    const response = await fetch(`${BACKEND_URL}/edit_user_details/${form.userId}`, requestOptions);

    console.log("Response received", response);

    if (response.ok) {
        try {
            const data = await response.json();
            console.log("Response data loaded successfully:", data);
            return data;
        } catch (error) {
            console.error("Failed to parse response JSON:", error);
            throw new Error("Failed to parse response JSON.");
        }
    } else {
        console.error("Response status was not OK:", response.status);
        try {
            const errorResponse = await response.json();
            console.error('Full error response:', errorResponse);
            throw new Error(`Error from server: ${errorResponse.message || 'Unknown error'}`);
        } catch (error) {
            throw new Error("Failed to parse error response JSON.");
        }
    }
};
