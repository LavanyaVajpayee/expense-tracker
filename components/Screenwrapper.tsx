import { Dimensions, Platform,StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ScreenWrapperProps } from '@/types'
import { colors } from '@/constants/theme'
import { DarkTheme } from '@react-navigation/native'
const {height}=Dimensions.get('window')
//here we are using destructuring
const Screenwrapper = ({style,children}:ScreenWrapperProps) => {
    let paddingTop=Platform.OS=='android'?50:height*0.06;
    return (
        //{[]} here we make an array to add more styles later if we want
    <View style={[{paddingTop,flex:1,
        backgroundColor:colors.white
    },style]}>
        <StatusBar barStyle={'dark-content'}/>
      {children}
    </View>
  )
}

export default Screenwrapper

const styles = StyleSheet.create({})