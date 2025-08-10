import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Screenwrapper from '@/components/Screenwrapper'
import { colors, spacingX, spacingY } from '@/constants/theme'
import { verticalScale } from '@/utils/styling'
import { radius } from '@/constants/theme'
import Header from '@/components/Header'
const Profile = () => {
  return (
    <Screenwrapper>
      <View style={styles.container}>
        <Header title='Profile'/>
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
    backgroundColor:colors.black,
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
    borderRadius:50,
    backgroundColor:colors.neutral100,
  }
  ,
  nameContainer:{
    gap:verticalScale(4),
    alignItems:"center"
  },
  listIcon:{
    height:verticalScale(44),
    width:verticalScale(44),
    backgroundColor:colors.neutral500,
    alignItems:"center",
    justifyContent:"center",
    borderRadius:radius._15,
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