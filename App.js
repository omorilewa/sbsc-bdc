/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  StatusBar,
} from 'react-native';
import { Provider } from "react-redux";
import { ApolloProvider } from "react-apollo";
// import { Ionicons } from "@expo/vector-icons";
// import Sentry from 'sentry-expo';
import { AppProvider } from './src/components';
import { PrimaryNavigator } from "./src/navigation";
import { store, client } from "./src/util";
console.disableYellowBox = true;
// import registerForPushNotificationsAsync from './src/api/registerForPushNotificationsAsync';
// import Montserrat from './src/assets/fonts/montserrat.regular.ttf';
// import MontserratB from './src/assets/fonts/montserrat.bold.ttf';
// import MontserratL from './src/assets/fonts/Montserrat-Light.ttf';

// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' +
//     'Cmd+D or shake for dev menu',
//   android: 'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <ApolloProvider client={client}>
        <AppProvider>
          <Provider store={store}>
            <View style={styles.container}>
              {Platform.OS === "ios" && <StatusBar barStyle="default" />}
              <PrimaryNavigator />
            </View>
          </Provider>
        </AppProvider>
      </ApolloProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
