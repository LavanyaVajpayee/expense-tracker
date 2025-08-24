import { firestore } from "@/cofig/firebase";
import { ResponseType, WalletType } from "@/types";
import { collection, doc, setDoc } from "firebase/firestore";
import { uploadFiletocloudinary } from "./imageService";

export const createOrupdatewallet = async (
  walletData: Partial<WalletType> //to pass some of the values
): Promise<ResponseType> => {
  try {
    //variable for all the data
    let walletTosave = { ...walletData };
    if (walletData.image) {
      const imguploadres = await uploadFiletocloudinary(//uploads to cloudinary
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
      ? doc(firestore, "wallets", walletData.id)
      : doc(collection(firestore, "wallet"));
//actual upgradation happems here
      await setDoc(walletRef,walletTosave,{merge:true})//updates jo bhi naya change kia ho
      return{success:true,data:{...walletTosave, id:walletRef.id}}
  } catch (error: any) {
    console.log("Error creating or updating the wallet", error);
    return { success: false, msg: error.message };
  }
};
