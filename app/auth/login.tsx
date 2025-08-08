import BackButton from '@/components/BackButton'
import Screenwrapper from '@/components/Screenwrapper'
import Typo from '@/components/Typo'
import { colors, spacingX, spacingY } from '@/constants/theme'
import { verticalScale } from '@/utils/styling'
import React from 'react'
import { StyleSheet, View } from 'react-native'
const Login = () => {
  return (
    <Screenwrapper>
        <View style={styles.container}>
            <BackButton/>
            {/* {{}} this shows we are using javascript */}
            <View style={{gap:5, marginTop:spacingY._20}}>
                <Typo size={50} fontWeight={700} style={{color:colors.black}}>Hey,</Typo>
                <Typo size={50} fontWeight={700} style={{color:colors.black}}>Welcome Back</Typo>
            </View>
            <View style={styles.form}>
                <Typo size={29} style={{color:"black"}}>
                    Login now to track all your expenses
                </Typo>
                
            </View>
        </View>
    </Screenwrapper>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: spacingY._20,
    paddingHorizontal: spacingX._20,
  },
  welcomeText: {
    fontSize: verticalScale(20),
    fontWeight: "bold",
    color: colors.black,
  },
  form: {
    gap: spacingY._20,
  },
  buttonContainer: {
    marginTop: spacingY._20,
  },
  header: {
    paddingTop: spacingY._7,
  },
  forgotPassword: {
    textAlign: "right",
    fontWeight: "500",
    color: colors.text,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
    marginTop: spacingY._15,
  },
  footerText: {
    textAlign: "center",
    color: colors.text,
    fontSize: verticalScale(15),
  },
});