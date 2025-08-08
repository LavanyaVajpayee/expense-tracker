import { colors } from '@/constants/theme'
import React from 'react'
import { ActivityIndicator, ActivityIndicatorProps, StyleSheet, View } from 'react-native'
const Loading = ({
    size="large",
    color=colors.primary
    //ActivityIndicatorProps is a part of ActivityIndicator component it has a few more characteristics
    //this ensures that the props follow the shape of the component
}:ActivityIndicatorProps) => {
  return (
    <View style={{flex:1,
    justifyContent:'center', alignItems:'center'}}>
      <ActivityIndicator size={size} color={color}/>
    </View>
  )
}

export default Loading

const styles = StyleSheet.create({})