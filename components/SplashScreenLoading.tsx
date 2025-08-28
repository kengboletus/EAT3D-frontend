// SplashScreenLoading
//
// Shows the brand logo with a centered loading spinner while app is fetching
// or performing startup tasks.
import { ActivityIndicator, Image, View } from "react-native";

export default function SplashScreen() {
  return (
    <View className="flex-1 justify-center items-center bg-white">
      <Image
        source={require("../assets/images/Eat3D logo_4c.png 2.png")}
        className=""
      />

<ActivityIndicator size="large" color="#FFA500" style={{position: "absolute", bottom: 0, left: 0, right: 0, top: 500}} />

    </View>
  );
}