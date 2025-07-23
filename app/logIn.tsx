import LabelledBoxedTextInput from "@/components/LabelledBoxedTextInput";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

export default function LogIn() {
  const Router = useRouter();
  const [emailText, setEmailText] = useState("");
  const [passwordText, setPasswordText] = useState("");
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior="padding"
        className="flex-1 justify-center items-center bg-primary"
      >
        {/* Logo here */}
        <Image />
        <Text className="text-3xl text-light-100 mb-2 font-bold">Welcome!</Text>

        {/* Email text box */}
        <LabelledBoxedTextInput
          placeholder="johndoe@gmail.com"
          value={emailText}
          onChangeText={setEmailText}
          label="Email Address / Phone Number"
        />

        {/* Password text box */}
        <LabelledBoxedTextInput
          placeholder="* * * * * * * *"
          isSecure={true}
          value={passwordText}
          onChangeText={setPasswordText}
          label="Password"
        />

        <View className="w-80 self-center py-6">
          {/* Login button
           * Temporarily route directly to home screen.
           * Link to proper authentication later.
           */}
          <View className="flex-row items-center pb-8">
            <TouchableOpacity
              className="w-full h-12 rounded-xl border border-white items-center justify-center"
              onPress={() => {
                Router.navigate("/(eshop)/home");
              }}
              activeOpacity={0.8}
            >
              <Text className="text-white text-2xl tracking-wider font-normal">
                Log in
              </Text>
            </TouchableOpacity>
          </View>

          {/* Social sign-in buttons. */}
          <View className="flex-row justify-between gap-4 w-full h-12">
            {/* Facebook */}
            <TouchableOpacity className="flex-1 bg-white rounded-xl justify-center items-center shadow">
              <Image className="w-8 h-8" resizeMode="contain" />
            </TouchableOpacity>
            {/* Google */}
            <TouchableOpacity className="flex-1 bg-white rounded-xl justify-center items-center shadow">
              <Image className="w-8 h-8" resizeMode="contain" />
            </TouchableOpacity>
            {/* Apple */}
            <TouchableOpacity className="flex-1 bg-white rounded-xl justify-center items-center shadow">
              <Image className="w-8 h-8" resizeMode="contain" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Sign up text. */}
        <View className="absolute bottom-20 flex-row">
          <Text className="text-light-100 pr-1">Not a member?</Text>
          <Link className="text-light-200" href="/onboarding">
            Sign up
          </Link>
        </View>
      </KeyboardAvoidingView>
      {/* Signup Link */}
    </TouchableWithoutFeedback>
  );
}
