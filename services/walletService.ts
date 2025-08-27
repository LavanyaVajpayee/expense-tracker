import { firestore } from "@/cofig/firebase";
import { ResponseType, WalletType } from "@/types";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
  where,
  writeBatch,
} from "firebase/firestore";
import { uploadFiletocloudinary } from "./imageService";

export const createOrupdatewallet = async (
  walletData: Partial<WalletType> //to pass some of the values
): Promise<ResponseType> => {
  try {
    //variable for all the data
    let walletTosave = { ...walletData };
    if (walletData.image) {
      const imguploadres = await uploadFiletocloudinary(
        //uploads to cloudinary
        walletData.image,
        "wallets"
      );
      if (!imguploadres.success) {
        return {
          success: false,
          msg: imguploadres.msg || "Failed to wallet icon",
        };
      }
      walletTosave.image = imguploadres.data;
    }

    //check if new wallet
    if (!walletData?.id) {
      walletTosave.amount = 0;
      walletTosave.totalExpenses = 0;
      walletTosave.totalIncome = 0;
      walletTosave.created = new Date();
    }

    //check what's going on here
    //i think walletref mei we store uss wallet ka info
    //jisse it can and be saved in the firestore agar vo id
    //exist nahi karti toh uske liye naya collection banayenge
    const walletRef = walletData?.id
      ? doc(firestore, "wallet", walletData.id)
      : doc(collection(firestore, "wallet"));
    //actual upgradation happems here
    await setDoc(walletRef, walletTosave, { merge: true }); //updates jo bhi naya change kia ho
    return { success: true, data: { ...walletTosave, id: walletRef.id } };
  } catch (error: any) {
    console.log("Error creating or updating the wallet", error);
    return { success: false, msg: error.message };
  }
};

export const deleteWallet = async (walletId: string): Promise<ResponseType> => {
  try {
    const walletref = doc(firestore, "wallet", walletId);
    await deleteDoc(walletref);

    deleteTransactionsByWallet(walletId);

    return { success: true, msg: "wallet deleted successfully" };
  } catch (err: any) {
    console.log("error deleting wallet: ", err);
    return { success: false, msg: err.message };
  }
};
export const deleteTransactionsByWallet = async (
  walletId: string
): Promise<ResponseType> => {
  try {
    let hasMoreTransaction = true;
    while (hasMoreTransaction) {
      const transactionsQuery = query(
        collection(firestore, "transaction"),
        where("walletId", "==", walletId)
      );

      const transactionsSnapshot = await getDocs(transactionsQuery);
      if (transactionsSnapshot.size == 0) {
        hasMoreTransaction = false;
        break;
      }
      const batch = writeBatch(firestore);
      transactionsSnapshot.forEach((transactionDoc) => {
        batch.delete(transactionDoc.ref);
      });
      await batch.commit();
    }
    return { success: true, msg: "All transactions deleted successfully" };
  } catch (err: any) {
    console.log("error deleting wallet: ", err);
    return { success: false, msg: err.message };
  }
};
// import { firestore } from "@/cofig/firebase";
// import { ResponseType, WalletType } from "@/types";
// import { collection, deleteDoc, doc, setDoc } from "firebase/firestore";
// import { uploadFiletocloudinary } from "./imageService";

// export const createOrupdatewallet = async (
//   walletData: Partial<WalletType>
// ): Promise<ResponseType> => {
//   try {
//     let walletTosave = { ...walletData };

//     // ✅ Upload image if provided
//     if (walletData.image) {
//       const imguploadres = await uploadFiletocloudinary(
//         walletData.image,
//         "wallets"
//       );
//       if (!imguploadres.success) {
//         return {
//           success: false,
//           msg: imguploadres.msg || "Failed to upload wallet icon",
//         };
//       }
//       walletTosave.image = imguploadres.data;
//     }

//     // ✅ Initialize default values for a new wallet
//     if (!walletData?.id) {
//       walletTosave.amount = 0;
//       walletTosave.totalExpenses = 0;
//       walletTosave.totalIncome = 0;
//       walletTosave.created = new Date();
//     }

//     // ✅ Get Firestore reference
//     const walletRef = walletData?.id
//       ? doc(firestore, "wallet", walletData.id)
//       : doc(collection(firestore, "wallet"));

//     // ✅ Save / update
//     await setDoc(walletRef, walletTosave, { merge: true });

//     // ✅ Always return Firestore doc.id
//     return { success: true, data: { ...walletTosave, id: walletRef.id } };
//   } catch (error: any) {
//     console.log("Error creating or updating the wallet", error);
//     return { success: false, msg: error.message };
//   }
// };

// export const deleteWallet = async (walletId: string): Promise<ResponseType> => {
//   try {
//     const walletref = doc(firestore, "wallet", walletId);
//     await deleteDoc(walletref);
//     return { success: true, msg: "Wallet deleted successfully" };
//   } catch (err: any) {
//     console.log("Error deleting wallet: ", err);
//     return { success: false, msg: err.message };
//   }
// };
