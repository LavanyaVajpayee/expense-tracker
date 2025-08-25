import BackButton from "@/components/BackButton";
import Button from "@/components/Button";
import Header from "@/components/Header";
import ImageUpload from "@/components/ImageUpload";
import Input from "@/components/Input";
import ModalWrapper from "@/components/ModalWrapper";
import Typo from "@/components/Typo";
import { colors, spacingX, spacingY } from "@/constants/theme";
import { useAuth } from "@/contexts/authContext";
import { createOrupdatewallet, deleteWallet } from "@/services/walletService";
import { WalletType } from "@/types";
import { scale, verticalScale } from "@/utils/styling";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as Icons from "phosphor-react-native";
import React, { useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet, View } from "react-native";
const WalletModal = () => {
  const { user, updateUserData } = useAuth();
  const [wallet, setwallet] = useState<WalletType>({
    name: "",
    image: null,
  });
  const [isLoading, setloading] = useState(false);
  const router = useRouter();
  const oldwallet: { name: string; image: string; id: string } =
    useLocalSearchParams();
  // console.log("old", oldwallet);
  useEffect(() => {
    if (oldwallet?.id) {
      setwallet({ name: oldwallet?.name, image: oldwallet?.image });
    }
  }, []);
  const onSubmit = async () => {
    let { name, image } = wallet;
    if (!name.trim() || !image) {
      Alert.alert("Wallet", "Please fill all the fields");
      return;
    }
    const data: WalletType = {
      name,
      image,
      uid: user?.uid,
    };
    if (oldwallet?.id) {
      data.id = oldwallet?.id;
    }
    setloading(true); //why do we do this always???
    const res = await createOrupdatewallet(data);
    setloading(false); //why do we do this always???
    console.log("result: ", res);
    if (res.success) {
      router.back();
    } else {
      Alert.alert("Wallet", res.msg);
    }
  };
  const onDel = async () => {
    if (!oldwallet?.id) return;
    setloading(true);
    const res = await deleteWallet(oldwallet?.id);
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
  return (
    <ModalWrapper>
      <View style={styles.container}>
        <Header
          title={oldwallet?.id ? "Update Wallet" : "New Wallet"}
          leftIcon={<BackButton />}
          style={{ marginBottom: spacingY._10 }}
        ></Header>
        {/* why didn't we write normal style={} */}
        <ScrollView contentContainerStyle={styles.form}>
          <View style={styles.inputContainer}>
            <Typo color={colors.neutral300} size={50} fontWeight={"500"}>
              Wallet Name
            </Typo>
            <Input
              placeholder="Salary"
              value={wallet.name}
              onChangeText={(value) => setwallet({ ...wallet, name: value })}
            />
          </View>
          <View style={styles.inputContainer}>
            <Typo color={colors.neutral300} size={50} fontWeight={"500"}>
              Wallet Icon
            </Typo>
            <ImageUpload
              file={wallet.image}
              onClear={() => setwallet({ ...wallet, image: null })}
              onSelect={(file) => setwallet({ ...wallet, image: file })}
              placeholder="Upload image"
            />
          </View>
        </ScrollView>
      </View>
      <View style={styles.footer}>
        {oldwallet?.id && (
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
            {oldwallet?.id ? "Update Wallet" : "Add Wallet"}
          </Typo>
        </Button>
      </View>
    </ModalWrapper>
  );
};

export default WalletModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
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
    gap: spacingY._10,
    marginTop: spacingY._15,
  },
  avatarContainer: {
    position: "relative",
    alignSelf: "center",
  },
  avatar: {
    alignSelf: "center",
    backgroundColor: colors.neutral200,
    height: verticalScale(135),
    width: verticalScale(135),
    borderRadius: 200,
    // overflow:"hidden",
    // position:"relative"
  },
  editIcon: {
    position: "absolute",
    bottom: spacingY._5,
    right: spacingY._7,
    borderRadius: 100,
    backgroundColor: colors.neutral100,
    elevation: 4,
    padding: spacingY._7,
  },
  inputContainer: {
    gap: spacingY._10,
  },
});
