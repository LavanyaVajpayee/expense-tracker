import { colors, spacingX, spacingY } from "@/constants/theme";
import { scale, verticalScale } from "@/utils/styling";
import { ImageBackground } from "expo-image";
import * as Icons from "phosphor-react-native";
import React from "react";
import { StyleSheet, View } from "react-native";
import Typo from "./Typo";
const HomeCard = () => {
  return (
    <ImageBackground
      source={require("../assets/images/card.png")}
      resizeMode="stretch"
      style={styles.bgImage}
    >
      <View style={styles.container}>
        <View style={styles.totalbalance}>
          <Typo color={colors.neutral800} size={33} fontWeight={"600"}>
            Total Balance
          </Typo>
          <Icons.DotsThreeOutlineIcon
            size={verticalScale(33)}
            color={colors.black}
            weight="fill"
          />
        </View>
        <Typo
          color="black"
          size={45}
          fontWeight={"bold"}
          style={{ position: "absolute", top: "30%", left: "8%" }}
        >
          ₹8963575642649
        </Typo>
        <View style={styles.stats}>
          <View style={{ gap: verticalScale(5) }}>
            <View style={styles.incomeExpense}>
              <View style={styles.statsIcon}>
                <Icons.ArrowDown
                  size={verticalScale(35)}
                  color={colors.black}
                  weight="bold"
                />
              </View>
              <Typo size={36} color={colors.neutral700} fontWeight={"700"}>
                Income
              </Typo>
            </View>
            <View style={{ alignSelf: "center" }}>
              <Typo size={30} color={colors.green} fontWeight={"600"}>
                ₹2542
              </Typo>
            </View>
          </View>
          <View style={{ gap: verticalScale(5) }}>
            <View style={styles.incomeExpense}>
              <View style={styles.statsIcon}>
                <Icons.ArrowUp
                  size={verticalScale(35)}
                  color={colors.black}
                  weight="bold"
                />
              </View>
              <Typo size={36} color={colors.neutral700} fontWeight={"700"}>
                Expense
              </Typo>
            </View>
            <View style={{ alignSelf: "center" }}>
              <Typo size={30} color={colors.rose} fontWeight={"600"}>
                ₹252
              </Typo>
            </View>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default HomeCard;

const styles = StyleSheet.create({
  bgImage: {
    height: scale(210),
    width: "100%",
  },
  container: {
    justifyContent: "space-between",
    padding: spacingX._20,
    paddingHorizontal: scale(23),
    height: "87%",
    width: "100%",
  },
  totalbalance: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacingY._5,
  },
  stats: {
    flexDirection: "row",
  },
  statsIcon: {
    backgroundColor: colors.neutral350,
    padding: spacingY._5,
    borderRadius: 50,
  },
  incomeExpense: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacingY._15,
  },
});
