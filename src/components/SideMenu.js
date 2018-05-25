import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Icon }  from 'native-base';
import { NavigationActions } from 'react-navigation';
import {
  View,
  ScrollView,
  Image,
  TouchableNativeFeedback
} from 'react-native';
import { SideMenuStyles as styles } from '../styles';
import { getItem, clearStorage } from '../util';
import { AppConsumer, StyledText as Text } from '.';

class SideMenu extends PureComponent {
  static propTypes = {
    navigation: PropTypes.object
  }

  state = {
    isAdmin: false,
  }

  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({ routeName: route });
    this.props.navigation.dispatch(navigateAction);
  }

  async componentDidMount() {
    const userType = await getItem('userType');
    if(userType === 'BDCAdmin'){
      this.setState({ isAdmin: true })
    }
  }

  render() {
    const {
      navigateToScreen,
      props: { navigation: { navigate } },
      state: { isAdmin }
    } = this;

    return (
      <AppConsumer>
        {({ username, changeUsername }) => (
          <View style={styles.flex}>

            <ScrollView>
              {
                !isAdmin &&
                <TouchableNativeFeedback onPress={navigateToScreen('NewRate')} underlayColor="#004900">
                  <View style={styles.label}>
                    <Image
                      style={styles.newRateIcon}
                      source={require(`../assets/images/icon_calendar.png`)}
                    />
                    <Text style={styles.menuItemsText}>INPUT NEW RATE</Text>
                  </View>
                </TouchableNativeFeedback>
              }

              {
                !isAdmin &&
                <TouchableNativeFeedback onPress={navigateToScreen('PrevRate')} underlayColor="#004900">
                  <View style={styles.label}>
                    <Image
                      style={styles.prevRateIcon}
                      source={require(`../assets/images/icon_news.png`)}
                    />
                    <Text style={styles.menuItemsText}>PREVIOUS RATES</Text>
                  </View>
                </TouchableNativeFeedback>
              }

              {
                isAdmin &&
                <TouchableNativeFeedback onPress={navigateToScreen('ManageUsers')} underlayColor="#004900">
                  <View style={[styles.label, styles.userLabel]}>
                  <Image
                    style={styles.icon}
                    source={require(`../assets/images/icon_profile.png`)}
                  />
                    <Text style={[styles.menuItemsText, styles.usersText]}>MANAGE USERS</Text>
                  </View>
                </TouchableNativeFeedback>
              }

              {
                isAdmin &&
                <TouchableNativeFeedback onPress={navigateToScreen('Configuration')} underlayColor="#004900">
                  <View style={styles.label}>
                    <Image
                      style={styles.configIcon}
                      source={require(`../assets/images/icon_settings.png`)}
                    />
                    <Text style={[styles.menuItemsText, styles.helpText]}>CONFIGURATION</Text>
                  </View>
                </TouchableNativeFeedback>
              }

              <TouchableNativeFeedback onPress={navigateToScreen('Help')} underlayColor="#004900">
                <View style={styles.label}>
                  <Image
                    style={styles.icon}
                    source={require(`../assets/images/icon_help.png`)}
                  />
                  <Text style={[styles.menuItemsText, styles.helpText]}>HELP</Text>
                </View>
              </TouchableNativeFeedback>
            </ScrollView>

            <View style={styles.footer}>
              <View style={styles.hr} />
                <View style={styles.bottom}>
                  <View>
                    <TouchableNativeFeedback
                      underlayColor='#004900'
                      onPress={() => {
                        changeUsername('');
                        navigate('Main');
                        clearStorage();
                      }}>
                      <Text style={styles.logoutText}>LOG OUT</Text>
                    </TouchableNativeFeedback>
                    <Text style={styles.bottomTxt}>{username}</Text>
                  </View>
                  <Image
                    style={[styles.icon, styles.logoutIcon]}
                    source={require(`../assets/images/icon_profile.png`)}
                  />
                </View>
            </View>

          </View>
        )}
      </AppConsumer>
    );
  }
}

export default SideMenu;
