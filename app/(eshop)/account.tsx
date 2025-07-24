import { Formik, FormikHelpers } from "formik";
import { jwtDecode } from "jwt-decode";
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import * as Yup from "yup";
import { useAuth } from "../../context/authContext";
import { api } from "../../utils/api";

interface UserData {
  id: number;
  username: string;
  phone: string;
  email: string;
  created_at: string;
}
interface Payload {
  userId: number;
  iat: number;
  exp: number;
}
interface FormValues {
  id: string;
}

const Account = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const { refresh, logout, user } = useAuth();
  // This should just set the user data state.
  const handleFormSubmit = async (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    try {
      // We are certain the accessToken is a string here because account is a protected screen.
      const payload = jwtDecode<Payload>(user?.accessToken as string);
      // Client-side access token expiration check.
      const unixSeconds = Math.floor(Date.now() / 1000);
      console.log(
        "currentTime: ",
        unixSeconds,
        "\n",
        "payloadExp: ",
        payload.exp
      ); // e.g. 1721809505
      if (payload.exp < unixSeconds) {
        console.log("Running refresh");
        await refresh();
      }
      // Make the call. Should have valid tokens at this point.
      if (!api) {
        throw new Error("Missing API URL");
      }
      const response = await fetch(api + `/api/v1/users/${values.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.accessToken}`,
        },
      });
      //
      if (!response.ok) {
        const { message } = await response.json();
        console.log("Server error: ", message);
        return;
      }
      // Success
      const { message, data } = await response.json();
      console.log("get users: ", message);
      console.log("data: ", data);
      setUserData(data);
    } catch (error) {
      console.log("get users: ", error);
    }
  };

  return (
    <View className="flex-1 justify-center items-center">
      <View className="flex-col justify-center items-center">
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
                placeholder={"Enter userId here."}
                value={values.id}
                onChangeText={handleChange("id")}
                onBlur={handleBlur("id")}
                placeholderTextColor="#8D8D8D"
                autoCapitalize="none"
                multiline={false}
                className="mt-20 w-40 h-12 text-dark-300 border"
              />
              <TouchableOpacity
                className="w-40 h-12 rounded-xl border border-black items-center justify-center"
                onPress={() => handleSubmit()}
                activeOpacity={0.8}
                disabled={isSubmitting}
              >
                <Text className="text-black text-2xl tracking-wider font-normal">
                  {isSubmitting ? "Querying..." : "Get user."}
                </Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>
        <View className="flex-1">
          <Text className="text-black text-2xl tracking-wider font-normal">
            User data
          </Text>
          {userData && (
            <View className="flex-1">
              <Text className="text-black text-2xl tracking-wider font-normal">
                {`id: ${userData.id}`}
              </Text>
              <Text className="text-black text-2xl tracking-wider font-normal">
                {`username: ${userData.username}`}
              </Text>
              <Text className="text-black text-2xl tracking-wider font-normal">
                {`phone: ${userData.phone}`}
              </Text>
              <Text className="text-black text-2xl tracking-wider font-normal">
                {`email: ${userData.email}`}
              </Text>
              <Text className="text-black text-2xl tracking-wider font-normal">
                {`created_at: ${userData.created_at}`}
              </Text>
            </View>
          )}
        </View>
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
    </View>
  );
};

export default Account;
