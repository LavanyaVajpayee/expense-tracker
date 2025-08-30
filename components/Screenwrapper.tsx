import { colors } from "@/constants/theme";
import { ScreenWrapperProps } from "@/types";
import React from "react";
import {
  Dimensions,
  Platform,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
const { height } = Dimensions.get("window");
//here we are using destructuring
const Screenwrapper = ({ style, children }: ScreenWrapperProps) => {
  let paddingTop = Platform.OS == "android" ? 50 : height * 0.06;
  return (
    //{[]} here we make an array to add more styles later if we want
    <View
      style={[
        { paddingTop, flex: 1, backgroundColor: colors.neutral300 },
        style,
      ]}
    >
      <StatusBar barStyle={"dark-content"} />
      {children}
    </View>
  );
};

export default Screenwrapper;

const styles = StyleSheet.create({});
