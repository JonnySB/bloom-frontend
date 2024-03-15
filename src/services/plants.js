const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;


export const fetchPlantsFROMAPI = async (token) => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/plants`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json()
    
    return data;
  } 
  catch (error) {
    return 'Error fetching plants:', error;
  }
}

export const createNewPlant = async (common_name, latin_name, photo, plant_id, token) => {
  try {
      const payload = {
          common_name: common_name,
          latin_name: latin_name,
          photo: photo,
          plant_id: plant_id
      }

      const requestOptions = {
          method: "POST",
          headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
      }

      const response =  await fetch(`${BACKEND_URL}/plants/create`, requestOptions)
      if (response.status !== 200) {
          throw new Error("Unable to make POST request for create request");
      }

      const data = await response.json();
      // console.log("DATA", data);
      return data;

  } catch(error) {
      console.error("API error", error)
  }
}


