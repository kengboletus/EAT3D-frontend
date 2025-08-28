// SearchBar
//
// Simple search input with a left search icon and an optional right filter
// icon. Parent provides handlers for typing and tapping icons.
import { TextInput, TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

interface Props {
  placeholder: string;
  value?: string;
  onChangeText?: (text: string) => void;
  onPress?: () => void;
  onPressFilter?: () => void;
}

const SearchBar = ({
  placeholder,
  value,
  onChangeText,
  onPress,
  onPressFilter,
}: Props) => {
  return (
    <View className="flex-row ml-2 flex-grow items-center border-b border-dark-300">
      <Ionicons
        name="search-sharp"
        color="#585858"
        size={22}
        style={{ marginLeft: "4%" }}
      />
      <TextInput
        onPress={onPress}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        className="flex-grow text-dark-300 ml-4"
        placeholderTextColor="#585858"
      />
      <TouchableOpacity onPress={onPressFilter}>
        <Ionicons
          name="filter-sharp"
          size={22}
          color="#585858"
          style={{
            justifyContent: "flex-end",
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;
