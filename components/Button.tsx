import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { CustomButtonProps } from '@/types'

const Button = ({
    style,
    onPress,
    loading=false,
    children
}:CustomButtonProps) => {
  return (
    <View>
      <Text>Button</Text>
    </View>
  )
}

export default Button

const styles = StyleSheet.create({})