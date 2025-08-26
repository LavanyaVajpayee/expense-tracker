import { incomeCategory } from "@/constants/data";
import { colors, radius, spacingX, spacingY } from "@/constants/theme";
import { TransactionItemProps, TransactionListType } from "@/types";
import { verticalScale } from "@/utils/styling";
import { FlashList } from "@shopify/flash-list";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import Loading from "./Loading";
import Typo from "./Typo";
const TransactionList = ({
  data,
  emptyListMessage,
  title,
  loading,
}: TransactionListType) => {
  const handleClick = () => {};
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
      {!loading && data.length == 0 && (
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
  let category = incomeCategory;
  const IconComponent = category.icon;
  return (
    <Animated.View
      entering={FadeInDown.delay(index * 70)
        .springify()
        .damping(14)}
    >
      <TouchableOpacity style={styles.row} onPress={() => handleClick(item)}>
        {/* why bgcolor seperately? */}
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
            {item?.description} hh
          </Typo>
          {/* //what is this line the one above?? */}
        </View>
        <View style={styles.amountDate}>
          <Typo fontWeight={"500"} color={colors.rose}>
            97
          </Typo>
          <Typo size={22} color={colors.black}>
            12/2/23
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
    //why specifically this?
    //flatlist and flashlist
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
    // gap: 2.5,
  },
  amountDate: {
    alignItems: "flex-end",
    gap: 3,
  },
});
