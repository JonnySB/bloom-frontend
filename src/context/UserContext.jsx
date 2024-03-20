import React, { createContext, useContext, useState, useEffect } from 'react';
import { getUserInformationById } from '../services/users';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const refreshUserData = async () => {
    const user_id = window.localStorage.getItem("user_id");
    if (!user_id) {
      return;
    }

    try {
      const fetchedUserData = await getUserInformationById(user_id);
      setUserData(fetchedUserData);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    refreshUserData();
  }, []);

  return (
    <UserContext.Provider value={{ userData, refreshUserData }}>
      {children}
    </UserContext.Provider>
  );
};
