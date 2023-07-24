import { TextInput, View, Pressable } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { searchBar } from "../styles";
import { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const SearchBar = ({ testLocation }) => {
  const [inputText, setInputText] = useState(null);
  const insets = useSafeAreaInsets();

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
          placeholder="Search..."
        />
        <View style={searchBar.buttonSearchLocation}>
          <Pressable onPress={() => testLocation(inputText)}>
            <FontAwesome5 name="search-location" size={30} color="black" />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default SearchBar;
