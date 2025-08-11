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
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
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
        className="flex-1 justify-center items-center bg-white"
      >
        {/* Logo */}
        <Image 
        source={ require("../../assets/images/Eat3DBigLogo.png")} 
        style={styles.logo}
        />
        <Text className="text-3xl text-dark-200 mb-2 font-bold">Welcome!</Text>

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
                label="Email Address / Phone Number"
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
                  style={styles.loginButton}
                  
                  onPress={() => handleSubmit()}
                  activeOpacity={0.8}
                  disabled={isSubmitting}
                >
                  <Text style={styles.loginButtonText} >
                    {isSubmitting ? "Logging in..." : "Log in"}
                  </Text>
                </TouchableOpacity>
              </View>

            


              {/* Social logins (optional placeholders) */}
            <View style={styles.socialLoginContainer}>
              <Text style={styles.socialLoginText}>Other Login Options:</Text>
              <View style={styles.socialIcons}>
              {/* WeChat Button */}
                <TouchableOpacity>
                  <Image
                    source={ require("../../assets/images/WechatLogo.png")} 
                    style={styles.socialIcon}
                  />
                </TouchableOpacity>

              {/* Google Button */}
                <TouchableOpacity>
                  <Image
                    source={ require("../../assets/images/GoogleLogo.png")} 
                    style={styles.socialIcon}
                  />
                </TouchableOpacity>

                </View>
              </View>

              {/* Sign-up link */}
              <View className="absolute bottom-20 flex-row">
                <Text className="text-dark-100 pr-1">Not a member?</Text>
                <Link href="/onboarding" style={styles.signUpText}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#888",
    marginBottom: 30,
  },
  loginButton: {
    width: "100%",
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#888",
    borderRadius: 20,
    alignItems: "center",
    marginBottom: 20,
  },
  loginButtonText: {
    fontSize: 16,
    color: "#444",
  },
  signUpText: {
    fontSize: 14,
    color: "#888",
    marginBottom: 40,
  },
  socialLoginContainer: {
    alignItems: "center",
  },
  socialLoginText: {
    fontSize: 14,
    color: "#888",
    marginBottom: 10,
  },
  socialIcons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 100,
  },
  socialIcon: {
    width: 40,
    height: 40,
  },
});
