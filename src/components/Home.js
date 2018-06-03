import React, { PureComponent } from "react";
import {
  View,
  ImageBackground,
  Image,
  TouchableHighlight,
} from "react-native";
import { func, bool, number, string } from "prop-types";
import { Field } from "redux-form";
import { Mutation } from 'react-apollo';
import { HomeScreenStyles as styles } from "../styles";
import RenderInput from "../components/RenderInput";
import { StyledText as Text } from ".";
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
              name="usernameOrEmail"
              component={RenderInput}
              placeholder="Username or Email"
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
                  <TouchableHighlight
                    underlayColor="#19B01D"
                    style={styles.buttonBody}
                    onPress={handleSubmit(async (values) => {
                      if (!!values && typeof values === 'object' && Object.keys(values).every(item => !!item)) {
                        let { password } = values;
                        let { usernameOrEmail } = values;
                        password = password.trim();
                        usernameOrEmail = usernameOrEmail.toLowerCase().trim();
                        removeItem('token');
                        removeErrorText();
                        await login({
                          variables: { usernameOrEmail, password }
                        });
                      } else {
                        return;
                      }
                    })}>
                    <Text style={styles.buttonText}>Get Started</Text>
                  </TouchableHighlight>
                )}}
            </Mutation>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

export default Home;
