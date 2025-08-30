import { colors } from "@/constants/theme";
import { useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, View } from "react-native";
const index = () => {
  const router = useRouter();
  // setTimeout(() => {
  //   router.push("/auth/welcome");
  // }, 10000);
  // useEffect(() => {
  // });
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        resizeMode="contain"
        source={require("../assets/images/splash.png")}
      />
    </View>
  );
};
export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.neutral360,
  },
  logo: {
    height: "45%",
    aspectRatio: 1,
  },
});
