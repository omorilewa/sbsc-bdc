import React, { PureComponent } from "react";
import {
  View,
  ImageBackground,
  Image
} from "react-native";
import { Button } from 'native-base';
import { func, bool, number, string } from "prop-types";
import { Field } from "redux-form";
import { Mutation } from 'react-apollo';
import { HomeScreenStyles as styles } from "../styles";
import RenderInput from "../components/RenderInput";
import {
  StyledText as Text,
  AppConsumer,
} from ".";
import Loader from "./Loader";
import { AUTHENTICATE_USER, removeItem } from '../util';

class Home extends PureComponent {
  static propTypes = {
    error: bool,
    errorText: string,
    handleSubmit: func,
    loginUser: func,
    removeErrorText: func,
    showLogo: bool,
    showError: func,
    visibleHeight: number,
  };

  toggleTextStyle = (styleObject) => {
    return this.props.showLogo ? styleObject.text : styleObject.textWithoutLogo;
  }

  render() {
    const {
      error,
      errorText,
      handleSubmit,
      loginUser,
      removeErrorText,
      showError,
      showLogo,
      visibleHeight,
    } = this.props
    return (
      <AppConsumer>
        {({ changeUsername }) => (
          <ImageBackground
            source={require("../assets/images/bg.jpg")}
            style={{ width: "100%", height: "100%" }}
          >
            <View
              style={{
                height: visibleHeight
              }}
            >
              <View style={styles.main}>
                {showLogo &&
                  <View style={styles.logoContainer}>
                    <Image
                      style={styles.image}
                      source={require("../assets/images/logo.png")}
                      />
                  </View>
                }
                <Text style={this.toggleTextStyle(styles)}>BDC FX RATE ENGINE</Text>
                {error && <Text style={styles.error}>{errorText}</Text>}
                <Field
                  name="username"
                  component={RenderInput}
                  placeholder="Username"
                  username
                />
                <Field
                  name="password"
                  component={RenderInput}
                  placeholder="Password"
                  icon-name="icon_password.png"
                  secureTextEntry
                />
                <Mutation mutation={AUTHENTICATE_USER} onCompleted={loginUser} onError={showError}>
                  {(login, { data, loading, error }) => {
                    if (loading) {
                      return <Loader loading={loading} />;
                    }
                    return (
                      <View style={styles.buttonView}>
                        <Button
                          block
                          rounded
                          style={styles.getStartedButton}
                          onPress={handleSubmit(async (values) => {
                            const { password } = values;
                            let { username } = values;
                            username = username.toLowerCase();
                            removeItem('token');
                            removeErrorText();
                            changeUsername(username);
                            await login({
                              variables: { username, password }
                            });
                          })}>
                          <Text style={styles.buttonText}>Get Started</Text>
                        </Button>
                      </View>
                    )}}
                </Mutation>
              </View>
            </View>
          </ImageBackground>
        )}
      </AppConsumer>
    )
  }
}

export default Home;
