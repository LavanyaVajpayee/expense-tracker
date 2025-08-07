import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Screenwrapper from '@/components/Screenwrapper'
import Typo from '@/components/Typo'
import { spacingX, spacingY,colors } from '@/constants/theme'
import { verticalScale } from '@/utils/styling'
import { Image } from 'react-native'
import Button from '@/components/Button'
import Animated, { FadeIn, FadeInDown }  from 'react-native-reanimated'
const Welcome = () => {
  return (
    <Screenwrapper>
      {/* view is like div in html it is used to group components */}
      <View style={styles.container}>
        <View>
          <TouchableOpacity style={styles.loginButton}> 
            <Typo fontWeight={"600"} style={{fontSize:25 ,color:colors.neutral800}} >Sign in</Typo>
          </TouchableOpacity>
          <Animated.Image
          entering={FadeIn.duration(1000)}

        source={require('../../assets/images/welcome.png')} 
        style={styles.welcomeImage}
        resizeMode='contain'/>
        </View>
        <View style={styles.footer}>
          <Animated.View
          entering={FadeInDown.duration(1000).springify().damping(12)} style={{alignItems:"center"}}>
            <Typo size={40} fontWeight={"400"}>Always take control</Typo>
            <Typo size={40} fontWeight={"400"}>of your finances</Typo>
          </Animated.View>
        
          <Animated.View style={{alignItems:"center",gap:2}}
           entering={FadeInDown.duration(1000).delay(100).springify().damping(12)}>
            <Typo size={24} color={colors.textLight}>Finance must be arrangedto set a better</Typo>
            <Typo size={24} color={colors.textLight}>lifestyle in future</Typo>
          </Animated.View>
        <Animated.View style={styles.buttonContainer}
         entering={FadeInDown.duration(1000).delay(200).springify().damping(12)}>
          <Button>
            <Typo size={45} fontWeight={500}>
              Get Started
            </Typo>
            </Button>
        </Animated.View>
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