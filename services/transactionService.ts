import { firestore } from "@/cofig/firebase";
import { ResponseType, TransactionType, WalletType } from "@/types";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { uploadFiletocloudinary } from "./imageService";
import { createOrupdatewallet } from "./walletService";

export const createOrUpdateTransaction = async (
  transactionData: Partial<TransactionType>
): Promise<ResponseType> => {
  try {
    const { id, type, walletId, amount, image } = transactionData;
    if (!amount || amount <= 0 || !walletId || !type) {
      return { success: false, msg: "Invalid transaction data" };
    }
    if (id) {
      const oldTransactionSnapshot = await getDoc(
        doc(firestore, "transaction", id)
      );
      const oldTransaction = oldTransactionSnapshot.data() as TransactionType;
      const shouldRevertOrignal =
        oldTransaction.type != type ||
        oldTransaction.amount != amount ||
        oldTransaction.walletId != walletId;
      if (shouldRevertOrignal) {
        let res = await revertAndUpdate(
          oldTransaction,
          Number(amount),
          type,
          walletId
        );
        if (!res.success) {
          return res;
        }
      }
    } else {
      let res = await updateWallet(walletId!, Number(amount!), type);
      if (!res.success) return res;
    }
    if (image) {
      const imguploadres = await uploadFiletocloudinary(image, "transaction");
      if (!imguploadres.success) {
        return {
          success: false,
          msg: imguploadres.msg || "Failed to upload receipt",
        };
      }
      transactionData.image = imguploadres.data;
    }
    const transactionRef = id
      ? doc(firestore, "transaction", id)
      : doc(collection(firestore, "transaction"));

    await setDoc(transactionRef, transactionData, { merge: true });
    return {
      success: true,
      data: { ...transactionData, id: transactionRef?.id },
    };
  } catch (err: any) {
    console.log("error creating transaction: ", err);
    return { success: false, msg: err.message };
  }
};
const updateWallet = async (walletId: string, amount: number, type: string) => {
  try {
    const walletRef = doc(firestore, "wallet", walletId);
    const walletSnapshot = await getDoc(walletRef);
    if (!walletSnapshot.exists()) {
      console.log("error updating wallet for new transaction: ");
      return { success: false, msg: "Wallet not found" };
    }
    const walletData = walletSnapshot.data() as WalletType;
    if (type == "expense" && walletData.amount! - amount < 0) {
      return {
        success: false,
        msg: "Selected wallet doesn't have enough balance",
      };
    }
    console.log("Wallet ref path:", walletRef.path);
    console.log("Exists:", walletSnapshot.exists());
    console.log("Data:", walletSnapshot.data());

    const updatedType = type == "income" ? "totalIncome" : "totalExpenses";
    const updatedWalletAmount =
      type == "income"
        ? Number(walletData.amount) + amount
        : Number(walletData.amount) - amount;

    const updateTotal =
      type == "income"
        ? Number(walletData.totalIncome) + amount
        : Number(walletData.totalExpenses) + amount;

    await updateDoc(walletRef, {
      amount: updatedWalletAmount,
      [updatedType]: updateTotal,
    });

    return { success: true };
  } catch (err: any) {
    console.log("error updating wallet for new transaction: ", err);
    return { success: false, msg: err.message };
  }
};
const revertAndUpdate = async (
  oldTransaction: TransactionType,
  newTransactionAmount: number,
  newTransactionType: string,
  newwalletId: string
) => {
  try {
    if (!oldTransaction.walletId) {
      throw new Error("Wallet ID is missing in oldTransaction");
    }
    // CHANGE MADE HERREEEE
    const originalWalletSnapshot = await getDoc(
      doc(firestore, "wallet", oldTransaction.walletId)
    );
    const orignalWallet = originalWalletSnapshot.data() as WalletType;
    let newWalletSnapshot = await getDoc(doc(firestore, "wallet", newwalletId));

    let newWallet = newWalletSnapshot.data() as WalletType;

    const revertType =
      oldTransaction.type == "income" ? "totalIncome" : "totalExpenses";

    const revertIncomeExpense: number =
      oldTransaction.type == "income"
        ? -Number(oldTransaction.amount)
        : Number(oldTransaction.amount);

    const revertedWalletAmount =
      Number(orignalWallet.amount) + revertIncomeExpense;
    //wallet amount after the transaction is removed
    const revertedIncomeExpenseAmount =
      Number(orignalWallet[revertType]) - Number(oldTransaction.amount);
    if (newTransactionType == "expense") {
      //if user tries to convert income to expense on the same wallet
      //or if user tries to increase the expense amount and doesn't haveenough balance
      if (
        oldTransaction.walletId == newwalletId &&
        revertedWalletAmount < newTransactionAmount
      ) {
        return {
          success: false,
          msg: "The selected wallet doesn't have enough balance",
        };
      }
      //if user tries to add expense from a new wallet but the wallet doesn't have enough balance
      if (newWallet.amount! < newTransactionAmount) {
        return {
          success: false,
          msg: "The selected wallet doesn't have enough balance",
        };
      }
    }

    await createOrupdatewallet({
      id: oldTransaction.walletId,
      amount: revertedWalletAmount,
      [revertType]: revertedIncomeExpenseAmount,
    });

    //revert completed
    ////////////////////////////////////////////////////////////////////////////////////////

    //refetch the newwallet because we may have just updated it
    newWalletSnapshot = await getDoc(doc(firestore, "wallet", newwalletId));

    newWallet = newWalletSnapshot.data() as WalletType;

    const updateType =
      newTransactionType == "income" ? "totalIncome" : "totalExpenses";

    const updatedTransactionAmount: number =
      newTransactionType == "income"
        ? Number(newTransactionAmount)
        : -Number(newTransactionAmount);

    const newWalletAmount = Number(newWallet.amount) + updatedTransactionAmount;

    const newIncomeExpenseAMount = Number(
      newWallet[updateType]! + Number(newTransactionAmount)
    );

    await createOrupdatewallet({
      id: newwalletId,
      amount: newWalletAmount,
      [updateType]: newIncomeExpenseAMount,
    });

    return { success: true };
  } catch (err: any) {
    console.log("error updating wallet for new transaction: ", err);
    return { success: false, msg: err.message };
  }
};

export const deleteTransaction = async (
  transactionId: string,
  walletId: string
) => {
  try {
    const transactionRef = doc(firestore, "transaction", transactionId);
    const transactionSnapshot = await getDoc(transactionRef);
    if (!transactionSnapshot.exists()) {
      return { success: false, msg: "Transaction not found" };
    }
    const transactionData = transactionSnapshot.data() as TransactionType;
    const transactionType = transactionData?.type;
    const transactionAmount = transactionData?.amount;
    //fetch wallet to update total income , total expenses

    const walletSnapshot = await getDoc(doc(firestore, "wallet", walletId));

    const walletData = walletSnapshot.data() as WalletType;

    //check fields to be updated based on transaction type

    const updateType =
      transactionType == "income" ? "totalIncome" : "totalExpenses";

    const newWalletAmount =
      walletData?.amount! -
      (transactionType == "income" ? transactionAmount : -transactionAmount);

    const newIncomeExpenseAMount = walletData[updateType]! - transactionAmount;
    //if its expense and the wallet amount can go below zero
    if (transactionType == "expense" && newWalletAmount < 0) {
      return { success: false, msg: "Youcannot delete this transaction" };
    }
    await createOrupdatewallet({
      id: walletId,
      amount: newWalletAmount,
      [updateType]: newIncomeExpenseAMount,
    });

    await deleteDoc(transactionRef);
    return { success: true };
  } catch (err: any) {
    console.log("error updating wallet for new transaction: ", err);
    return { success: false, msg: err.message };
  }
};
