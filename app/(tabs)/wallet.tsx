import Loading from "@/components/Loading";
import Screenwrapper from "@/components/Screenwrapper";
import Typo from "@/components/Typo";
import WalletListitem from "@/components/WalletListitem";
import { colors, radius, spacingX, spacingY } from "@/constants/theme";
import { useAuth } from "@/contexts/authContext";
import useFetchData from "@/hooks/useFetchData";
import { WalletType } from "@/types";
import { verticalScale } from "@/utils/styling";
import { useRouter } from "expo-router";
import { orderBy, where } from "firebase/firestore";
import * as Icons from "phosphor-react-native";
import React from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";

const Wallet = () => {
  const gettotalbal = () =>
    wallets.reduce((total, item) => {
      total = total + (item.amount || 0);
      return total;
    }, 0);
  const router = useRouter();
  // why is user in {}
  const { user } = useAuth();
  const {
    data: wallets,
    error,
    loading,
  } = useFetchData<WalletType>("wallet", [
    where("uid", "==", user?.uid),
    orderBy("created", "desc"),
  ]);
  console.log("wallet:", wallets.length);
  return (
    <Screenwrapper style={{ backgroundColor: colors.black }}>
      <View style={styles.container}>
        <View style={styles.balanceView}>
          <View style={{ alignItems: "center" }}>
            <Typo size={50} fontWeight={"500"}>
              ₹{gettotalbal().toFixed(2)}
            </Typo>
            <Typo size={44} color={colors.neutral300}>
              Total Balance
            </Typo>
          </View>
        </View>
        <View style={styles.wallets}>
          {/* Header */}
          <View style={styles.flexRow}>
            <Typo size={40} fontWeight={"500"}>
              My wallets
            </Typo>
            <TouchableOpacity
              onPress={() => router.push("/(modals)/walletModal")}
            >
              <Icons.PlusCircle
                weight="fill"
                color={colors.primary}
                size={verticalScale(48)}
              />
            </TouchableOpacity>
          </View>
          {loading && <Loading />}
          <FlatList
            data={wallets}
            renderItem={({ item, index }) => {
              return (
                <WalletListitem item={item} index={index} router={router} />
              );
            }}
            keyExtractor={(_, index) => index.toString()}
            contentContainerStyle={styles.listStyle}
          />
        </View>
      </View>
    </Screenwrapper>
  );
};

export default Wallet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  balanceView: {
    height: verticalScale(160),
    backgroundColor: colors.black,
    justifyContent: "center",
    alignItems: "center",
  },
  flexRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacingY._10,
  },

  wallets: {
    flex: 1,
    backgroundColor: colors.neutral900,
    borderTopRightRadius: radius._30,
    borderTopLeftRadius: radius._30,
    padding: spacingX._20,
    paddingTop: spacingX._25,
  },
  listStyle: {
    paddingVertical: spacingY._25,
    paddingTop: spacingY._15,
  },
});
