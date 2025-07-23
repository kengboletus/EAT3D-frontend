import { Image, Text, View } from "react-native";

export default function SplashScreen() {
  return (
    <View className="flex-1 justify-center items-center bg-white">
      <Image
        source={require("../assets/images/Eat3D logo_4c.png 2.png")}
        className="w-40 h-40 mb-6"
      />
      <Text className="text-3xl font-bold text-primary mb-2">Welcome!</Text>
    </View>
  );
}
