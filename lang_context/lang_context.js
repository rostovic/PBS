import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const LangContext = React.createContext({
  lang: "",
  setLang: (lang) => {},
});

const LangContextProvider = ({ children }) => {
  const [lang, setLang] = useState("");

  const getData = async () => {
    try {
      AsyncStorage.clear();
      const value = await AsyncStorage.getItem("lang");
      if (value !== null) {
        setLang(value);
        return value;
      } else {
      }
    } catch (error) {}
  };

  useEffect(() => {
    getData();
  }, []);

  const setLanguage = (lang) => {
    try {
      AsyncStorage.setItem("lang", JSON.stringify(lang));
      setLang(lang);
    } catch (error) {}
  };

  const contextValue = { lang, setLang, setLanguage };

  return (
    <LangContext.Provider value={contextValue}>{children}</LangContext.Provider>
  );
};

export default LangContextProvider;
