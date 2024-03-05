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

export const editUsersInformation = async (form) => {
    console.log("Preparing to send edit request with form data:", form);

    const requestOptions = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTcwOTYzMTA0MiwianRpIjoiYTE2OGFiMjEtNjY1OS00ODYwLTlhYzItYWIwMTcyN2IxNmRlIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6MSwibmJmIjoxNzA5NjMxMDQyLCJjc3JmIjoiZDg5MGUxZGUtNjE1NS00NDQzLTg2OWMtMzE1NGQyMWQ3ZWZkIiwiZXhwIjoxNzA5NzE3NDQyfQ.xM1DsphGgXDa-3L8G-1BZBhhtah1L933upizto-j3v8`,
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
