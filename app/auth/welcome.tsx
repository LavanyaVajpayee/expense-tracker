import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Screenwrapper from '@/components/Screenwrapper'
import Typo from '@/components/Typo'
const Welcome = () => {
  return (
    <Screenwrapper>
      <Typo size={80}>Welcome</Typo>
    </Screenwrapper>
  )
}

export default Welcome

const styles = StyleSheet.create({})