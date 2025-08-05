import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Screenwrapper from '@/components/Screenwrapper'
import Typo from '@/components/Typo'
import { spacingX, spacingY,colors } from '@/constants/theme'
import { verticalScale } from '@/utils/styling'
import { Image } from 'react-native'
const Welcome = () => {
  return (
    <Screenwrapper>
      {/* view is like div in html it is used to group components */}
      <View style={styles.container}>
        <View>
          <TouchableOpacity style={styles.loginButton}> 
            <Typo fontWeight={"600"} style={{fontSize:25 ,color:colors.neutral800}} >Sign in</Typo>
          </TouchableOpacity>
        <Image source={require('../../assets/images/welcome.png')} 
        style={styles.welcomeImage}
        resizeMode='contain'></Image>
        </View>
        <View style={styles.footer}>
          <View style={{alignItems:"center"}}>
            <Typo size={40} fontWeight={"400"}>Always take control</Typo>
            <Typo size={40} fontWeight={"400"}>of your finances</Typo>
          </View>
        
          <View style={{alignItems:"center",gap:2}}>
            <Typo size={24} color={colors.textLight}>Finance must be arrangedto set a better</Typo>
            <Typo size={24} color={colors.textLight}>lifeestyke in future</Typo>
          </View>
        <View style={styles.buttonContainer}>
          
        </View>
        </View>
      </View>
    </Screenwrapper>
  )
}

export default Welcome
const styles = StyleSheet.create({
  container: {
    flex: 1,//to fill the available space in parent component
    justifyContent: "space-between",
    paddingTop: spacingY._7
  },
  header: {
    paddingTop: spacingY._7,
  },
  welcomeImage: {
    width: "100%",
    height: verticalScale(450),
    alignSelf: "center",
    marginTop: verticalScale(50),
  },
  loginButton: {
    alignSelf: "flex-end",
    marginRight: spacingX._20,
  },
 footer: {
  backgroundColor: colors.neutral800,
  alignItems: "center",
  paddingTop: verticalScale(20),
  paddingBottom: verticalScale(30),
  gap: spacingY._12,
  // height:80,
  elevation: 12, // enough to show a visible shadow
  shadowColor: "#000", // has no effect on Android, just for iOS fallback
  borderTopLeftRadius: 10,
  borderTopRightRadius: 10,
}

,
  buttonContainer: {
    width: "100%",
    paddingHorizontal: spacingX._25,
  },
});