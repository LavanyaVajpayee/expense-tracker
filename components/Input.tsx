import { colors, spacingX } from '@/constants/theme'
import { InputProps } from '@/types'
import { verticalScale } from '@/utils/styling'
import React from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
const Input = (props:InputProps) => {
  return (
    <View 
    style={[styles.container, props.containerStyle]}>
        {
            props.icon
        }
      <TextInput
      style={[styles.input, props.inputStyle]}
      placeholderTextColor={colors.neutral400}
      ref={props.inputRef}
      />
    </View>
  )
}

export default Input

const styles = StyleSheet.create({
    container:{
        height:verticalScale(54),
        borderWidth:1,
        width:'100%',
        borderColor:colors.black,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",
        borderRadius:17,
        paddingHorizontal:spacingX._15,
        gap: spacingX._10,
    },
    input:{
        flex:1,
        color:colors.black,
        fontSize:verticalScale(15)
    }
})