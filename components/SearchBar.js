import { TextInput, View, Pressable } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { searchBar } from "../styles";
import { useContext, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LangContext } from "../lang_context/lang_context";
import langs from "../lang-data/langs";

const SearchBar = ({ findLocation }) => {
  const [inputText, setInputText] = useState(null);
  const insets = useSafeAreaInsets();
  const lngCtx = useContext(LangContext);

  const currentLang =
    langs.find((lang) => lang.name === lngCtx.lang) ||
    langs.find((lang) => lang.name === JSON.parse(lngCtx.lang));

  return (
    <View
      style={{
        width: "100%",
        position: "absolute",
        zIndex: 999,
        top: insets.top + 16,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View style={searchBar.searchBar}>
        <TextInput
          style={searchBar.searchBarInput}
          onChangeText={(text) => setInputText(text)}
          placeholder={currentLang.search}
        />
        <View style={searchBar.buttonSearchLocation}>
          <Pressable onPress={() => findLocation(inputText)}>
            <FontAwesome5 name="search-location" size={30} color="black" />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default SearchBar;
