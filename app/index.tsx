import { Image, View } from "react-native";

export default function SplashScreen() {
  return (
    <View className="flex-1 justify-center items-center bg-white">
      <Image
        source={require("../assets/images/Eat3D logo_4c.png 2.png")}
        className=""
      />
    </View>
  );
}
