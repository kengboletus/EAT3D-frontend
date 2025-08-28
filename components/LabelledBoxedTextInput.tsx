// LabelledBoxedTextInput
//
// Reusable text input with optional label, left icon, and error message.
import React from "react";
import {
    Image,
    ImageSourcePropType,
    Text,
    TextInput,
    TextInputProps,
    View,
} from "react-native";

interface Props extends TextInputProps {
  label?: string;
  error?: string | false | null;
  imagePath?: ImageSourcePropType;
  isSecure?: boolean;
}

/**
 * A reusable text input with a label and optional error message under it.
 */
const LabelledBoxedTextInput: React.FC<Props> = ({
  placeholder,
  imagePath,
  isSecure,
  label,
  value,
  error,
  onChangeText,
  onBlur,
  ...rest
}) => {
  return (
    <View className="flex-col items-start w-80 py-1">
      {/* Label */}
      {label && (
        <Text className="text-xs text-dark-100 pb-1 pl-1">{label}</Text>
      )}

      {/* Input + Optional Icon */}
      <View className="flex-row items-center bg-light-200 rounded-xl h-11 px-3">
        {imagePath && (
          <Image
            source={imagePath}
            className="w-5 h-5 mr-2"
            resizeMode="contain"
          />
        )}
        <TextInput
          secureTextEntry={isSecure}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          onBlur={onBlur}
          placeholderTextColor="#8D8D8D"
          autoCapitalize="none"
          multiline={false}
          className="flex-1 text-dark-300"
          {...rest}
        />
      </View>

      {/* Error Message */}
      {error && <Text className="text-red-500 text-xs pt-1 pl-1">{error}</Text>}
    </View>
  );
};

export default LabelledBoxedTextInput;
