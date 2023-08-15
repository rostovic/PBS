import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const UserContext = React.createContext({
  userData: "",
  setUserData: (userData) => {},
});

const UserContextProvider = ({ children }) => {
  const [userData, setUserData] = useState("");

  const getData = async () => {
    try {
      // AsyncStorage.clear();
      const value = await AsyncStorage.getItem("userData");
      if (value !== null) {
        setUserData(JSON.parse(value));
        return value;
      } else {
      }
    } catch (error) {}
  };

  useEffect(() => {
    getData();
  }, []);

  const setData = (userData) => {
    try {
      AsyncStorage.setItem("userData", JSON.stringify(userData));
      setUserData(userData);
    } catch (error) {}
  };

  const contextValue = { userData, setUserData, setData };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export default UserContextProvider;
