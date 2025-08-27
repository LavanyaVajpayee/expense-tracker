import BackButton from "@/components/BackButton";
import Button from "@/components/Button";
import Header from "@/components/Header";
import ImageUpload from "@/components/ImageUpload";
import Input from "@/components/Input";
import ModalWrapper from "@/components/ModalWrapper";
import Typo from "@/components/Typo";
import { expenseCategories, transactionTypes } from "@/constants/data";
import { colors, radius, spacingX, spacingY } from "@/constants/theme";
import { useAuth } from "@/contexts/authContext";
import useFetchData from "@/hooks/useFetchData";
import { deleteWallet } from "@/services/walletService";
import { TransactionType, WalletType } from "@/types";
import { scale, verticalScale } from "@/utils/styling";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useLocalSearchParams, useRouter } from "expo-router";
import { orderBy, where } from "firebase/firestore";
import * as Icons from "phosphor-react-native";
import React, { useState } from "react";
import { Alert, Pressable, ScrollView, StyleSheet, View } from "react-native";

import { Dropdown } from "react-native-element-dropdown";
const TransactionModal = () => {
  const { user } = useAuth();
  const [transaction, settransaction] = useState<TransactionType>({
    title: "",
    type: "expense",
    amount: 0,
    description: "",
    category: "",
    date: new Date(),
    walletId: "",
    image: null,
  });
  const [isLoading, setloading] = useState(false);
  const [showdatepicker, setdatepicker] = useState(false);
  const router = useRouter();
  const {
    data: wallets,
    error: walleterror,
    loading: walletloading,
  } = useFetchData<WalletType>("wallet", [
    where("uid", "==", user?.uid),
    orderBy("created", "desc"),
  ]);
  const oldtransaction: { name: string; image: string; id: string } =
    useLocalSearchParams(); //why??
  const onDatechange = (event: any, selectedDate: any) => {
    const currDate = selectedDate || transaction.date;
    settransaction({ ...transaction, date: currDate });
    setdatepicker(false);
  };
  const onSubmit = async () => {
    const { type, amount, description, category, date, walletId, image } =
      transaction;
    if (!walletId || !date || !amount || (type == "Expense" && !category)) {
      Alert.alert("Transaction", "Please fill all the fields");
      return;
    }
    console.log("good to go");
    let transactiondata: TransactionType = {
      type,
      amount,
      description,
      category,
      date,
      walletId,
      image,
      uid: user?.uid,
      title: "",
    };
    console.log("transaction data ", transactiondata);
  };
  const onDel = async () => {
    if (!oldtransaction?.id) return;
    setloading(true);
    const res = await deleteWallet(oldtransaction?.id);
    setloading(false);
    if (res.success) {
      router.back();
    } else {
      Alert.alert("Wallet", res.msg);
    }
  };
  const showDelAlert = () => {
    Alert.alert(
      "Confirm",
      "Are you sure you want to do this?\nThis action will remove all the transactions realted to this wallet.",
      [
        {
          text: "Cancel",
          onPress: () => console.log("cancel,delete"),
          style: "cancel", //different style or what?
        },
        {
          text: "Delete",
          onPress: () => onDel(),
          style: "destructive", // which style?
        },
      ]
    );
  };

  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  return (
    <ModalWrapper>
      <View style={styles.container}>
        <Header
          title={oldtransaction?.id ? "Update Transaction" : "New Transaction"}
          leftIcon={<BackButton />}
          style={{ marginBottom: spacingY._10 }}
        ></Header>
        {/* why didn't we write normal style={} */}
        <ScrollView
          contentContainerStyle={styles.form}
          showsHorizontalScrollIndicator={false}
        >
          <View style={styles.inputContainer}>
            <Typo color={colors.neutral300} size={50} fontWeight={"500"}>
              Type
            </Typo>
            <Dropdown
              style={styles.dropdowncontainer}
              activeColor={colors.neutral700}
              // placeholderStyle={styles.dropdownlistcontainer}
              selectedTextStyle={styles.dropdownselectedext}
              iconStyle={styles.dropdownicon}
              data={transactionTypes}
              maxHeight={300}
              labelField="label"
              valueField="value"
              itemTextStyle={styles.dropdownitemtext}
              itemContainerStyle={styles.dropdownitemcontainer}
              containerStyle={styles.dropdownlistcontainer}
              // placeholder={!isFocus ? "Select item" : "..."}
              value={transaction.type}
              onChange={(item) => {
                settransaction({ ...transaction, type: item.value });
              }}
            />
          </View>
          <View style={styles.inputContainer}>
            <Typo color={colors.neutral300} size={50} fontWeight={"500"}>
              Wallet
            </Typo>
            <Dropdown
              style={styles.dropdowncontainer}
              activeColor={colors.neutral700}
              placeholderStyle={styles.dropdownplaceholder}
              selectedTextStyle={styles.dropdownselectedext}
              iconStyle={styles.dropdownicon}
              data={wallets.map((wallet) => ({
                label: `${wallet?.name} ($${wallet.amount})`,
                value: wallet?.id,
              }))}
              maxHeight={300}
              labelField="label"
              valueField="value"
              itemTextStyle={styles.dropdownitemtext}
              itemContainerStyle={styles.dropdownitemcontainer}
              containerStyle={styles.dropdownlistcontainer}
              placeholder={"Select wallet"}
              value={transaction.walletId}
              onChange={(item) => {
                settransaction({ ...transaction, walletId: item.value });
              }}
            />
          </View>
          {transaction.type == "expense" && (
            <View style={styles.inputContainer}>
              <Typo color={colors.neutral300} size={50} fontWeight={"500"}>
                Expense Category
              </Typo>
              <Dropdown
                style={styles.dropdowncontainer}
                activeColor={colors.neutral700}
                placeholderStyle={styles.dropdownplaceholder}
                selectedTextStyle={styles.dropdownselectedext}
                iconStyle={styles.dropdownicon}
                data={Object.values(expenseCategories)}
                maxHeight={300}
                labelField="label"
                valueField="value"
                itemTextStyle={styles.dropdownitemtext}
                itemContainerStyle={styles.dropdownitemcontainer}
                containerStyle={styles.dropdownlistcontainer}
                placeholder={"Select category"}
                value={transaction.category}
                onChange={(item) => {
                  settransaction({ ...transaction, walletId: item.value });
                }}
              />
            </View>
          )}

          <View style={styles.inputContainer}>
            <Typo color={colors.neutral300} size={50} fontWeight={"500"}>
              Date
            </Typo>
          </View>
          {!showdatepicker && (
            <Pressable
              style={styles.dateInput}
              onPress={() => {
                setdatepicker(true);
              }}
            >
              <Typo size={24} fontWeight={"400"}>
                {transaction.date.toLocaleString()}
              </Typo>
            </Pressable>
          )}
          {showdatepicker && (
            <View>
              <DateTimePicker
                value={transaction.date as Date}
                mode="date"
                display="calendar"
                onChange={onDatechange}
              />
            </View>
          )}
          <View style={styles.inputContainer}>
            <Typo color={colors.neutral300} size={50} fontWeight={"500"}>
              Amount
            </Typo>
            <Input
              keyboardType="numeric"
              value={transaction.amount?.toString()}
              onChangeText={(value) =>
                settransaction({
                  ...transaction,
                  amount: Number(value.replace(/[^0-9]/g, "")),
                })
              } //only accepts values 0-9
            />
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.flexRow}>
              <Typo color={colors.neutral200} size={50} fontWeight={"500"}>
                Reciept
              </Typo>
              <Typo color={colors.neutral500} size={40} fontWeight={"500"}>
                (Optional)
              </Typo>
            </View>
            <ImageUpload
              file={transaction.image}
              onClear={() => settransaction({ ...transaction, image: null })}
              onSelect={(file) =>
                settransaction({ ...transaction, image: file })
              }
              placeholder="Upload image"
            />
          </View>
        </ScrollView>
      </View>
      <View style={styles.footer}>
        {oldtransaction?.id && (
          <Button
            onPress={showDelAlert}
            style={{
              backgroundColor: colors.rose,
              paddingHorizontal: spacingX._15,
            }}
          >
            <Icons.Trash
              color={colors.white}
              size={verticalScale(30)}
              weight="bold"
            />
          </Button>
        )}
        <Button onPress={onSubmit} style={{ flex: 1 }} loading={isLoading}>
          <Typo color="black" fontWeight={"700"} size={40}>
            {oldtransaction?.id ? "Update" : "Submit"}
          </Typo>
        </Button>
      </View>
    </ModalWrapper>
  );
};

export default TransactionModal;

const styles = StyleSheet.create({
  dropdowncontainer: {
    height: verticalScale(88),
    marginTop: verticalScale(25),
    borderWidth: 1,
    borderColor: colors.neutral300,
    paddingHorizontal: spacingX._15,
    borderRadius: radius._15,
  },
  dropdownitemtext: {
    color: colors.white,
  },
  dropdownplaceholder: {
    color: colors.white,
  },
  dropdownselectedext: {
    color: colors.white,
    fontSize: verticalScale(24),
  },
  dropdownitemcontainer: {
    borderRadius: radius._15,
    marginHorizontal: spacingX._7,
  },
  dropdownicon: {
    height: verticalScale(30),
    tintColor: colors.neutral300,
  },
  dropdownlistcontainer: {
    backgroundColor: colors.neutral900,
    borderRadius: radius._15,
    paddingVertical: spacingY._7,
    top: 5,
    borderColor: colors.neutral500,
    elevation: 5,
  },
  container: {
    flex: 1,
    paddingHorizontal: spacingX._20,
  },
  footer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: spacingX._20,
    gap: scale(12),
    paddingTop: spacingY._15,
    borderTopColor: colors.neutral700,
    marginBottom: spacingY._5,
    borderTopWidth: 1,
  },
  form: {
    gap: spacingY._20,
    paddingBottom: spacingY._40,
    paddingVertical: spacingY._15,
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacingX._5,
    borderColor: colors.neutral300,
  },
  inputContainer: {
    gap: spacingY._10,

    borderColor: colors.white,
  },
  dateInput: {
    flexDirection: "row",
    height: verticalScale(84),
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.neutral300,
    borderRadius: radius._17,
    paddingHorizontal: spacingX._15,
  },
  datePickerButton: {
    backgroundColor: colors.black,
    paddingVertical: 14, // <-- increase height
    paddingHorizontal: 16,
  },
});
