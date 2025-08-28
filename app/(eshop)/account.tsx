// Account Screen
//
// Demonstrates a simple authenticated request using `useAuthFetch` and a
// lookup by numeric user ID. Also provides a Sign out action that clears
// auth and navigates to login.
import { useRouter } from "expo-router";
import { Formik, FormikHelpers } from "formik";
import React, { useState } from "react";
import {
    Keyboard,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import * as Yup from "yup";
import { useAuth } from "../../context/authContext";
import { useAuthFetch } from "../../hooks/useAuthFetch";

const router = useRouter();

interface UserData {
  id: number;
  username: string;
  phone: string;
  email: string;
  created_at: string;
}

interface FormValues {
  id: string;
}

const Account = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const { user, refresh, logout } = useAuth();

  // Memoized authFetch instance, uses current auth state & methods
  const authFetch = useAuthFetch();

  const handleFormSubmit = async (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    setErrorMsg(null);
    setUserData(null);

    try {
      // Perform the API request with authFetch which manages tokens internally
      const response = await authFetch(`/api/v1/users/${values.id}`, {
        method: "GET",
      });

      // The authFetch delegates to apiClient which already parses JSON.
      // So response here is the parsed JSON object.
      // Assuming your API returns { message, data }.
      const { message, data } = response;

      if (!data) {
        setErrorMsg(message || "User not found");
        actions.setSubmitting(false);
        return;
      }

      setUserData(data);
      actions.setSubmitting(false);
    } catch (error: any) {
      setErrorMsg(
        error.message || "An unexpected error occurred. Please try again."
      );
      actions.setSubmitting(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="flex-1 justify-center items-center p-6">
        <View className="w-full max-w-md flex-col items-center">
          <Formik
            initialValues={{ id: "" }}
            validationSchema={Yup.object().shape({
              id: Yup.string()
                .matches(/^\d+$/, "ID must be in digits.")
                .required("Required"),
            })}
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
                <TextInput
                  value={values.id}
                  onChangeText={handleChange("id")}
                  onBlur={handleBlur("id")}
                  autoCapitalize="none"
                  multiline={false}
                  placeholder="Enter user ID here"
                  placeholderTextColor="#a0a0a0"
                  className="mt-20 w-full h-12 rounded-md border border-gray-300 px-4 m-2 text-base text-black"
                />
                {touched.id && errors.id && (
                  <Text className="text-red-600 text-sm mt-1">{errors.id}</Text>
                )}
                {errorMsg && (
                  <Text className="text-red-600 text-sm mt-1">{errorMsg}</Text>
                )}
                <TouchableOpacity
                  className={`w-full h-12 rounded-lg flex justify-center items-center ${
                    isSubmitting ? "bg-gray-400" : "bg-primary"
                  }`}
                  onPress={() => handleSubmit()}
                  activeOpacity={0.7}
                  disabled={isSubmitting}
                >
                  <Text className="text-white text-lg font-semibold">
                    {isSubmitting ? "Querying..." : "Get User"}
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </Formik>
          <View className="bg-gray-300 rounded-lg p-4 mt-6 w-full">
            <Text className="text-lg font-bold mb-2">User Data</Text>
            {userData && (
              <>
                <Text>ID: {userData.id}</Text>
                <Text>Username: {userData.username}</Text>
                <Text>Phone: {userData.phone}</Text>
                <Text>Email: {userData.email}</Text>
                <Text>Created At: {userData.created_at}</Text>
              </>
            )}
          </View>
          <TouchableOpacity
            className="w-40 h-12 rounded-xl border border-black items-center justify-center mt-6"
            onPress={async () => {
              await logout();
              router.replace("/(auth)/logIn");
            }}
            activeOpacity={0.8}
          >
            <Text className="text-black text-2xl tracking-wider font-normal">
              Sign out
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Account;
