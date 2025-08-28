// SplashScreenLoggedin
//
// Displays logo and a large circular button on the bottom area when the user
// is logged in (visual cue only; wire up navigation if needed).
import { Image, TouchableOpacity, View } from "react-native";

export default function SplashScreen() {
  return (
    <View className="flex-1 justify-center items-center bg-white">
      <Image
        source={require("../assets/images/Eat3D logo_4c.png 2.png")}
        className=""
      />

      <TouchableOpacity className="absolute bottom-12 w-24 h-24">
        {/* Replace the URI with your actual icon */}
        <Image source={require("../assets/images/Eat3Dbutton.png")} className="w-full h-full" resizeMode="cover" />
      </TouchableOpacity>
    </View>
  );
}