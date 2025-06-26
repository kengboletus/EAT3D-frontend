import { Image, Text, TextInput, View } from "react-native";
interface Props {
  placeholder?: string;
  imagePath?: string;
  isSecure?: boolean;
  label?: string;
  value?: string;
  onPress?: () => void;
  onChangeText?: (text: string) => void;
}

const LabelledBoxedTextInput = ({
  placeholder,
  imagePath,
  isSecure = false,
  label,
  value,
  onPress,
  onChangeText,
}: Props) => {
  // console.log(placeholder);
  return (
    <View className="flex-col items-start my-2 mx-8">
      {/* Label text */}
      <Text className="text-xs text-light-200 pb-1 pl-1">{label}</Text>
      <View className="flex-row align-center bg-light-200 rounded-xl h-11">
        <Image />
        <TextInput
          secureTextEntry={isSecure}
          textContentType={isSecure ? "oneTimeCode" : "none"}
          autoCapitalize="none"
          multiline={false}
          onPress={onPress}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          placeholderTextColor="#8D8D8D"
          className="flex-1 ml-3 text-dark-300"
        />
      </View>
    </View>
  );
};

export default LabelledBoxedTextInput;
