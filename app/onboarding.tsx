import LabelledBoxedTextInput from "@/components/LabelledBoxedTextInput";
import React, { useState } from "react";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Text,
  TouchableWithoutFeedback,
} from "react-native";

const onboarding = () => {
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
        {/* Logo here */}
        <Image />
        <Text className="text-4xl text-light-100">Sign up now!</Text>
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
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default onboarding;
