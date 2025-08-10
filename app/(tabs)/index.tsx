import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '@/cofig/firebase'
import Button from '@/components/Button'
import { colors } from '@/constants/theme'
import Typo from '@/components/Typo'
import { useAuth } from '@/contexts/authContext'
import Screenwrapper from '@/components/Screenwrapper'
import { verticalScale } from '@/utils/styling'
const Home = () => {
  const {user} =useAuth();
  // console.log(user);
  const handleLogout=async()=>{
    await signOut(auth);
  }
  return (
    <Screenwrapper>
      <Typo fontWeight={800} size={50}>Home</Typo>
      {/* <Button style={{borderRadius: 20 }} onPress={handleLogout} >
        <Typo fontWeight={600} color='black' size={verticalScale(65)}>Logout
          </Typo> 
          </Button> */}
    </Screenwrapper>
  )
}

export default Home

const styles = StyleSheet.create({})