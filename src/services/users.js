const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const getUserInformationById = async (userId) => {
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

    const response = await fetch(`${BACKEND_URL}/edit_user_details/${form.userId}`, requestOptions);

    if (response.ok) {
        try {
            const data = await response.json();
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

export const editUserAvatar = async (file, token, user_id) => {
    const formData = new FormData();
    formData.append("avatar", file); 

    const requestOptions = {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${token}`,
        },
        body: formData,
    };
    
    console.log("Sending file to the backend");

    const response = await fetch(`${BACKEND_URL}/edit_user_avatar/${user_id}`, requestOptions);

    if (response.ok) {
        const data = await response.json();
        console.log("Avatar updated successfully:", data);
        return data;
    } else {
        const error = await response.json();
        console.error("Failed to update avatar:", error);
        throw new Error("Failed to update avatar.");
    }
};