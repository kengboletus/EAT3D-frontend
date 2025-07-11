import LabelledBoxedTextInput from "@/components/LabelledBoxedTextInput";
import React, { useState } from "react";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const Onboarding = () => {
  const [nameText, setNameText] = useState("");
  const [emailText, setEmailText] = useState("");
  const [phoneText, setPhoneText] = useState("");
  const [passwordText, setPasswordText] = useState("");
  const [passwordConfirmText, setPasswordConfirmText] = useState("");
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior="padding"
        className="flex-1 justify-center items-center bg-primary"
      >
        <View className="flex-col justify-center items-center w-80">
          {/* Logo here */}
          <Image />
          <Text className="text-4xl text-light-100">Become a member!</Text>
          {/* Name text box */}
          <LabelledBoxedTextInput
            placeholder="John Doe"
            value={nameText}
            onChangeText={setNameText}
            label="Full Name"
          />
          {/* Email text box */}
          <LabelledBoxedTextInput
            placeholder="johndoe@gmail.com"
            value={emailText}
            onChangeText={setEmailText}
            label="Email Address"
          />
          {/* Phone number text box */}
          <LabelledBoxedTextInput
            placeholder="12345678"
            value={phoneText}
            onChangeText={setPhoneText}
            label="Phone Number"
          />
          {/* Password text box */}
          <LabelledBoxedTextInput
            placeholder="* * * * * * * *"
            isSecure={true}
            value={passwordText}
            onChangeText={setPasswordText}
            label="Password"
          />
          {/* Confirm password text box */}
          <LabelledBoxedTextInput
            placeholder="* * * * * * * *"
            isSecure={true}
            value={passwordConfirmText}
            onChangeText={setPasswordConfirmText}
            label="Confirm Password"
          />
          <View className="flex-row items-center py-8">
            <TouchableOpacity
              className="w-full h-12 rounded-xl border border-white items-center justify-center"
              onPress={() => {}}
              activeOpacity={0.8}
            >
              <Text className="text-white text-2xl tracking-wider font-normal">
                Sign up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default Onboarding;
