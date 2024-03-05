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

export const editUsersInformation = async (user_id, first_name, last_name, user_picture) => {
    const requestOptions = {
      method: "PUT",
      headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTcwOTYzMTA0MiwianRpIjoiYTE2OGFiMjEtNjY1OS00ODYwLTlhYzItYWIwMTcyN2IxNmRlIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6MSwibmJmIjoxNzA5NjMxMDQyLCJjc3JmIjoiZDg5MGUxZGUtNjE1NS00NDQzLTg2OWMtMzE1NGQyMWQ3ZWZkIiwiZXhwIjoxNzA5NzE3NDQyfQ.xM1DsphGgXDa-3L8G-1BZBhhtah1L933upizto-j3v8`,

      },

      body: JSON.stringify({
        user_id: userId,
        first_name: first_name,
        last_name: last_name,
        user_picture: user_picture,
    }),
  };

  const response = await fetch(`${BACKEND_URL}/edit/${user_id}`, requestOptions);

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
