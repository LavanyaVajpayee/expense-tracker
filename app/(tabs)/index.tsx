import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '@/cofig/firebase'
import Button from '@/components/Button'
import { colors } from '@/constants/theme'
import Typo from '@/components/Typo'
import { useAuth } from '@/contexts/authContext'
const Home = () => {
  const {user} =useAuth();
  console.log(user);
  const handleLogout=async()=>{
    await signOut(auth);
  }
  return (
    <Button onPress={handleLogout}>
      <Typo color={colors.black}>Logout</Typo>
    </Button>
    
  )
}

export default Home

const styles = StyleSheet.create({})