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
import FlashMessage from "react-native-flash-message";
import { PrimaryNavigator } from "./src/navigation";
import { store, client } from "./src/util";
console.disableYellowBox = true;


Sentry.config('https://c9d63a6d35ca4c2bac30a2b979f5d68e:a42fa9660e7f472caa041e7d9db8ee49@sentry.io/1206436').install();

class App extends Component {

  componentDidMount() {
    // After having done stuff (such as async tasks) hide the splash screen
    SplashScreen.hide();
  }

  render() {
    return (
      <ApolloProvider client={client}>
        <Provider store={store}>
          <View style={styles.container}>
            {Platform.OS === "ios" && <StatusBar barStyle="default" />}
            <PrimaryNavigator />
            <FlashMessage position="bottom" duration={3000} style={styles.flash} />
          </View>
        </Provider>
      </ApolloProvider>
    );
  }
}

export default codePush(App);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  flash: {
    alignItems: 'center',
    justifyContent: 'center',
  }
});
