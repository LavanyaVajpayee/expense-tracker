import { auth } from "@/cofig/firebase";
import Button from "@/components/Button";
import HomeCard from "@/components/HomeCard";
import Screenwrapper from "@/components/Screenwrapper";
import TransactionList from "@/components/TransactionList";
import Typo from "@/components/Typo";
import { colors, spacingX, spacingY } from "@/constants/theme";
import { useAuth } from "@/contexts/authContext";
import useFetchData from "@/hooks/useFetchData";
import { TransactionType } from "@/types";
import { verticalScale } from "@/utils/styling";
import { useRouter } from "expo-router";
import { signOut } from "firebase/auth";
import { limit, orderBy, where } from "firebase/firestore";
import * as Icons from "phosphor-react-native";
import React from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
const Home = () => {
  const { user } = useAuth();
  const router = useRouter();
  const constraints = [
    where("uid", "==", user?.uid),
    orderBy("date", "desc"),
    limit(30),
  ];

  const {
    data: recentTrasaction,
    error,
    loading: transactionLoading,
  } = useFetchData<TransactionType>("transaction", constraints);

  const handleLogout = async () => {
    await signOut(auth);
  };
  return (
    <Screenwrapper>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={{ gap: 4 }}>
            <Typo size={36}>Hello,</Typo>
            <Typo size={40} fontWeight={"500"}>
              {user?.name}
            </Typo>
          </View>
          <TouchableOpacity style={styles.searchIcon}>
            <Icons.MagnifyingGlass
              size={verticalScale(32)}
              color={colors.neutral200}
              weight="bold"
            />
          </TouchableOpacity>
        </View>
        <ScrollView
          contentContainerStyle={styles.scrollview}
          showsVerticalScrollIndicator={false}
        >
          <HomeCard />
          <TransactionList
            data={recentTrasaction}
            loading={transactionLoading}
            emptyListMessage="No Transactions added yet"
            title="Recent Transactions"
          />
        </ScrollView>
        <Button
          style={styles.floatingbutton}
          onPress={() => {
            router.push("/(modals)/transactionModal");
          }}
        >
          <Icons.Plus
            weight="bold"
            size={verticalScale(48)}
            color={colors.black}
          />
        </Button>
      </View>
    </Screenwrapper>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacingY._20,
    marginTop: verticalScale(8),
  },
  header: {
    flexDirection: "row",
    // justifyContent: "center",
    // alignItems: "center",
    marginBottom: spacingY._10,
  },
  searchIcon: {
    backgroundColor: colors.neutral600,
    padding: spacingX._10,
    borderRadius: 50,
    position: "absolute",
    right: 10,
  },
  floatingbutton: {
    height: verticalScale(75),
    width: verticalScale(75),
    borderRadius: 100,
    position: "absolute",
    bottom: verticalScale(30),
    right: verticalScale(30),
  },
  scrollview: {
    // flexGrow: 1,
    marginTop: spacingY._10,
    paddingBottom: verticalScale(100),
    gap: spacingY._25,
  },
});
