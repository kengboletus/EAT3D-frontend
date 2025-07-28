// app/(auth)/login.tsx
import LabelledBoxedTextInput from "@/components/LabelledBoxedTextInput";
import { useAuth } from "@/context/authContext";
import { api } from "@/utils/api";
import { Link } from "expo-router";
import { Formik, FormikHelpers } from "formik";
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

// 1. Define form types
interface FormValues {
  email: string;
  password: string;
}

// 2. Initial state
const initialValues: FormValues = {
  email: "",
  password: "",
};

// 3. Validation
const LoginSchema = Yup.object().shape({
  email: Yup.string().required("Email is required"),
  password: Yup.string()
    .min(8, "Minimum 8 characters")
    .required("Password is required"),
});

export default function LogIn() {
  const { login } = useAuth();

  const handleFormSubmit = async (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    try {
      if (!api) {
        throw new Error("Missing API URL");
      }

      const response = await fetch(api + "/api/v1/tokens/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const data = await response.json();

        if (data?.errors) {
          data.errors.forEach((error: { field: string; message: string }) => {
            actions.setFieldError(
              error.field as keyof FormValues,
              error.message
            );
          });
        } else if (data.message) {
          console.error("Login error:", data.message);
        }

        actions.setSubmitting(false);
        return;
      }

      const data = await response.json();
      await login(data.accessToken, data.refreshToken); // ✅ Updates context + SecureStore

      // No need to redirect manually — handled by (auth)/_layout.tsx
    } catch (error) {
      console.error("Unexpected error:", error);
    } finally {
      actions.setSubmitting(false);
    }
  };

  // 4. Render form
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior="padding"
        className="flex-1 justify-center items-center bg-primary"
      >
        {/* Logo */}
        <Image />
        <Text className="text-3xl text-light-100 mb-2 font-bold">Welcome!</Text>

        {/* Formik-powered form */}
        <Formik
          initialValues={initialValues}
          validationSchema={LoginSchema}
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
              {/* Email/Phone */}
              <LabelledBoxedTextInput
                placeholder="johndoe@gmail.com"
                value={values.email}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                label="Email Address"
                error={touched.email && errors.email}
              />

              {/* Password */}
              <LabelledBoxedTextInput
                placeholder="* * * * * * * *"
                isSecure={true}
                value={values.password}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                label="Password"
                error={touched.password && errors.password}
              />

              {/* Login Button */}
              <View className="w-80 self-center py-8">
                <TouchableOpacity
                  className="w-full h-12 rounded-xl border border-white items-center justify-center"
                  onPress={() => handleSubmit()}
                  activeOpacity={0.8}
                  disabled={isSubmitting}
                >
                  <Text className="text-white text-2xl tracking-wider font-normal">
                    {isSubmitting ? "Logging in..." : "Log in"}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Social logins (optional placeholders) */}
              <View className="flex-row justify-between gap-4 w-80 h-12">
                <TouchableOpacity className="flex-1 bg-white rounded-xl justify-center items-center shadow">
                  <Image className="w-8 h-8" />
                </TouchableOpacity>
                <TouchableOpacity className="flex-1 bg-white rounded-xl justify-center items-center shadow">
                  <Image className="w-8 h-8" />
                </TouchableOpacity>
                <TouchableOpacity className="flex-1 bg-white rounded-xl justify-center items-center shadow">
                  <Image className="w-8 h-8" />
                </TouchableOpacity>
              </View>

              {/* Sign-up link */}
              <View className="absolute bottom-20 flex-row">
                <Text className="text-light-100 pr-1">Not a member?</Text>
                <Link href="/onboarding" className="text-light-200">
                  Sign up
                </Link>
              </View>
            </>
          )}
        </Formik>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
