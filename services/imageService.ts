import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET } from "@/constants";
import { ResponseType } from "@/types";
import axios from "axios";
const CLOUDINARY_CLOUD_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;
export const uploadFiletocloudinary = async (
  file: { uri?: string } | string,
  folderName: string
): Promise<ResponseType> => {
  try {
    //READ ABOUT THE WHOLE THING
    if(!file) return {success:true,data:null};
    if(typeof file=='string'){
        return {success:true, data:file};
    }

    if(file && file.uri){
        const formData = new FormData();
        formData.append("file", {
            uri: file?.uri,
            type:"image/jpeg",
            name:file?.uri?.split("/").pop() || "file.jpg"
        } as any);
        formData.append("upload_preset",CLOUDINARY_UPLOAD_PRESET)
        formData.append("folder ",folderName)
        const response=await axios.post(CLOUDINARY_CLOUD_URL,formData,{
            headers:{
                "Content-Type":"multipart/form-data"
            }
        })
        // console.log("upload image result: ",response?.data)
        return { success: true,data:response?.data?.secure_url };
    }
    return { success: true };
  } catch (error: any) {
    console.log("got error uploasding the file", error);
    return { success: false, msg: error.message || "Could not upload file" };
  }
};
export const getProfileImage = (file: any) => {
  if (file && typeof file == "string") return file;
  if (file && typeof file == "object") return file.uri;
  //uri tells us where the file is located
  return require("../assets/images/default_avatar.png");
};
export const getFilePath = (file: any) => {
  if (file && typeof file == "string") return file;
  if (file && typeof file == "object") return file.uri;
  //uri tells us where the file is located
  return null;
};
