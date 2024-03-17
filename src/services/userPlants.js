const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const getUserPlants = async (user_id, token) => {
  try {
    const response = await fetch(`${BACKEND_URL}/plants/user/${user_id}`, {
      method: "GET",
      headers: { "Authorization": `Bearer ${token}` },
    });

    if (!response.ok) {
      throw new Error(`Status: ${response.status}`);
    }

    const data = await response.json();
    // console.log("got user plants,", data)
    return data;

  } catch (error) {
    console.error("Error getting user plants:", error);
  }
};



export const assignPlant = async (user_id, plant_id, quantity, token) => {
  const requestData = {
    user_id: user_id,
    plant_id: Number(plant_id),
    quantity: quantity,
  };

  try {
    if (plant_id == 0) {
      throw new Error("Please select a plant.");
    } else if (quantity == 0) {
      throw new Error("Cannot add quantity of 0");
    }

    const response = await fetch(`${BACKEND_URL}/plants/user/assign`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      throw new Error(`Status: ${response.status}`);
    }

    const data = await response.json();
    // console.log('response received,', data)
    return "Assignment successful:", data;
  } catch (error) {
    console.error("Error assigning plant:", error);
  }
};

export const updatePlantsQuantity = async (user_id,plant_id,new_quantity,token) => {
  const requestData = {
    user_id: user_id,
    plant_id: Number(plant_id),
    new_quantity: new_quantity,
  };

  try {
    if (plant_id == 0) {
      throw new Error("Please select a plant.");
    } else if (new_quantity == 0) {
      throw new Error("Cannot add quantity of 0");
    }

    const response = await fetch(`${BACKEND_URL}/plants/user/update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      throw new Error(`Status: ${response.status}`);
    }

    const data = await response.json();
    // console.log('response received,', data)

    return "Update successful:", data;
  } catch (error) {
    console.error("Error updating quantity:", error);
  }
};





export const deletePlantsFromUser = async (user_id, plant_id, token) => {
  const requestData = {
    user_id: user_id,
    plant_id: Number(plant_id),
  };

  try {
    const response = await fetch(`${BACKEND_URL}/plants/user/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      throw new Error(`Status: ${response.status}`);
    }

    const data = await response.json();


    return "Update successful:", data;
  } catch (error) {
    console.error("Error updating quantity:", error);
  }
};


