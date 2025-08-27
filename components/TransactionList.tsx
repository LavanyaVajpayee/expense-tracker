import { expenseCategories, incomeCategory } from "@/constants/data";
import { colors, radius, spacingX, spacingY } from "@/constants/theme";
import {
  TransactionItemProps,
  TransactionListType,
  TransactionType,
} from "@/types";
import { verticalScale } from "@/utils/styling";
import { FlashList } from "@shopify/flash-list";
import { useRouter } from "expo-router";
import { Timestamp } from "firebase/firestore";
import * as Icons from "phosphor-react-native";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import Loading from "./Loading";
import Typo from "./Typo";
const router = useRouter();
const TransactionList = ({
  data,
  emptyListMessage,
  title,
  loading,
}: TransactionListType) => {
  const handleClick = (item: TransactionType) => {
    router.push({
      pathname: "/(modals)/transactionModal",
      params: {
        id: item?.id,
        type: item?.type,
        amount: item?.amount?.toString(),
        cattegory: item?.category,
        date: (item.date as Timestamp)?.toDate().toISOString(),
        description: item?.description,
        image: item?.image,
        uid: item?.uid,
        walletId: item?.walletId,
      },
    });
  };
  return (
    <View style={styles.container}>
      {title && (
        <Typo size={30} fontWeight={"500"}>
          {title}
        </Typo>
      )}
      <View style={styles.list}>
        <FlashList
          data={data}
          renderItem={({ item, index }) => (
            <TransactionItem
              item={item}
              index={index}
              handleClick={handleClick}
            />
          )}
          estimatedItemSize={60}
        />
      </View>
      {!loading && data.length === 0 && (
        <Typo
          size={25}
          color={colors.neutral700}
          style={{ textAlign: "center", marginTop: spacingY._15 }}
        >
          {emptyListMessage}
        </Typo>
      )}
      {loading && (
        <View style={{ top: verticalScale(100) }}>
          <Loading />
        </View>
      )}
    </View>
  );
};

export default TransactionList;

const TransactionItem = ({
  item,
  index,
  handleClick,
}: TransactionItemProps) => {
  const defaultCategory = {
    label: "Unknown",
    icon: Icons.Question,
    bgColor: colors.neutral500,
  };

  // Safely get category
  let category =
    item?.type === "income"
      ? incomeCategory
      : expenseCategories[item.category || ""] || defaultCategory;

  const IconComponent = category.icon;

  const date = (item?.date as Timestamp)
    ?.toDate?.()
    ?.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
    });

  return (
    <Animated.View
      entering={FadeInDown.delay(index * 70)
        .springify()
        .damping(14)}
    >
      <TouchableOpacity style={styles.row} onPress={() => handleClick(item)}>
        <View style={[styles.icon, { backgroundColor: category.bgColor }]}>
          {IconComponent && (
            <IconComponent
              size={verticalScale(35)}
              weight="fill"
              color={colors.white}
            />
          )}
        </View>
        <View style={styles.categoryDes}>
          <Typo size={27} color={colors.black} fontWeight={"400"}>
            {category.label}
          </Typo>
          <Typo size={22} color={colors.black} textProps={{ numberOfLines: 1 }}>
            {item?.description}
          </Typo>
        </View>
        <View style={styles.amountDate}>
          <Typo
            fontWeight={"500"}
            color={item.type === "income" ? colors.primary : colors.rose}
          >
            {`${item?.type === "income" ? "+ ₹" : "- ₹"}${item.amount}`}
          </Typo>
          <Typo size={22} color={colors.black}>
            {date}
          </Typo>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: spacingY._17,
  },
  list: {
    minHeight: 3,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: spacingX._15,
    marginBottom: spacingY._17,
    backgroundColor: colors.neutral350,
    height: verticalScale(105),
    borderRadius: radius._15,
    padding: 10,
  },
  icon: {
    height: verticalScale(44),
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: radius._17,
    borderCurve: "continuous",
  },
  categoryDes: {
    flex: 1,
    justifyContent: "center",
  },
  amountDate: {
    alignItems: "flex-end",
    gap: 3,
  },
});
