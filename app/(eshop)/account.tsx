import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../../context/authContext";

const Account = () => {
  const { logout } = useAuth();
  return (
    <View className="flex-1 justify-center items-center">
      <TouchableOpacity
        className="w-40 h-12 rounded-xl border border-black items-center justify-center"
        onPress={logout}
        activeOpacity={0.8}
      >
        <Text className="text-black text-2xl tracking-wider font-normal">
          Sign out
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Account;
