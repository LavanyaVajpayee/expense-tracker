import { colors } from '@/constants/theme'
import { BackButtonProps } from '@/types'
import { verticalScale } from '@/utils/styling'
import { useRouter } from 'expo-router'
import { CaretLeftIcon } from 'phosphor-react-native'
import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
const BackButton = ({
    style,
    iconSize=45
}:BackButtonProps) => {
    const router=useRouter();
  return (
    <TouchableOpacity onPress={()=>{
        router.back()
    }} style={[styles.button,style]}>
        <CaretLeftIcon size={verticalScale(iconSize)}
        color={colors.black}
        weight='bold'></CaretLeftIcon>
    </TouchableOpacity >
  )
}

export default BackButton

const styles = StyleSheet.create({
    button:{
        backgroundColor:colors.neutral200,
        alignSelf:"flex-start",
        borderRadius:12,
        padding:5,
    },
})