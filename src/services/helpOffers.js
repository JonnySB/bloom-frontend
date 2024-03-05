const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const getReceivedHelpOffersByUserId = async (user_id) => {
  try {
    const requestOptions = {
      method: "GET",
      headers: {},
    };

    const response = await fetch(
      `${BACKEND_URL}/help_offers/help_requests/${user_id}`,
      requestOptions,
    );
    if (!response.ok) {
      throw new Error("Failed to fetch all help requests with user details");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("API Error: ", error);
    throw error;
  }
};

export const acceptHelpOffer = async (help_offer_id) => {
  try {
    const requestOptions = {
      method: "PUT",
      headers: {},
    };

    const response = await fetch(
      `${BACKEND_URL}/help_offers/accept_offer/${help_offer_id}`,
      requestOptions,
    );
    if (!response.ok) {
      throw new Error("Failed to updated record");
    }

    return true;
  } catch (error) {
    console.error("API Error: ", error);
    return false;
  }
};

export const rejectHelpOffer = async (help_offer_id) => {
  try {
    const requestOptions = {
      method: "PUT",
      headers: {},
    };

    const response = await fetch(
      `${BACKEND_URL}/help_offers/reject_offer/${help_offer_id}`,
      requestOptions,
    );
    if (!response.ok) {
      throw new Error("Faled to update record");
    }

    return true;
  } catch (error) {
    console.error("API Error: ", error);
    return false;
  }
};

export const getOutgoingHelpOffersByUserId = async (user_id) => {
  try {
    const requestOptions = {
      method: "GET",
      headers: {},
    };

    const response = await fetch(
      `${BACKEND_URL}/help_offers/${user_id}`,
      requestOptions,
    );
    if (!response.ok) {
      throw new Error("Failed to fetch all help offers with user details");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("API Error: ", error);
    throw error;
  }
};

export const recindHelpOffer = async (help_offer_id) => {
  try {
    const requestOptions = {
      method: "PUT",
      headers: {},
    };

    const response = await fetch(
      `${BACKEND_URL}/help_offers/recind_offer/${help_offer_id}`,
      requestOptions,
    );
    if (!response.ok) {
      throw new Error("Faled to update record");
    }

    return true;
  } catch (error) {
    console.error("API Error: ", error);
    return false;
  }
};
