import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const MembershipPage = () => {
  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image
        source={ require("../assets/images/Eat3DBigLogo.png")} 
        style={styles.logo}
      />

      {/* Title Text */}
      <Text style={styles.title}>成為會員吧!</Text>

      {/* Login/Register Button */}
      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginButtonText}>登入 / 註冊</Text>
      </TouchableOpacity>

      {/* Skip Text */}
      <TouchableOpacity>
        <Text style={styles.skipText}>稍後再說</Text>
      </TouchableOpacity>

      {/* Social Login Section */}
      <View style={styles.socialLoginContainer}>
        <Text style={styles.socialLoginText}>或使用以下方式登入：</Text>
        <View style={styles.socialIcons}>
          {/* WeChat Button */}
          <TouchableOpacity>
            <Image
              source={ require("../assets/images/WechatLogo.png")} 
              style={styles.socialIcon}
            />
          </TouchableOpacity>

          {/* Google Button */}
          <TouchableOpacity>
            <Image
              source={ require("../assets/images/GoogleLogo.png")} 
              style={styles.socialIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

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
    width: "80%",
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
  skipText: {
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

export default MembershipPage;