import React from 'react';
import { TabNavigator } from 'react-navigation';

const Tabnavigator = ({ initialRouteName, screenOne, screenTwo }) => {
  const CustomTabNavigator = TabNavigator({
    TabOne: { screen: screenOne },
    TabTwo: { screen: screenTwo },
  }, {
      tabBarOptions: {
        titleStyle: {
          justifyContent: 'center',
          alignItems: 'center',
        },
        labelStyle: {
          fontSize: 13,
          fontFamily: 'montserrat',
        },
        tabStyle: {
          justifyContent: 'center',
          margin: 0,
        },
        indicatorStyle: {
          backgroundColor: 'white',
        },
        style: {
          backgroundColor: '#00b200',
          height: 40,
          paddingBottom: 0,
        }
      },
      initialRouteName,
    });
  CustomTabNavigator.navigationOptions = {
    header: null
  }
  return <CustomTabNavigator />
}

export default Tabnavigator;
