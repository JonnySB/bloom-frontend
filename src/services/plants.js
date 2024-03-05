const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const fetchPlants = async (token) => {
  try {
    const response = await fetch(`${BACKEND_URL}/plants`, {
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