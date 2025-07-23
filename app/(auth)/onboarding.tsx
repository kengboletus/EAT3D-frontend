// Onboarding.tsx
import { Formik, FormikHelpers } from "formik";
import React from "react";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import * as Yup from "yup";

import LabelledBoxedTextInput from "@/components/LabelledBoxedTextInput";
import { Redirect, useRouter } from "expo-router";
import { useAuth } from "../../context/authContext";
import { api } from "../../utils/api";

interface FormValues {
  username: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

const initialValues: FormValues = {
  username: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
};

const SignupSchema = Yup.object().shape({
  username: Yup.string().min(3, "Too short").required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  phone: Yup.string().min(8).max(8).required("Required"),
  password: Yup.string().min(8, "Minimum 8 characters").required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Required"),
});

const Router = useRouter();

const Onboarding: React.FC = () => {
  const { user, login } = useAuth();

  const handleFormSubmit = async (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    try {
      // Runtime check for URL environment variable.
      if (!process.env.EXPO_PUBLIC_API_URL) {
        throw Error("assign API_URL in env.");
      }
      // Debug: Check full URL
      console.log(api + "/api/v1/users/");
      // Request to signUp endpoint.
      const response = await fetch(api + "/api/v1/users/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      // Handling errors.
      if (!response.ok) {
        const data = await response.json();

        // Check for a structured list of field-level errors
        if (data.errors && Array.isArray(data.errors)) {
          data.errors.forEach((error: { field: string; message: string }) => {
            // Apply backend errors to corresponding form fields
            actions.setFieldError(
              error.field as keyof FormValues,
              error.message
            );
          });
        } else if (data.message) {
          // Handle non-field-specific error
          console.error("Server error:", data.message);
        }

        actions.setSubmitting(false);
        return;
      }

      /** Success: Structure of retrieved json:
       *  {
       *    message: "Signup successful",
       *    accessToken: token,
       *    refreshToken: token
       *  }
       */
      const data = await response.json();
      console.log("User registered:", data);

      // Store accessToken and refreshToken in secureStorage.
      await login(data.accessToken, data.refreshToken);
      if (user) return <Redirect href="/(eshop)/home" />;
      // actions.resetForm();
    } catch (err) {
      console.error("Network or unexpected error:", err);
      // Optionally display a user-friendly message to the user
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior="padding"
        className="flex-1 justify-center items-center bg-primary"
      >
        <View className="flex-col justify-center items-center w-80">
          {/* Logo */}
          <Image />
          <Text className="text-4xl text-light-100">Become a member!</Text>

          <Formik
            initialValues={initialValues}
            validationSchema={SignupSchema}
            onSubmit={handleFormSubmit}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
              isSubmitting,
            }) => (
              <>
                <LabelledBoxedTextInput
                  placeholder="myUsername"
                  value={values.username}
                  onChangeText={handleChange("username")}
                  onBlur={handleBlur("username")}
                  label="Username"
                  error={touched.username && errors.username}
                />

                <LabelledBoxedTextInput
                  placeholder="johndoe@gmail.com"
                  value={values.email}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  label="Email Address"
                  error={touched.email && errors.email}
                />

                <LabelledBoxedTextInput
                  placeholder="12345678"
                  value={values.phone}
                  onChangeText={handleChange("phone")}
                  onBlur={handleBlur("phone")}
                  label="Phone Number"
                  error={touched.phone && errors.phone}
                />

                <LabelledBoxedTextInput
                  placeholder="* * * * * * * *"
                  isSecure={true}
                  value={values.password}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  label="Password"
                  error={touched.password && errors.password}
                />

                <LabelledBoxedTextInput
                  placeholder="* * * * * * * *"
                  isSecure={true}
                  value={values.confirmPassword}
                  onChangeText={handleChange("confirmPassword")}
                  onBlur={handleBlur("confirmPassword")}
                  label="Confirm Password"
                  error={touched.confirmPassword && errors.confirmPassword}
                />

                <View className="flex-row items-center py-8">
                  <TouchableOpacity
                    className="w-full h-12 rounded-xl border border-white items-center justify-center"
                    onPress={() => handleSubmit()}
                    activeOpacity={0.8}
                    disabled={isSubmitting}
                  >
                    <Text className="text-white text-2xl tracking-wider font-normal">
                      {isSubmitting ? "Signing up..." : "Sign up"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </Formik>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default Onboarding;
