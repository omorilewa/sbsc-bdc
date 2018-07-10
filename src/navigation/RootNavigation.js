import React from 'react';
import { Easing, TouchableHighlight, Image, View } from 'react-native';
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import { Icon } from 'native-base';
import { NavigationStyles as styles } from "../styles";
import {
  HomeScreen,
  NewRateScreen,
  PrevRateScreen,
  RateBoundariesScreen,
  CreateUserScreen,
  ManageUserScreen,
  FAQScreen,
  PostScheduleScreen,
  UpdateScreen
} from '../screens';
import { StyledText as Text, SideMenu } from '../components';

const drawerButton = navigation =>
  <TouchableHighlight
    underlayColor='#173D0C'
    onPress={() => {
      if (navigation.state.index === 0) {
        navigation.navigate('DrawerOpen');
      } else {
        navigation.navigate('DrawerClose');
      }
    }
    }>
    <Icon style={styles.icon} name='ios-menu-outline' />
  </TouchableHighlight>;

export const DrawerStack = DrawerNavigator({
  NewRate: { screen: NewRateScreen },
  PrevRate: { screen: PrevRateScreen },
  CreateUser: { screen: CreateUserScreen },
  ManageUsers: { screen: ManageUserScreen },
  Configuration: { screen: RateBoundariesScreen },
  PostSchedule: { screen: PostScheduleScreen },
  Update: { screen: UpdateScreen },
  Help: { screen: FAQScreen },
},
  {
    gesturesEnabled: false,
    drawerWidth: 250,
    contentComponent: SideMenu,
    drawerBackgroundColor: '#004900'
  });

const DrawerNavigation = StackNavigator({
  DrawerStack: { screen: DrawerStack },
}, {
    headerMode: 'float',
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#173D0C',
        paddingLeft: 10,
        height: 40
      },
      headerTitle: (
        <View style={styles.headerTitleStyle}>
          <Image
            style={styles.imageStyle}
            source={require('../../src/assets/images/logo.png')}
          />
          <View style={styles.bdcView}>
            <Text style={styles.text}>BDC FX</Text>
            <Text style={styles.text}>RATE ENGINE</Text>
          </View>
        </View>
      ),
      headerTintColor: 'white',
      gesturesEnabled: false,
      headerLeft: drawerButton(navigation),
      headerTitleStyle: {
        fontFamily: 'montserrat',
        fontWeight: 'normal',
      },
    })
  });

const noTransitionConfig = () => ({
  transitionSpec: {
    duration: 0,
    easing: Easing.step0
  },
});

export const PrimaryNavigator = StackNavigator({
  Main: { screen: HomeScreen },
  DrawerStack: { screen: DrawerNavigation },
}, {
    // Default config for all screens
    headerMode: 'none',
    title: 'Main',
    initialRouteName: 'Main',
    transitionConfig: noTransitionConfig
  });
