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
import codePush from "react-native-code-push";
import SplashScreen from 'react-native-splash-screen'
import { Provider } from "react-redux";
import { ApolloProvider } from "react-apollo";
import { Sentry } from 'react-native-sentry';
import { AppProvider } from './src/components';
import { PrimaryNavigator } from "./src/navigation";
import { store, client } from "./src/util";
console.disableYellowBox = true;


Sentry.config('https://c9d63a6d35ca4c2bac30a2b979f5d68e:a42fa9660e7f472caa041e7d9db8ee49@sentry.io/1206436').install();


// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' +
//     'Cmd+D or shake for dev menu',
//   android: 'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });

type Props = {};
class App extends Component<Props> {

  componentDidMount() {
    // do stuff while splash screen is shown
      // After having done stuff (such as async tasks) hide the splash screen
      SplashScreen.hide();
  }

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

export default codePush(App);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
