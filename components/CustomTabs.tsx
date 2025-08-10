import { colors, spacingY } from '@/constants/theme';
import { verticalScale } from '@/utils/styling';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Text } from '@react-navigation/elements';
import React from 'react';
import * as Icons from 'phosphor-react-native'
import { StyleSheet, TouchableOpacity, View } from 'react-native';
export function CustomTabs({ state, descriptors, navigation }:BottomTabBarProps) {
const tabbarIcons:any={
    index:(isFocused:boolean)=>(
        <Icons.House size={verticalScale(30)}
        weight={isFocused?"fill":"regular"}
        color={isFocused?colors.primary:colors.neutral500}
        />
    ),
    statistics:(isFocused:boolean)=>(
        <Icons.ChartBar size={verticalScale(30)}
        weight={isFocused?"fill":"regular"}
        color={isFocused?colors.primary:colors.neutral100}
        />
    ),
    wallet:(isFocused:boolean)=>(
        <Icons.Wallet size={verticalScale(30)}
        weight={isFocused?"fill":"regular"}
        color={isFocused?colors.primary:colors.neutral100}
        />
    ),
    profile:(isFocused:boolean)=>(
        <Icons.User size={verticalScale(30)}
        weight={isFocused?"fill":"regular"}
        color={isFocused?colors.primary:colors.neutral100}
        />
    ),
}
  return (
    <View style={styles.tabbar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label:any =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
          key={route.name}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabbaritem}
          >
            {
                tabbarIcons[route.name] && tabbarIcons[route.name](isFocused)
            }
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
    tabbar:{
        flexDirection: 'row' , 
        width:"100%", 
        height:verticalScale(95),
        backgroundColor:colors.neutral800,
        justifyContent:"space-around",
        alignItems:"center",
        borderTopColor:colors.white,
        borderTopWidth:1,
        borderBottomWidth:5,
        marginVertical:spacingY._20
        
        
    },
    tabbaritem:{
        marginBottom:spacingY._5,
        justifyContent:"center",
        alignItems:"center",
        
    }
})