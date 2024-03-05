// export const createHelpOffer = async (helpRequestId, offerData, token) => {
//     try {
//         const requestOptions = {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 'Authorization': `Bearer ${token}`
//             },
//             body: JSON.stringify(offerData)
//         };

//         const response = await fetch(`${BACKEND_URL}/help_offers/${helpRequestId}`, requestOptions);
//         if (!response.ok) {
//             throw new Error(`Failed to create help offer for help request with ID ${helpRequestId}`);
//         }

//         const data = await response.json();
//         console.log("DATA", data);
//         return data;
        
//     } catch(error) {
//         console.error("API Error:", error);
//         throw error;
//     }
// }