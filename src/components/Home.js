import React, { PureComponent } from "react";
import {
  View,
  ImageBackground,
  Image
} from "react-native";
import { func, bool, number, string } from "prop-types";
import { Field } from "redux-form";
import { Mutation } from 'react-apollo';
import { HomeScreenStyles as styles } from "../styles";
import RenderInput from "../components/RenderInput";
import {
  StyledText as Text,
  StyledButton as Button,
  AppConsumer,
} from ".";
import Loader from "./Loader";
import { AUTHENTICATE_USER, removeItem } from '../util';

class Home extends PureComponent {
  static propTypes = {
    error: bool,
    errorText: string,
    handleSubmit: func,
    loading: bool,
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
      loading,
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
                  {(login, { data, loading, error }) => (
                    <View style={styles.buttonView}>
                      <Button
                        block rounded default color="#50AE32" height={60}
                        onPress={handleSubmit(async (values) => {
                          const { username, password } = values;
                          removeItem('token');
                          removeErrorText();
                          changeUsername(username);
                          await login({
                            variables: { username, password }
                          });
                        })}>
                        <Text style={styles.buttonText}>Get Started</Text>
                      </Button>
                      {loading && <Loader loading={loading} />}
                    </View>
                  )}
                </Mutation>
              </View>
              {loading && <Loader loading={loading} />}
            </View>
          </ImageBackground>
        )}
      </AppConsumer>
    )
  }
}

export default Home;
