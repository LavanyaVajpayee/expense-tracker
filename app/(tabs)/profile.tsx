import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Screenwrapper from '@/components/Screenwrapper'
import { colors, spacingX, spacingY } from '@/constants/theme'
import { verticalScale } from '@/utils/styling'
import { radius } from '@/constants/theme'
import Header from '@/components/Header'
import Typo from '@/components/Typo'
import { useAuth } from '@/contexts/authContext'
import { Image } from 'expo-image'
import { getProfileImage } from '@/services/imageService'
import { accountOptionType } from '@/types'
import * as Icon from "phosphor-react-native"
import Animated, { FadeInDown } from 'react-native-reanimated'
import { Alert } from 'react-native'
import { auth } from '@/cofig/firebase'
import { signOut } from 'firebase/auth'
import { useRouter } from 'expo-router'
const Profile = () => {
  const {user}=useAuth();
  const router=useRouter();
  const accountOptions:accountOptionType[]=[
    {title:"Edit Profile",
    icon:(
      <Icon.User
      size={26}
      color={colors.white}
      weight='fill'
      />
    ),
    routeName:'/(modals)/profileModal',
    bgColor:"#6366f1"
},
    {title:"Settings",
    icon:(
      <Icon.GearSix
      size={26}
      color={colors.white}
      weight='fill'
      />
    ),
    bgColor:"green"
},
    {title:"Privacy Policy",
    icon:(
      <Icon.Lock
      size={26}
      color={colors.white}
      weight='fill'
      />
    ),
    bgColor:colors.neutral600
},
    {title:"Logout",
    icon:(
      <Icon.Power
      size={26}
      color={colors.white}
      weight='fill'
      />
    ),
    bgColor:"red"
},
  ]
  const handleLogout=async()=>{
      await signOut(auth);
    }
  const showLogoutAlert=()=>{
    Alert.alert("Confirm","Are you sure you want to logout?",[
      {text:"Cancel",
      onPress:()=>console.log("cancel logout"),
      style:'cancel'},
      
      {text:"Logout",
      onPress:()=>handleLogout(),
      style:'destructive'},

    ])
  }
  const handlePress= (item:accountOptionType)=>{
    if(item.title==="Logout"){
      showLogoutAlert();
    }
    //edit profile
    if(item.routeName){
      router.push(item.routeName)
    }
  }
  return (
    <Screenwrapper>
      <View style={styles.container}>
        <Header title='Profile' style={{marginVertical:spacingY._10}}/>
        <View style={styles.userInfo}>
        <View>
          {/* loads image once from the cache and then uses it */}
          <Image source={getProfileImage(user?.image)} style={styles.avatar} contentFit="cover"
          transition={100}/>
        </View>
        <View style={styles.nameContainer}>
          <Typo size={34} fontWeight={"500"}>{user?.name}</Typo>
          <Typo size={30} fontWeight={"400"}>{user?.email}</Typo>
        </View>
        </View>
        <View style={styles.accountOptions}>
          {
            accountOptions.map((item,index)=>{
              return (
                <Animated.View key={index.toString()} entering={FadeInDown.delay(index*50).springify().damping(14)} style={styles.listItem}>
                  <TouchableOpacity style={styles.flexRow} onPress={()=>handlePress(item)}>
                    <View style={[styles.listIcon,{backgroundColor:item?.bgColor}]} >
                      {item.icon && item.icon}
                    </View>
                    <Typo size={29} style={{flex:1}} fontWeight={"500"}>{item.title}</Typo>
                    <Icon.CaretRight
                    size={verticalScale(50)}
                      weight="bold"
                      color={colors.white}
                    
                    />
                  </TouchableOpacity>
                </Animated.View>
              )
            })
          }
        </View>
      </View>
    </Screenwrapper>
  )
}

export default Profile

const styles = StyleSheet.create({
  container:{
    flex:1,
    paddingHorizontal:spacingX._20
  },
  userInfo:{
    marginTop:verticalScale(30),
    alignItems:"center",
    gap: spacingY._15,
  },
  avatarContainer:{
    position:"relative",
    alignSelf:"center"
  },
  avatar:{
    alignSelf:"center",
    backgroundColor:colors.neutral200,
    height:verticalScale(135),
    width:verticalScale(135),
    borderRadius:200,
    // overflow:"hidden",
    // position:"relative"
    
  },
  editIcon:{
    position:"absolute",
    bottom:5,
    right:8,
    borderRadius:60,
    backgroundColor:colors.neutral100,
  }
  ,
  nameContainer:{
    gap:verticalScale(4),
    alignItems:"center"
  },
  listIcon:{
    height:verticalScale(69),
    width:verticalScale(69),
    backgroundColor:colors.neutral500,
    alignItems:"center",
    justifyContent:"center",
    borderRadius:15,
  },
  listItem:{
    marginBottom:verticalScale(17)
  },
  accountOptions:{
    marginTop:spacingY._35,
  },
  flexRow:{
    flexDirection:"row",
    alignItems:"center",
    gap:spacingX._10
  }
});