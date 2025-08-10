import BackButton from '@/components/BackButton'
import Button from '@/components/Button'
import Input from '@/components/Input'
import Screenwrapper from '@/components/Screenwrapper'
import Typo from '@/components/Typo'
import { colors, spacingX, spacingY } from '@/constants/theme'
import { verticalScale } from '@/utils/styling'
import { useRouter } from 'expo-router'
import * as Icons from 'phosphor-react-native'
import React from 'react'
import { useRef, useState } from 'react'
import { useAuth } from '@/contexts/authContext'
import { Alert, Pressable, StyleSheet, View } from 'react-native'
const Register = () => {
  //we could also usestate but that would always re render whenever user types a value
  const emailref=useRef("");
  const passref=useRef("");
  const nameref=useRef("");
  const router=useRouter();
  //de-structruring taking the property called register and naming it registerUser
  const{register:registerUser}=useAuth();
  const [isloading,setLoading,]=useState(false)
  const handlesubmit=async()=>{
    if(!emailref.current || !passref.current|| !nameref){
      Alert.alert("Login","Please fill all the fields");
      return;
    }
    setLoading(true);
    const res=await registerUser(emailref.current,passref.current,nameref.current);
    setLoading(false);
    console.log("register result",res)
    if(!res.success){
      Alert.alert("Sign Up",res.msg)
    }
  };
  return (
    <Screenwrapper>
        <View style={styles.container}>
            <BackButton/>
            {/* {{}} this shows we are using javascript */}
            <View style={{gap:5, marginTop:spacingY._20}}>
                <Typo size={60} fontWeight={700} style={{color:colors.black}}>Let's </Typo>
                <Typo size={60} fontWeight={700} style={{color:colors.black}}>Get Started</Typo>
            </View>
            <View style={styles.form}>
                <Typo size={44} style={{color:"black"}}>
                    Create an account to track all your expenses
                </Typo>
                
            </View>
            <Input
            onChangeText={(value)=>(nameref.current=value)}
            placeholder='Enter Name' icon={<Icons.User size={verticalScale(35)} weight='fill'/>} />
            <Input
            onChangeText={(value)=>(emailref.current=value)}
            placeholder='Enter Email' icon={<Icons.At size={verticalScale(35)} weight='fill'/>} />
            <Input
            // so that info is hidden
            secureTextEntry
            onChangeText={(value)=>(passref.current=value)}
            placeholder='Enter Password' icon={<Icons.Lock size={verticalScale(35)} weight='fill'/>} />
            
          <Button loading={isloading}onPress={handlesubmit}>
            <Typo fontWeight={'600'} color={colors.black} size={38}>Sign Up</Typo>
          </Button>
        <View style={styles.footer}>
        <Typo size={30} fontWeight={500} color={colors.neutral700} style={{textAlign:'center'} }>
            Already have an Account?
          </Typo>
          <Pressable onPress={()=>router.navigate('/auth/login')}>
            <Typo size={30} fontWeight={500} color={colors.green} style={{textAlign:'center'}}>Login</Typo>
          </Pressable>
        </View>

        </View>
    </Screenwrapper>
  )
}

export default Register

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