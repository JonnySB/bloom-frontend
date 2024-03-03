const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const updatePlantsQuantity = async (user_id, plant_id, new_quantity, token) => {
  const requestData = {
    user_id: user_id,
    plant_id: plant_id,
    new_quantity: new_quantity
  };

  try {
    const response = await fetch(`${BACKEND_URL}/plants/user/update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      throw new Error(`Error! Status: ${response.status}`);
    }

    const data = await response.json();
    return 'Update successful:', data
  } catch (error) {
    return 'Error updating quantity:', error;
  }
}