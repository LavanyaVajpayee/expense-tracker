import { colors, radius } from "@/constants/theme";
import { getFilePath } from "@/services/imageService";
import { ImageUploadProps } from "@/types";
import { scale, verticalScale } from "@/utils/styling";
import * as Icons from "phosphor-react-native";
import React from "react";
import { Image } from "expo-image";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Typo from "./Typo";
import * as ImagePicker from 'expo-image-picker';
const ImageUpload = ({
  file = null,
  onSelect,
  onClear,
  containerStyle,
  imageStyle,
  placeholder = "",
}: ImageUploadProps) =>{
    const pickImage=async ()=>{
        let result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ['images'],
              allowsEditing: true,
              aspect: [4, 3],
              quality: 0.5,
            });
            //explain result and its props
            console.log(result);
        
            if (!result.canceled) {
              onSelect(result.assets[0]);
            }
    }

  return (
    <View>
      {!file && (
        // container styles from parent component to override
        <TouchableOpacity
        onPress={pickImage}
          style={[styles.inputContainer, containerStyle && containerStyle]}
        >
          <Icons.UploadSimple color={colors.neutral200} />
          {placeholder && <Typo size={30}>{placeholder}</Typo>}
        </TouchableOpacity>
      )}
      {file && (
        <View style={[styles.image, imageStyle && imageStyle]}>
          <Image
            style={{ flex: 1 }}
            source={getFilePath(file)}
            transition={100}
          />
          <TouchableOpacity style={styles.delicon} onPress={onClear}>
            <Icons.XIcon
            size={verticalScale(44)}
            weight="fill"
            color={colors.neutral50}
            
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default ImageUpload;

const styles = StyleSheet.create({
  inputContainer: {
    height: verticalScale(84),
    backgroundColor: colors.neutral700,
    borderRadius: radius._15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    borderWidth: 1,
    borderColor: colors.neutral500,
    borderStyle: "dashed",
  },
  image: {
    height:scale(150),
    width:scale(150),
    borderRadius:radius._15,
    overflow:"hidden"
  },
  delicon:{
    position:"absolute",
    top:scale(6),
    right:scale(6),
    elevation: 15,
  borderRadius: 22, 
  backgroundColor: "rgba(179, 169, 169, 0.31)",   // must be solid (white/black/any color)
  }
});
